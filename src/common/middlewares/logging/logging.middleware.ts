import { Injectable, NestMiddleware } from '@nestjs/common';

// use middleware in CommonModule
@Injectable()
export class LoggingMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void) {
        console.time(`Request-response time`);
        console.log(`Hello from middleware`);

        res.on('finish', () => console.timeEnd(`Request-response time`));
        // must call next() to pass the request to the next middleware in the pipeline
        next();
    }
}
