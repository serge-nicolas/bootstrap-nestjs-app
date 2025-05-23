import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { DataSource } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { dataSourceObject } from './datasource';

import { UserModule } from './modules/default/user/user.module';
import { AuthModule } from './modules/default/auth/auth.module';
import { FileUploadModule } from './modules/default/file-upload/file-upload.module';

import configuration from './config/configuration';

import { UrlModule } from './modules/app/url/url.module';
import { LoggerService } from './modules/default/logger/logger.service';
import { RbacModule } from './modules/default/rbac/rbac.module';

@Module({
  imports: [
    // config modules
    ConfigModule.forRoot({
      load: [configuration],
    }),

    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
    TypeOrmModule.forRoot({ autoLoadEntities: true, ...dataSourceObject }),
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    // app modules
    UrlModule,
    UserModule,
    AuthModule,
    FileUploadModule,
    RbacModule,
  ],
  controllers: [AppController],
  providers: [AppService, LoggerService],
})
export class AppModule {
  constructor(
    private dataSource: DataSource,
    private configService: ConfigService,
  ) {}
}
