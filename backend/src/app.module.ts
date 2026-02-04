import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';

@Module({
    // "merge key/value pairs from the .env file" https://docs.nestjs.com/techniques/configuration
    imports:[
      ConfigModule.forRoot({
        isGlobal: true,
      }),
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT),  // Type 'string' is not assignable to type 'number'.ts(2322)
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_DB,
        entities: [],
        synchronize: true,      // "Setting synchronize: true shouldn't be used in production - otherwise you can lose production data"
        autoLoadEntities: true, // entities - "classes that map to database tables" (https://typeorm.io/docs/entity/entities/)
                                // user 
      }),
      UsersModule,
      AuthModule,
      AdminModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
