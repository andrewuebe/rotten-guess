import { config } from '../config/';

export const getApiUrl = () => {
  return config.protocol + config.baseUrls.api;
}

export const insertInObjectIf = (condition: boolean, keyValues: Object) => {
  return condition ? keyValues : {};
}