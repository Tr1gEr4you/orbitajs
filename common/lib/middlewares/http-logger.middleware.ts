import type { Request, Response } from "../types";

interface HttpLoggerOptions {
    userAgent?: boolean
    ip?: boolean
}

export function httplogger(options?: HttpLoggerOptions) {
    const opts: HttpLoggerOptions = {
        userAgent: false,
        ip: false,
        ...options
    }

    return (req: Request, res: Response) => {
        const date = new Date().toLocaleString()

        const message: string[] = [`${date}`, `${req.method}`, `${req.url}`]

        if (opts.userAgent) {
            const ua = req.headers['user-agent'] || "-"
            message.push(ua)
        }

        if (opts.ip) {
            const ip = req.socket.remoteAddress || "-"
            message.push(ip)
        }

        console.log(message.join(" "))
    }

}
