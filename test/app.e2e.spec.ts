import * as dotenv from 'dotenv';
import { resolve } from 'path';
dotenv.config({
  path: resolve(__dirname, `../.env.${process.env.NODE_ENV}`),
});

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';

import { describe, it, beforeEach, expect } from 'vitest';

import * as FormData from 'form-data';
import axios from 'axios';
import { readFile } from 'fs/promises';

const wait = (ms = 1000) => {
  return new Promise((resolve) => setTimeout(() => resolve(''), ms));
};

describe('AppController (e2e)', () => {
  it('should upload image', async () => {
    await wait(2000);
    const form_data = new FormData.default();
    form_data.append('userId', Math.random().toString(36).substring(2, 15));
    form_data.append(
      'file',
      await readFile('./test/files/617147.jpg'),
      '617147.jpg',
    );

    const res = await axios.post(
      'https://localhost:3000/upload/image',
      form_data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Content-Length': form_data.getLengthSync(),
          'Content-Disposition':
            'form-data; name="file"; filename="617147.jpg"',
          'Content-Transfer-Encoding': 'binary',
          ...form_data.getHeaders(),
        },
      },
    );

    console.log(res.data);
    expect(res.status).toBe(201);
  }, 10000);
});
