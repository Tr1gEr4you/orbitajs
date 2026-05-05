import { Request, Response, Middleware, MiddlewareWithoutUrl, HttpMethod } from "@orbitajs/common"

export class MiddlewareRegistry {
    private readonly exactMiddlewares: Map<string, MiddlewareWithoutUrl[]> = new Map();
    private readonly wildcardMiddlewares: Map<string, MiddlewareWithoutUrl[]> = new Map();

    public async runPipeline(req: Request, res: Response) {
        const url = this._normalizeUrl(req.url ?? "");

        for (const [pattern, middlewares] of this.wildcardMiddlewares) {
            const prefix = pattern.slice(0, -2)
            if (url.startsWith(prefix + "/")) {
                for (const middleware of middlewares) {
                    await middleware.handler(req, res)
                    if (res.headersSent) return false;
                }
            }
        }

        const middlewares = this.exactMiddlewares.get(url)
        if (middlewares) {
            for (const middleware of middlewares) {
                await middleware.handler(req, res)
                if (res.headersSent) return false;
            }
        }

        return true;
    }

    public add(m: MiddlewareRegistry | Middleware[] | Middleware) {
        if (m instanceof MiddlewareRegistry) {
            this._mergeMaps(m.exactMiddlewares)
            this._mergeMaps(m.wildcardMiddlewares)
            return;
        }

        if (Array.isArray(m)) {
            m.forEach((middleware) => this._add(middleware));
            return;
        }

        this._add(m);
    }

    private _mergeMaps(map: Map<string, MiddlewareWithoutUrl[]>) {
        for (const [url, middlewares] of map) {
            if (url.endsWith("/*")) {
                const list = this.wildcardMiddlewares.get(url)
                if (!list) {
                    this.wildcardMiddlewares.set(url, [...middlewares])
                } else {
                    list.push(...middlewares)
                }
            } else {
                const list = this.exactMiddlewares.get(url)
                if (!list) {
                    this.exactMiddlewares.set(url, [...middlewares])
                } else {
                    list.push(...middlewares)
                }
            }
        }
    }

    private _add(middleware: Middleware) {
        const normalized = this._normalizeMiddleware(middleware);

        if (normalized.url.endsWith("/*")) {
            const list = this.wildcardMiddlewares.get(normalized.url)
            if (!list) {
                this.wildcardMiddlewares.set(normalized.url, [normalized.middleware])
            } else {
                list.push(normalized.middleware)
            }
        } else {
            const list = this.exactMiddlewares.get(normalized.url)
            if (!list) {
                this.exactMiddlewares.set(normalized.url, [normalized.middleware])
            } else {
                list.push(normalized.middleware)
            }
        }
    }

    private _normalizeMiddleware(middleware: Middleware) {
        const url = this._normalizeUrl(middleware.url ?? "")
        const method = this._normalizeMethod(middleware.method ?? "")

        const { url: _, method: __, handler} = middleware;

        return {
            url,
            middleware: {
                method,
                handler
            }
        }
    }

    private _normalizeUrl(url: string) {
        if (!url || url === "*" || url === "/*") {
            return "/*"
        }

        if (!url.startsWith("/")) {
            return "/" + url
        }

        if (url.endsWith("/")) {
            return url.slice(0, -1)
        }

        return url
    }

    private _normalizeMethod(method: string) {
        if (!method || method === "*" || method === "") {
            return "*" as HttpMethod
        }

        return method as HttpMethod
    }
}
