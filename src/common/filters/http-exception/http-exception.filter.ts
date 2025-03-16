import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
} from '@nestjs/common';
import { Response } from 'express';

// catch all HttpExceptions and handle them
@Catch(HttpException)
// extends HttpExceptionFilter from ExceptionFilter to catch all HttpExceptions and handle them
export class HttpExceptionFilter<T extends HttpException>
    implements ExceptionFilter
{
    // host is an instance of ArgumentsHost, which is a wrapper around the arguments being passed to the route handler
    catch(exception: T, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        
        // get the status and response of the exception
        const status = exception.getStatus();
        const exceptionResponse = exception.getResponse();

        // send the status and exception response as a JSON object in the response
        const error =
            typeof exceptionResponse === 'string'
                ? { message: exceptionResponse }
                : (exceptionResponse as object);
        
        // update the response with the status and error object
        response.status(status).json({
            status,
            ...error,
            timestamp: new Date().toISOString(),
        });
    }
}
