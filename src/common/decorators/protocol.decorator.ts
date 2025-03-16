import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// use createParamDecorator to create a "custom param decorator" to access the protocol of the request in the route handler in controllers (e.g., the CoffinsController)
export const Protocol = createParamDecorator(
    (defaultValue: string, ctx: ExecutionContext) => {
        console.log(defaultValue);
        const request = ctx.switchToHttp().getRequest();
        return request.protocol;
    },
);
