import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  createUser(body: { username: string; email: string; password: string }): any {
    return {
      message: 'User created successfully',
      data: body,
    };
  }
}
