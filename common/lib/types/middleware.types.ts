import { Handler, HttpMethod } from "./router.types";

export type MiddlewareWithoutUrl = Omit<Middleware, "url">;

export interface Middleware {
    url?: string;
    method?: HttpMethod | "*";
    handler: Handler;
}
