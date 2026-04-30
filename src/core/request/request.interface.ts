import { IncomingMessage } from "http";

export interface IRequest extends IncomingMessage {
    rawBody: string;
    body: string;
}
