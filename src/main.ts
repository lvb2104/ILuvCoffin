import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            // enable validation error response
            whitelist: true,
            // enable auto-transforming payloads to their respective DTO instances
            transform: true,
            // forbid non-whitelisted properties in the payload
            forbidNonWhitelisted: true,
            // enable implicit type conversion
            transformOptions: {
                enableImplicitConversion: true,
            },
        }),
    );
    const PORT = process.env.PORT;
    await app.listen(PORT);
}

bootstrap();
