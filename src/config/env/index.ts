import { NativeModules } from 'react-native';
import { DEV_API_URL, STAG_API_URL, PROD_API_URL } from '@env';
import { EnvConfigType, EnvType } from './types';

const env: EnvType = NativeModules.RNConfig.env;

const devEnvConfig: EnvConfigType = {
  env: env,
  apiUrl: DEV_API_URL,
};

const stagEnvConfig: EnvConfigType = {
  env: env,
  apiUrl: STAG_API_URL,
};

const prodEnvConfig: EnvConfigType = {
  env: env,
  apiUrl: PROD_API_URL,
};

const isDevelopment = env === 'dev';
const isStaging = env === 'stag';

const envConfig = isDevelopment
  ? devEnvConfig
  : isStaging
  ? stagEnvConfig
  : prodEnvConfig;

export default envConfig;
