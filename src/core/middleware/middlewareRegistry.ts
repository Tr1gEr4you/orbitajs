import { IRequest } from '../request/request.interface';
import { IResponse } from '../response/response.interface';
import { Url } from '../router/router.interface';
import { IMiddleware } from './middlewareRegistry.interface';

export class MiddlewareRegistry {
    private readonly middlewares: Map<Url, IMiddleware[]> = new Map();

    public add(middleware: IMiddleware): void;
    public add(middlewares: IMiddleware[]): void;
    public add(middlewareRegistry: MiddlewareRegistry): void;
    public add(input: IMiddleware | IMiddleware[] | MiddlewareRegistry): void {
        if (input instanceof MiddlewareRegistry) {
            for (const [url, middlewares] of input.middlewares) {
                middlewares.forEach((middleware) => this._add(middleware));
            }
            return;
        }

        if (Array.isArray(input)) {
            input.forEach((middleware) => this._add(middleware));
        }

        this._add(input as IMiddleware);
    }

    public async runPipeline(req: IRequest, res: IResponse): Promise<boolean> {
        const { url } = req;
        if (!url) return false;
        const globalMiddlewares = this.middlewares.get('*');
        if (globalMiddlewares) {
            for (const middleware of globalMiddlewares) {
                await middleware.handler(req, res);
                if (res.headersSent) return false;
            }
        }
        const middlewares = this.middlewares.get(url);
        if (middlewares) {
            for (const middleware of middlewares) {
                await middleware.handler(req, res);
                if (res.headersSent) return false;
            }
        }

        return true;
    }

    private _add(middleware: IMiddleware): void {
        const { url } = middleware;

        const list = this.middlewares.get(url) ?? [];

        list.push(middleware);
        if (!this.middlewares.has(url)) {
            this.middlewares.set(url, list);
        }
    }
}
