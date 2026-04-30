import * as http from "http";
import { Router } from "../router/router";
import { ListenOptions } from "./application.interface";
import { Request } from "../request/request";
import { Response } from "../response/response";
import { Logger } from "../../lib/logger/logger";
import { MiddlewareRegistry } from "../middleware/middlewareRegistry";
import { IMiddleware } from "../middleware/middlewareRegistry.interface";
import { IRoute } from "../router/router.interface";

export class Application {
    public readonly middlewareRegistry = new MiddlewareRegistry();
    public readonly router = new Router({ enableLogging: true });
    private readonly logger = new Logger(Application.name);

    public use(middlewareRegistry: MiddlewareRegistry): void;
    public use(middlewares: IMiddleware[]): void;
    public use(middleware: IMiddleware): void;
    public use(router: Router): void;
    public use(routes: IRoute[]): void;
    public use(route: IRoute): void;
    public use(input: MiddlewareRegistry | IMiddleware[] | IMiddleware | Router | IRoute[] | IRoute) {
        if (input instanceof MiddlewareRegistry) {
            this.middlewareRegistry.add(input);
        }

        if (input instanceof Router) {
            this.router.add(input);
        }

        if (Array.isArray(input)) {
            if ("method" in input[0] && "url" in input[0]) {
                this.router.add(input as IRoute[]);
            }
            if ("handler" in input[0]) {
                this.middlewareRegistry.add(input as IMiddleware[]);
            }
        }

        if ("method" in input && "url" in input) {
            this.router.add(input);
        }

        if ("handler" in input) {
            this.middlewareRegistry.add(input as IMiddleware);
        }
    }

    public listen(options: ListenOptions) {
        const httpServer = http.createServer(
            { IncomingMessage: Request, ServerResponse: Response },
            async (req, res) => {
                const middlewareFinished = await this.middlewareRegistry.runPipeline(req, res);

                if (middlewareFinished) {
                    await this.router.handler(req, res);
                }
            },
        );

        httpServer.listen(options, () => {
            this.logger.log(`Server listening on ${options.hostname}:${options.port}`);
        });

        httpServer.on("error", (error) => {
            this.logger.log(`Server error: ${error}`);
        });
    }
}
