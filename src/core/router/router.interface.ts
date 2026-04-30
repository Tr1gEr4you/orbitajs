import { ILogger } from "../../lib/logger/logger.interface";
import { IRequest } from "../request/request.interface";
import { IResponse } from "../response/response.interface";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
export type Handler = (req: IRequest, res: IResponse) => Promise<void> | void;
export type Url = string;

export interface IRoute {
    url: Url;
    method: HttpMethod;
    handler: Handler;
}

export interface RouterOptions {
    logger?: ILogger;
    enableLogging?: boolean;
}
