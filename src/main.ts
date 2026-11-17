import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {BadRequestException, ValidationPipe} from "@nestjs/common";
import {GraphQLError} from "graphql";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, transform: true,
        exceptionFactory: (errors) => {
          const fields = errors.map(err => ({
            field: err.property,
            messages: Object.values(err.constraints ?? {})
          }));
          return new GraphQLError('Ошибка валидации', {extensions: {
              code: 'BAD_REQUEST',
              fields,
            }
          });
        }
      })
  );
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
