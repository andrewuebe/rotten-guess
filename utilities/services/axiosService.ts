import axios from 'axios';
import axiosRetry from 'axios-retry';
import { insertInObjectIf } from '../helpers/generalHelpers';
import { JwtToken } from '../constants/APIConstants';

interface ApiServiceProps {
  baseUrl: string;
  timeout?: number;
  responseType?: string;
  retries?: number;
  headers?: any;
  requestInterceptor?: (req: any) => any;
  responseInterceptor?: (res: any) => any;
  responseErrorInterceptor?: (error: any) => any;
}

class ApiService {
  instance: any;

  constructor({
    baseUrl,
    timeout,
    responseType,
    retries,
    headers,
    requestInterceptor,
    responseInterceptor,
    responseErrorInterceptor,
  }: ApiServiceProps) {
    axiosRetry(axios, { retries: retries || 3 });

    this.instance = axios.create({
      baseURL: baseUrl,
      timeout: timeout || 4000,
      ...insertInObjectIf(!!responseType, { responseType }),
    });

    const defaultRequestInterceptor = (req: any) => {
      const controller = new window.AbortController();

      const currentToken = localStorage.getItem(JwtToken.LOCAL_STORAGE_KEY);

      if (headers) req.headers = { ...req.headers, ...headers };

      if (!req.headers.authorization) {
        req.headers.authorization = `Bearer ${currentToken}`;
      }

      return req;
    }

    const defaultResponseErrorHandler = (error: any) => {
      const currentToken = localStorage.getItem(JwtToken.LOCAL_STORAGE_KEY);
      if (currentToken && error.response.status === 401) {
        localStorage.removeItem(JwtToken.LOCAL_STORAGE_KEY);
      }
      throw error;
    };

    this.instance.interceptors.request.use(
      requestInterceptor || defaultRequestInterceptor
    );

    this.instance.interceptors.response.use(
      responseInterceptor,
      responseErrorInterceptor || defaultResponseErrorHandler
    );

  }

  async get(endpoint: string, params = <Object>{}) {
    try {
      const headers = endpoint.includes('http')
        ? {}
        : {
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
          Expires: 0
        };

      const response = await this.instance.get(endpoint, { ...params, ...headers });
      return response;
    } catch (error: any) {
      throw error;
    }
  };

  async post(endpoint: string, data = <Object>{}, customHeaders = {}) {
    try {
      const response = await this.instance.post(endpoint, data, customHeaders);
      return response;
    } catch (error: any) {
      throw error;
    }
  };

  async put(endpoint: string, data = <Object>{}) {
    try {
      const response = await this.instance.put(endpoint, data);
      return response;
    } catch (error: any) {
      throw error;
    }
  };

  async patch(endpoint: string, data = <Object>{}) {
    try {
      const response = await this.instance.patch(endpoint, data);
      return response;
    } catch (error: any) {
      throw error;
    }
  };

  async delete(endpoint: string) {
    try {
      const response = await this.instance.delete(endpoint);
      return response;
    } catch (error: any) {
      throw error;
    }
  };
}

export default ApiService;