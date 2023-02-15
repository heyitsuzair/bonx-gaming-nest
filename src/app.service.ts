import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'You Sneaky Developer! What Are You Doing Here?';
  }
}
