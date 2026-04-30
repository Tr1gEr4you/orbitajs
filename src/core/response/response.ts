import { ServerResponse } from "http";
import { IResponse } from "./response.interface";
import { Url } from "../router/router.interface";
import { IRequest } from "../request/request.interface";

export class Response extends ServerResponse<IRequest> implements IResponse {
    public json(data: any): void {
        this.setHeader("Content-Type", "application/json");
        this.end(JSON.stringify(data));
    }

    public redirect(url: Url): void {
        this.setHeader("Location", url).end();
    }

    public status(code: number): this {
        this.statusCode = code;
        return this;
    }
}
