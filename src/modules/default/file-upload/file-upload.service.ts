import { Injectable } from '@nestjs/common';

import { CustomError } from '@/decorators/error/error.decorator';
import { dataSource } from '@/datasource';

import { UploadedFile } from './entities/uploadedFile.entity';
import axios from 'axios';

import { readFile } from 'fs/promises';
import path from 'path';

import * as FormData from 'form-data';

/**
 * File upload service.
 * Upload only one file at a time.
 * Send file to file server (seaweedfs)
 * store file informations in database
 *
 * @class FileUploadService
 * @extends {Injectable}
 * @returns JSON with file information : url = public url, uuid = database id, tmpfilename = temporary filename, location = temporary location and filename
 */
@Injectable()
export class FileUploadService {
  private repo = dataSource.getRepository(UploadedFile);
  private readonly axiosInstance = axios.create({
    baseURL: new URL(`${process.env.APP_UPLOAD_LOCAL_SERVER}:9333`).toString(),
  });
  constructor() {}

  async getFile(id: string): Promise<string> {
    const res = await this.repo.findOneBy({
      uuid: id,
    });
    if (!res) {
      throw new Error('File not found');
    }
    return res.url;
  }

  @CustomError('uploadFile')
  async uploadFile(file: Express.Multer.File) {
    if (!file) {
      throw new Error('File is required');
    }

    const volume = await this.axiosInstance(`/dir/assign`);
    const tmpFile = path.resolve(file.path);

    try {
      const form_data = new FormData.default();
      form_data.append('file', await readFile(tmpFile), file.originalname);
      const uploadFile = await axios.post(
        new URL(
          `${process.env.APP_UPLOAD_LOCAL_SERVER}:8080/${volume.data.fid}`,
        ).toString(),
        form_data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Content-Length': form_data.getLengthSync(),
            'Content-Disposition': `form-data; name="file"; filename="${file.originalname}"`,
            'Content-Transfer-Encoding': 'binary',
            ...form_data.getHeaders(),
          },
        },
      );

      if (volume.data === undefined) {
        throw new Error('File server error');
      }

      const res = await this.repo.save({
        localUrl: file.path,
        url: new URL(
          `${process.env.APP_UPLOAD_PUBLIC_SERVER}:8080/${volume.data.fid.replace(',', '/')}/${uploadFile.data.name}`,
        ).toString(),
        originalName: file.originalname,
        tmpfileName: file.filename,
        mimeType: file.mimetype,
        size: uploadFile.data.size,
        sizeUnit: 'B',
      });
      return {
        ...res,
        publicUrl: `${process.env.APP_HOST}:${process.env.APP_PORT}/upload/image/${res.uuid}`,
      };
    } catch (error) {
      console.log(error);
      throw new Error('Upload failed');
    }
  }
}
