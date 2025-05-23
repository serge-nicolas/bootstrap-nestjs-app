import { DataSource, DataSourceOptions } from 'typeorm';

// import all needed entities
import { User } from './modules/default/user/entities/user.entity';
import { Url } from './modules/app/url/entities/url.entity';
import { UploadedFile } from './modules/default/file-upload/entities/uploadedFile.entity';

// export for adminjs
export const entities = [User, Url, UploadedFile];

// export for NestJS
export const dataSourceObject: DataSourceOptions = {
  type: 'better-sqlite3',
  database: './test.sqlite',
  entities: entities,
  synchronize: process.env.NODE_ENV === 'dev',
};

// add all entities
export const dataSource = new DataSource(dataSourceObject);

// for adminjs
export default dataSource;
