import { Request, Response } from "../types";

export function cookieParser(req: Request, res: Response) {
    const headers = req.headers
    if (!req.headers) return

    const cookieHeader = headers.cookie
    if (!cookieHeader) return

    if (!req.cookies) {
        req.cookies = {}
    }

    cookieHeader.split(";").map((pair) => pair.trim()).forEach((pair) => {
        const [key, ...valueParts] = pair.split("=")
        const value = valueParts.join("=")

        if (!key) return

        req.cookies[key] = value
    })
}
