import { storageOptions as localStorageOptions } from './local-storage';

export const storageChooser = () => {
  const dest = process.env.APP_UPLOAD_DESTINATION || 'uploads';
  switch (process.env.APP_UPLOAD_STORAGE_TYPE) {
    case 'local':
      return localStorageOptions({ dest });
      break;
    default:
      throw Error('storage definition');
  }
};
