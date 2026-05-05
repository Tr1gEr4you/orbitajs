import { Request, Response } from "../types";

export async function bodyParser(req: Request, res: Response) {
    if (!req.headers["content-type"]?.includes("application/json")) return;

    function dataStream(resolve: any, reject: any) {
        req.on("data", (chunk) => {
            req.rawBody += chunk.toString();
        });
        req.on("end", () => {
            try {
                req.body = JSON.parse(req.rawBody);
                resolve(req.body);
            } catch (error) {
                res.status(400)
                res.end("Invalid JSON");
                reject(error);
            }
        });
        req.on("error", (error) => {
            res.status(400)
            res.end("Request body error");
            reject(error);
        });
    }

    await new Promise((resolve, reject) => dataStream(resolve, reject));
}
