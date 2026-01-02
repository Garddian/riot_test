import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: true,
    });

    const config = new DocumentBuilder()
        .setTitle('Riot take-home API')
        .setDescription('Encrypt / Decrypt / Sign / Verify')
        .setVersion('1.0.0')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document); // URL: /docs
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: false,
            transform: true,
        }),
    );

    app.enableShutdownHooks();

    const port = 3000;
    const host = '0.0.0.0';

    await app.listen(port, host);
}
bootstrap();
