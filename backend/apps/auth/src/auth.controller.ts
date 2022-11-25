import { Controller, Get } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { AuthService } from './auth.service';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.authService.getHello();
  }

  // @EventPattern('notifications')
  // getNotifications(@Payload() data: number[], @Ctx() context: RmqContext) {
  //   console.log(`Pattern: ${JSON.stringify(data)}`);
  //   return data + 'recived broo';
  // }

  @MessagePattern({ cmd: 'notifications' })
  async getGreetingMessageAysnc(name: string): Promise<object> {
    return { hey: 6 };
  }
}
