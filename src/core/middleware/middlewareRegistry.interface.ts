import { Handler, Url } from "../router/router.interface";

export interface IMiddleware {
    url: Url;
    handler: Handler;
}
