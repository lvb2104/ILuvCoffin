import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
    RequestTimeoutException,
} from '@nestjs/common';
import {
    catchError,
    Observable,
    throwError,
    timeout,
    TimeoutError,
} from 'rxjs';

// use interceptor in main.ts file
@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        // must invoke next.handle() to pass the request to the next middleware in the pipeline
        // pipe() is a method from the rxjs package that allows you to chain operators to the observable
        return next.handle().pipe(
            timeout(5000),
            catchError((err) => {
                if (err instanceof TimeoutError) {
                    return throwError(() => new RequestTimeoutException());
                }
                return throwError(() => err);
            }),
        );
    }
}
