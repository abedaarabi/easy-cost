import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/token')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): any {
    return this.appService.getHello();
  }
}
