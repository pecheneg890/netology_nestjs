import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class IdValidationPipe implements PipeTransform {
  transform(id: string) {
    //проверка формата id
    if (id.length !== 24 || !/^[a-fA-F0-9]+$/.test(id)) {
      throw new Error('Id in wrong format');
    }

    //возвращаем значение в нижнем регистре
    return id.toLowerCase();
  }
}
