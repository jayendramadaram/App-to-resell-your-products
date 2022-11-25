import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, timeout } from 'rxjs';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('HELLO_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Get()
  async getHello(): Promise<any> {
    console.log('OHHH BHAIIII ');

    const resp = await this.client.send(
      { cmd: 'notifications' },
      'Progressive Coder',
    );

    return resp;
  }
}
