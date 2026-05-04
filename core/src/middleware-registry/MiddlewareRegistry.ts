import { Request, Response, Middleware, MiddlewareWithoutUrl } from "@orbitajs/common"

export class MiddlewareRegistry {
    private readonly middleware: Map<string, MiddlewareWithoutUrl[]> = new Map();

    public getMiddlewares(url: string) {
        const result: MiddlewareWithoutUrl[] = [];

        const middlewares = this.middleware.get(url)
        if (middlewares) {
            result.push(...middlewares)
        }

        this.middleware.forEach((middleware, pattern) => {
            if (!pattern.endsWith("/*")) return
            if (url.startsWith(pattern.slice(0, -2))) {
                result.push(...middleware)
            }
        })

        return result
    }

    public async runPipeline(req: Request, res: Response) {
        const { url } = req;
        if (!url) return false;

        const globalMiddlewares = this.getMiddlewares("*");
        if (globalMiddlewares) {
            for (const middleware of globalMiddlewares) {
                await middleware.handler(req, res);
                if (res.headersSent) return false;
            }
        }

        const middlewares = this.getMiddlewares(url);
        if (middlewares) {
            for (const middleware of middlewares) {
                await middleware.handler(req, res);
                if (res.headersSent) return false;
            }
        }

        return true;
    }

    public add(m: MiddlewareRegistry | Middleware[] | Middleware) {
        if (m instanceof MiddlewareRegistry) {
            for (const [url, newMiddlewares] of m.middleware) {
                const middlewares = this.getMiddlewares(url);
                if (middlewares) {
                    middlewares.push(...newMiddlewares);
                } else {
                    this.middleware.set(url, newMiddlewares);
                }
            }
            return;
        }

        if (Array.isArray(m)) {
            m.forEach((middleware) => this._add(middleware));
            return;
        }

        this._add(m);
    }

    private _add(middleware: Middleware) {
        if (!middleware.url) {
            middleware.url = "*";
        }

        if (!middleware.method) {
            middleware.method = "*";
        }

        const { url } = middleware;

        const normalized = this._normalizeMiddleware(middleware);
        const middlewares = this.getMiddlewares(url);

        if (middlewares) {
            middlewares.push(normalized);
        } else {
            this.middleware.set(url, [normalized]);
        }
    }

    private _normalizeMiddleware(middleware: Middleware) {
        const { url, ...rest } = middleware;
        return rest;
    }
}
