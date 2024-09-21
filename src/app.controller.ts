import {
  Controller,
  Get,
  UseFilters,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './http-exception.filter';

@Controller()
@UseFilters(HttpExceptionFilter)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    throw new HttpException('Not implemented', HttpStatus.NOT_FOUND);
    return this.appService.getHello();
  }
}
