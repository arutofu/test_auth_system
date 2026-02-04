import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { UsersService } from './users.service';


@Injectable()
export class UsersInit implements OnModuleInit {
  constructor(private readonly usersService: UsersService) {}

  async onModuleInit() {
    // Add First Admin
    const email = process.env.FIRST_ADMIN_EMAIL;
    const password = process.env.FIRST_ADMIN_PASSWORD;

    Logger.log(`FIRST_ADMIN_EMAIL=${process.env.FIRST_ADMIN_EMAIL}`);
    Logger.log(`FIRST_ADMIN_PASSWORD=${process.env.FIRST_ADMIN_PASSWORD}`);

    if (!email || !password){
      Logger.warn('Skip admin creation: env vars are missing');
      return
    } ;

    try {
      await this.usersService.ensureFirstAdmin(email, password);
      Logger.log('ensureFirstAdmin finished');
    } catch (e: any) {
      Logger.error(`ensureFirstAdmin failed: ${e?.message ?? e}`);
      throw e;
    }
  }
}
