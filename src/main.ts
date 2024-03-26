import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;

  const config = new DocumentBuilder()
    .setTitle('Nevra Suite')
    .setDescription(
      'Nevra Suite is a comprehensive and integrated platform for data management and analysis, designed for small and ' +
        'medium-sized businesses. With a user-centric approach and an intuitive interface, Nevra Suite offers a wide   ' +
        'range of features to facilitate data collection, organization, analysis, and visualization.',
    )
    .setVersion('1.0')
    .addTag('Nevra')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
