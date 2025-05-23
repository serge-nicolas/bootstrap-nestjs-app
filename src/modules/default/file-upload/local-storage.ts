import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import multer from 'multer';
import slugify from 'slugify';

export const storageOptions = ({ ...args }): MulterOptions => {
  const { dest } = args;

  return {
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, dest);
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const { userId } = req.body as { [key: string]: string };
        const fn = `${userId}-${file.fieldname}-${uniqueSuffix}-${slugify(file.originalname)}`;
        cb(null, fn);

        return fn;
      },
    }),
  };
};
