import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  
  getServerStatus(): { active: string } {
    return { active: 'The hood is up commandliner' };
  }
}
