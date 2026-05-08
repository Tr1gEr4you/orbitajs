import { ExceptionFilter, Request, Response, HttpError, HttpMessages, HttpStatus } from "@orbitajs/common";

export class BaseGlobalExceptionFilter implements ExceptionFilter {
    catch(exception: any, req: Request, res: Response): Promise<void> | void {
        const statusCode = exception.status || HttpStatus.INTERNAL_SERVER_ERROR;
        const message = exception.message;

        if (HttpError.is(exception)) {
            return res.status(statusCode).json({
                statusCode,
                message,
            });
        }

        console.log(exception)

        res.status(statusCode).json({
            statusCode,
            message: HttpMessages.INTERNAL_SERVER_ERROR,
        });
    }
}
