import { Request, Response } from "../types";

export interface Interceptor {
    intercept(result: any, req: Request, res: Response): Promise<void> | void;
}
