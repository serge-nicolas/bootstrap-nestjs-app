import * as dotenv from 'dotenv';
import { resolve } from 'path';
dotenv.config({
  path: resolve(__dirname, `../.env.${process.env.NODE_ENV}`),
});

import helmet from 'helmet';

import { NestFactory } from '@nestjs/core';
import session from 'express-session';
import { AppModule } from './app.module';

import datasource, { entities } from './datasource';

import type * as TypeOrmTypes from '@adminjs/typeorm/lib/index.d';

import { readFileSync as fsReadFileSync } from 'fs';
import { LoggerService } from './modules/default/logger/logger.service';

// adminjs config
import DashboardComponent from './adminjs/components/Dashboard';

export const dynamicImport = async (packageName: string) =>
  new Function(`return import('${packageName}')`)();

let appLogger: LoggerService;

async function bootstrap() {
  const httpsOptions = {
    key: fsReadFileSync(process.env.APP_KEY_PEM || './src/cert/key.pem'),
    cert: fsReadFileSync(process.env.APP_KEY_CERT || './src/cert/cert.pem'),
  };

  const app = await NestFactory.create(AppModule, {
    httpsOptions,
    logger: ['error', 'warn', 'verbose', 'log', 'fatal'],
  });

  await datasource.initialize();

  const {
    Database,
    Resource,
  }: { Database: TypeOrmTypes.Database; Resource: TypeOrmTypes.Resource } =
    (await dynamicImport('@adminjs/typeorm')) as {
      Database: TypeOrmTypes.Database;
      Resource: TypeOrmTypes.Resource;
    };

  const adminJsExpress = (await dynamicImport('@adminjs/express')) as {
    default: any;
  };
  const AdminJSExpress = adminJsExpress.default;

  const adminJSModule = (await dynamicImport('adminjs')) as {
    default: any;
  };
  const AdminJS = adminJSModule.default;

  AdminJS.registerAdapter({ Database, Resource });

  const admin = new AdminJS({
    rootPath: process.env.ADMINJS_ROOT_PATH || '/admin',
    resources: entities,
    componentLoader: {
      Dashboard: DashboardComponent,
    },
  });

  const adminRouter = AdminJSExpress.buildRouter(admin);

  app.use(process.env.ADMINJS_ROOT_PATH || '/admin', adminRouter);
  app.use(
    session({
      secret: process.env.APP_SECURITY_SECRET || 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );

  appLogger = new LoggerService('NestBootstrap');
  app.useLogger(appLogger);

  app.use(helmet());

  await app.listen(
    process.env.APP_PORT || 3000,
    process.env.APP_HOST || 'localhost',
  );
  return app;
}
bootstrap()
  .then((app: any) => {
    appLogger.info(
      `App bootsraped, address: \thttps://${process.env.APP_HOST}:${process.env.APP_PORT ?? 3000}`,
      'Ready',
    );
    appLogger.info(
      `\t\t admin: \thttps://${process.env.APP_HOST}:${process.env.APP_PORT ?? 3000}${
        process.env.ADMINJS_ROOT_PATH
      }`,
      'Ready',
    );
  })
  .catch((error) => {
    console.error(error);
  });
