import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const PORT = 3333;
    await app.listen(PORT, () => {
        console.log(`App is listening on port ${PORT}`);
    })
}

bootstrap();