import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response/wrap-response.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout/timeout.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // apply the ValidationPipe to all routes
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
        }),
    );

    // setup swagger (not for production)
    const options = new DocumentBuilder()
        .setTitle('ILuvCoffin')
        .setDescription('Coffin application')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    // app.useGlobalFilters(new HttpExceptionFilter());
    // app.useGlobalInterceptors(new WrapResponseInterceptor(), new TimeoutInterceptor());
    const configService = app.get(ConfigService);
    const PORT = configService.get('PORT');
    await app.listen(PORT);
}

bootstrap();
