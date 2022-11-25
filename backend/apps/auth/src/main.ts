import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  await app.init();
  // const config = app.get<ConfigService>(ConfigService);

  const user = 'admin';
  const password = 'admin';
  const host = 'localhost:5672';
  const queueName = 'test-queue';

  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${user}:${password}@${host}`],
      queue: queueName,
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.startAllMicroservices();
}
bootstrap();
