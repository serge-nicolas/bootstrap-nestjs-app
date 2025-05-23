import { entities } from '@/datasource';
import { dynamicImport } from '@/main';
import type * as TypeOrmTypes from '@adminjs/typeorm/lib/index.d';

export const createAdminJS = async () => {
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

  // const componentLoader = (await dynamicImport('./components')) as {
  //   componentLoader: any;
  // };

  const AdminJS = adminJSModule.default;
  const admin = new AdminJS({
    rootPath: '/admin',
    resources: entities,
  });
  AdminJS.registerAdapter({ Database, Resource });

  const adminRouter = AdminJSExpress.buildRouter(admin);

  return adminRouter;
};
