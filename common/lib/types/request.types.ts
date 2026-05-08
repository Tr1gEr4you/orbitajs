import { IncomingMessage } from "http";

export interface Request extends IncomingMessage {
    rawBody: string
    body: any
    query: Record<string, any>
    params: Record<string, any>
    cookies: Record<string, any>
}
