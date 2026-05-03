import { HttpStatus } from "./http-status";
import { HttpMessages } from "./http-messages";

export class HttpError extends Error {
    public constructor(
        public readonly status: number,
        public readonly message: string,
    ) {
        super(message);
    }

    public static is(error: any) {
        return error && typeof error === 'object' && 'status' in error && 'message' in error;
    }
}

export class BadRequestError extends HttpError {
    constructor(message: string = HttpMessages.BAD_REQUEST) {
        super(HttpStatus.BAD_REQUEST, message);
    }
}

export class UnauthorizedError extends HttpError {
    constructor(message: string = HttpMessages.UNAUTHORIZED) {
        super(HttpStatus.UNAUTHORIZED, message);
    }
}

export class ForbiddenError extends HttpError {
    constructor(message: string = HttpMessages.FORBIDDEN) {
        super(HttpStatus.FORBIDDEN, message);
    }
}

export class NotFoundError extends HttpError {
    constructor(message: string = HttpMessages.NOT_FOUND) {
        super(HttpStatus.NOT_FOUND, message);
    }
}

export class MethodNotAllowedError extends HttpError {
    constructor(message: string = HttpMessages.METHOD_NOT_ALLOWED) {
        super(HttpStatus.METHOD_NOT_ALLOWED, message);
    }
}

export class ConflictError extends HttpError {
    constructor(message: string = HttpMessages.CONFLICT) {
        super(HttpStatus.CONFLICT, message);
    }
}

export class UnprocessableEntityError extends HttpError {
    constructor(message = HttpMessages.UNPROCESSABLE_ENTITY) {
        super(HttpStatus.UNPROCESSABLE_ENTITY, message);
    }
}

export class InternalServerError extends HttpError {
    constructor(message: string = HttpMessages.INTERNAL_SERVER_ERROR) {
        super(HttpStatus.INTERNAL_SERVER_ERROR, message);
    }
}

export class NotImplementedError extends HttpError {
    constructor(message: string = HttpMessages.NOT_IMPLEMENTED) {
        super(HttpStatus.NOT_IMPLEMENTED, message);
    }
}

export class BadGatewayError extends HttpError {
    constructor(message: string = HttpMessages.BAD_GATEWAY) {
        super(HttpStatus.BAD_GATEWAY, message);
    }
}

export class ServiceUnavailableError extends HttpError {
    constructor(message: string = HttpMessages.SERVICE_UNAVAILABLE) {
        super(HttpStatus.SERVICE_UNAVAILABLE, message);
    }
}

export class GatewayTimeoutError extends HttpError {
    constructor(message: string = HttpMessages.GATEWAY_TIMEOUT) {
        super(HttpStatus.GATEWAY_TIMEOUT, message);
    }
}
