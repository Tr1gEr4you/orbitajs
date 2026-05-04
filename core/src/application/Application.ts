import { ExceptionFilter, Interceptor, Route, Middleware } from "@orbitajs/common";
import * as http from "http";

import { Request } from '../request/Request'
import { Response } from '../response/Response'

import { BaseGlobalExceptionFilter } from "../exception-filter/BaseGlobalExceptionFilter";
import { BaseGlobalInterceptor } from "../interceptor/BaseGlobalInterceptor";

import { MiddlewareRegistry } from "../middleware-registry/MiddlewareRegistry";
import { Router } from "../router/Router";

import { ListenOptions } from "./application.types";

export class Application {
    private readonly router = new Router();
    private readonly middlewareRegistry = new MiddlewareRegistry();

    private globalExceptionFilter = new BaseGlobalExceptionFilter();
    private globalInterceptor = new BaseGlobalInterceptor();

    public useRoute(route: Route): void {
        this.router.add(route);
    }
    public useRoutes(routes: Route[]): void {
        this.router.add(routes);
    }
    public useRouter(router: Router): void {
        this.router.add(router);
    }

    public useMiddleware(middleware: Middleware): void {
        this.middlewareRegistry.add(middleware);
    }
    public useMiddlewares(middlewares: Middleware[]): void {
        this.middlewareRegistry.add(middlewares);
    }
    public useMiddlewareRegistry(middlewareRegistry: MiddlewareRegistry): void {
        this.middlewareRegistry.add(middlewareRegistry);
    }

    public ussGlobalExceptionFilter(exceptionFilter: ExceptionFilter): void {
        this.globalExceptionFilter = exceptionFilter;
    }

    public useGlobalInterceptor(interceptor: Interceptor): void {
        this.globalInterceptor = interceptor;
    }

    public listen(options: ListenOptions): void {
        const httpServer = http.createServer(
            { IncomingMessage: Request, ServerResponse: Response },
            async (req, res) => {
                try {
                    const middlewaresFinished = await this.middlewareRegistry.runPipeline(req, res);

                    if (!middlewaresFinished) return;

                    const result = await this.router.handler(req, res);

                    if (!res.headersSent) {
                        this.globalInterceptor.intercept(result, req, res);
                    }
                } catch (error: any) {
                    this.globalExceptionFilter.catch(error, req, res);
                }
            },
        );

        httpServer.listen(options);
    }
}
