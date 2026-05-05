import type { IncomingHttpHeaders } from "http"
import type { HttpMethod, Request, Response } from "../types"

interface CorsOptions {
    origin?: string | string[]
    methods?: HttpMethod | HttpMethod[]
    headers?: string[] | IncomingHttpHeaders[]
    credentials?: boolean
}

export function cors(options?: CorsOptions) {
    const opts: Required<CorsOptions> = {
        origin: '*',
        methods: ['GET', "POST", "PUT", "DELETE", "PATCH"],
        headers: ["content-type"],
        credentials: false,
        ...options
    }

    let origin
    if (typeof opts.origin === "string") {
        origin = opts.origin
    } else {
        origin = opts.origin.join(", ")
    }

    let methods
    if (typeof opts.methods === "string") {
        methods = opts.methods
    } else {
        methods = opts.methods.join(", ")
    }

    let headers
    if (typeof opts.headers === "string") {
        headers = opts.headers
    } else {
        headers = opts.headers.join(", ")
    }


    return (req: Request, res: Response) => {
        res.setHeader("access-control-allow-origin", origin);
        res.setHeader("access-control-allow-methods", methods);
        res.setHeader("access-control-allow-headers", headers);
        res.setHeader("access-control-allow-credentials", String(opts.credentials));

        if (req.method === "OPTIONS") {
            res.status(204).end()
        }
    }
}
