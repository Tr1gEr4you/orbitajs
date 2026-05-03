import { IncomingMessage } from "http";
import type { Request as RequestCommon } from "@orbita-js/common"

export class Request extends IncomingMessage implements RequestCommon {
    public rawBody: string = ""
    public body: Record<string, any> = {};
}
