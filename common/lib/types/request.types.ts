import { IncomingMessage } from "http";

export interface Request extends IncomingMessage {
    rawBody: string
    body: any
    params: Record<string, any>
}
