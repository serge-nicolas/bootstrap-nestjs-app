import { Module, UploadedFile } from '@nestjs/common';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from './file-upload.service';

import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UploadedFile])],
  controllers: [FileUploadController],
  providers: [FileUploadService, ConfigService],
})
export class FileUploadModule {
  constructor(private configService: ConfigService) {}
}
