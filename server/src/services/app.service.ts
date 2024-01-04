import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/user.dto';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
