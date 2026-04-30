import { Logger } from "../../lib/logger/logger";
import { ILogger } from "../../lib/logger/logger.interface";
import { IRequest } from "../request/request.interface";
import { IResponse } from "../response/response.interface";
import { IRoute, RouterOptions, Url } from "./router.interface";

export class Router {
    public readonly routes: Map<Url, IRoute[]> = new Map();

    private enableLogging: boolean = false;
    private logger: ILogger = new Logger(Router.name);

    public constructor(options?: RouterOptions) {
        if (!options) return;

        this.enableLogging = options.enableLogging ?? false;

        if (options.logger) {
            this.logger = options.logger;
        }
    }

    public get(route: Omit<IRoute, "method">): void {
        this._add({ method: "GET", ...route });
    }

    public post(route: Omit<IRoute, "method">): void {
        this._add({ method: "POST", ...route });
    }

    public put(route: Omit<IRoute, "method">): void {
        this._add({ method: "PUT", ...route });
    }

    public delete(route: Omit<IRoute, "method">): void {
        this._add({ method: "DELETE", ...route });
    }

    public async handler(req: IRequest, res: IResponse): Promise<void> {
        const { method, url } = req;
        if (!method || !url) return;

        const routes = this.routes.get(url);
        if (!routes) return;

        const route = routes.find((route) => route.method === method);
        if (route) {
            await route.handler(req, res);
        }
    }

    public add(route: IRoute): void;
    public add(routes: IRoute[]): void;
    public add(router: Router): void;
    public add(input: IRoute | IRoute[] | Router): void {
        if (input instanceof Router) {
            for (const [url, routes] of input.routes) {
                routes.forEach((route) => this._add(route));
            }
            return;
        }

        if (Array.isArray(input)) {
            input.forEach((route) => this._add(route));
        }

        this._add(input as IRoute);
    }

    private _add(route: IRoute) {
        const { url, method } = route;

        const list = this.routes.get(url) ?? [];

        list.push(route);
        if (!this.routes.has(url)) {
            this.routes.set(url, list);
        }

        if (this.enableLogging) {
            this.logger.log("Add " + method + " " + url);
        }
    }
}
