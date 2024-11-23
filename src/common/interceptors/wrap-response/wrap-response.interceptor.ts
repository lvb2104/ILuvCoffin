import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';

// use interceptor in main.ts file
@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        console.log(`Before ...`);

        // return next.handle().pipe(tap(data => console.log(`After ...`, data)));
        return next.handle().pipe(map((data) => ({ data })));
    }
}
