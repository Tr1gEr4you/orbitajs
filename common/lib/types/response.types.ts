import { ServerResponse } from "http";

export interface Response extends ServerResponse {
    json(data: any): void
    status(code: number): this
    redirect(url: string): void
}
