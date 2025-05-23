import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Param,
  ParseFilePipeBuilder,
  ParseFilePipe,
  Get,
  Res,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

import { storageChooser } from './storage';

import { FileUploadDto } from './file.dto';
import { FileUploadService } from './file-upload.service';

import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('upload')
export class FileUploadController {
  private readonly logger = new Logger(FileUploadController.name);
  private validationPipe: ParseFilePipe;

  constructor(
    private readonly service: FileUploadService,
    private readonly configService: ConfigService,
  ) {
    /// how to use this pattern ?
    this.validationPipe = new ParseFilePipeBuilder()
      .addFileTypeValidator({
        fileType: 'image/jpg',
      })
      .addMaxSizeValidator({
        maxSize: +this.configService.get('APP_UPLOAD_MAX_FILE_SIZE'),
      })
      .build();
  }

  /**
   * Get url from uuid in database
   * @param id
   * @param response
   * @returns url of file
   */

  @Get('image/:id')
  async getFile(@Param('id') id: string) {
    const file = await this.service.getFile(id);
    if (!file) {
      throw new Error('File not found');
    }
    return file;
  }

  /**
  auto write file to tmp from multer storage parameter
  */
  @Post('image')
  @UseInterceptors(FileInterceptor('file', storageChooser()))
  async uploadFile(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    if (!file) {
      throw new Error('File is required');
    }
    try {
      const uploadRes = await this.service.uploadFile(file);
      return [uploadRes];
    } catch (error) {
      this.logger.error(error);
      throw new Error('Failed to register file');
    }
  }
}
