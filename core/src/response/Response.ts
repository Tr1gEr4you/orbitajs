import { ServerResponse } from "http";
import { Request, Response as ResponseCommon } from "@orbitajs/common";

export class Response extends ServerResponse<Request> implements ResponseCommon {
    public json(data: any): void {
        this.setHeader("Content-Type", "application/json");
        this.end(JSON.stringify(data));
    }

    public redirect(url: string): void {
        this.setHeader("Location", url).end();
    }

    public status(code: number): this {
        this.statusCode = code;
        return this;
    }
}
