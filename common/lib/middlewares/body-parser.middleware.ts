import { Request, Response } from "../types";

export async function bodyParser(req: Request, res: Response) {
    if (!req.headers["content-type"]?.includes("application/json")) return;

    function dataStream(resolve: any, reject: any) {
        req.on("data", (chunk) => (req.rawBody += chunk));
        req.on("end", () => {
            try {
                req.body = JSON.parse(req.rawBody);
                resolve();
            } catch (error) {
                reject(error);
            }
        });
        req.on("error", (error) => reject(error));
    }

    await new Promise((resolve, reject) => dataStream(resolve, reject));
}
