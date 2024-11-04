import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getServerStatus(): { active: string } {
    return { active: 'The hood is up commandliner' };
  }
}
