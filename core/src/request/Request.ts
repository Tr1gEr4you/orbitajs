import { IncomingMessage } from "http";
import type { Request as RequestCommon } from "@orbitajs/common"

export class Request extends IncomingMessage implements RequestCommon {
    public rawBody: string = ""
    public body: Record<string, any> = {};
    public params: Record<string, any> = {}
}
