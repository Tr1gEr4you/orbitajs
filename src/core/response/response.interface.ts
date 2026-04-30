import { ServerResponse } from "http";
import { Url } from "../router/router.interface";

export interface IResponse extends ServerResponse {
    json(data: any): void;
    status(code: number): this;
    redirect(url: Url): void;
}
