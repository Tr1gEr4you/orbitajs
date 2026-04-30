import { IRequest } from "../../../core/request/request.interface";
import { IResponse } from "../../../core/response/response.interface";

export async function jsonParser(req: IRequest, res: IResponse): Promise<void> {
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
