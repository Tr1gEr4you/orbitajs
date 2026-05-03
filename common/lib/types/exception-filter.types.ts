import { Request, Response } from "../types";

export interface ExceptionFilter {
    catch(exception: any, req: Request, res: Response): Promise<void> | void;
}
