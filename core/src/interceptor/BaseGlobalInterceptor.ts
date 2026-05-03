import { Request, Response, Interceptor } from "@orbita-js/common";

export class BaseGlobalInterceptor implements Interceptor {
    intercept(result: any, req: Request, res: Response): Promise<void> | void {
        res.status(200).json({
            data: result
        })
    }
}
