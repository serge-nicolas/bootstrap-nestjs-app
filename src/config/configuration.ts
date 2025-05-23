import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

import { config as dotEnvConfig } from 'dotenv';

const YAML_CONFIG_FILENAME = 'config.yaml';

export default () => {
  const config = yaml.load(
    readFileSync(join(__dirname, YAML_CONFIG_FILENAME), 'utf8'),
  ) as Record<string, any>;

  if (config.http.port < 1024 || config.http.port > 49151) {
    throw new Error('HTTP port must be between 1024 and 49151');
  }

  const { parsed } = dotEnvConfig({ path: `.env.${process.env.NODE_ENV}` });

  // add dotenv to global config
  return { ...config, ...parsed };
};
