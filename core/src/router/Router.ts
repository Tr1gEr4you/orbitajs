import { Request, Response, Route, RouteWithoutMethod, RouteWithoutUrl, NotFoundError } from "@orbita-js/common"

export class Router {
    private readonly routes: Map<string, RouteWithoutUrl[]> = new Map();

    public getRoutes(url: string) {
        return this.routes.get(url);
    }

    public get(route: RouteWithoutMethod) {
        this._add({ method: "GET", ...route });
    }

    public post(route: RouteWithoutMethod) {
        this._add({ method: "POST", ...route });
    }

    public put(route: RouteWithoutMethod) {
        this._add({ method: "PUT", ...route });
    }

    public delete(route: RouteWithoutMethod) {
        this._add({ method: "DELETE", ...route });
    }

    public async handler(req: Request, res: Response) {
        const { method, url } = req;
        if (!method || !url) return;

        const routes = this.getRoutes(url);
        if (!routes) throw new NotFoundError();

        const route = routes.find((route) => route.method === method);
        if (route) {
            return await route.handler(req, res);
        }
    }

    public add(r: Router | Route[] | Route): void {
        if (r instanceof Router) {
            for (const [url, newRoutes] of r.routes) {
                const routes = this.getRoutes(url);
                if (routes) {
                    routes.push(...newRoutes);
                } else {
                    this.routes.set(url, newRoutes);
                }
            }
            return;
        }

        if (Array.isArray(r)) {
            r.forEach((route) => this._add(route));
            return;
        }

        this._add(r);
    }

    private _add(route: Route) {
        const { url } = route;

        const normalized = this._normalizeRoute(route);
        const routes = this.getRoutes(url);

        if (routes) {
            routes.push(normalized);
        } else {
            this.routes.set(url, [normalized]);
        }
    }

    private _normalizeRoute(route: Route) {
        const { url, ...rest } = route;
        return rest;
    }
}
