import { IncomingMessage } from "http";
import { IRequest } from "./request.interface";

export class Request extends IncomingMessage implements IRequest {
    public rawBody: string = "";
    public body: string = "";
}
