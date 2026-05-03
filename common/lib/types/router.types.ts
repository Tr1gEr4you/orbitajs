import { Response } from "./response.types";
import { Request } from "./request.types";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export type Handler = (req: Request, res: Response) => Promise<void> | void | Promise<any> | any;

export type RouteWithoutUrl = Omit<Route, "url">;
export type RouteWithoutMethod = Omit<Route, "method">;

export interface Route {
    url: string;
    method: HttpMethod;
    handler: Handler;
}
