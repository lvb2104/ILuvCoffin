import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
} from '@nestjs/common';
import { Response } from 'express';

// use HttpExceptionFilter in the main.ts file to catch all HttpExceptions
@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException>
    implements ExceptionFilter
{
    catch(exception: T, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();
        const exceptionResponse = exception.getResponse();
        const error =
            typeof exceptionResponse === 'string'
                ? { message: exceptionResponse }
                : (exceptionResponse as object);
        response.status(status).json({
            status,
            ...error,
            timestamp: new Date().toISOString(),
        });
    }
}
