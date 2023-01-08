import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface IAxiosHttpConf {
  baseURL: string;
}

export class AxiosHttp {
  private readonly config: IAxiosHttpConf;

  private axiosInstance: AxiosInstance;

  constructor(config: IAxiosHttpConf) {
    this.config = config;
    this.axiosInstance = this.initAxios();
  }

  async delete<ResponseType>(
    url: string
  ): Promise<AxiosResponse<ResponseType>> {
    return this.axiosInstance.delete<
      ResponseType,
      AxiosResponse<ResponseType>,
      null
    >(url);
  }

  async get<ResponseType>(
    url: string,
    config: AxiosRequestConfig<null> | undefined = undefined
  ): Promise<AxiosResponse<ResponseType>> {
    return this.axiosInstance.get<
      ResponseType,
      AxiosResponse<ResponseType>,
      null
    >(url, config);
  }

  async post<RequestType, ResponseType>(
    url: string,
    data?: RequestType
  ): Promise<AxiosResponse<ResponseType>> {
    return this.axiosInstance.post<
      ResponseType,
      AxiosResponse<ResponseType>,
      RequestType
    >(url, data);
  }

  async put<RequestType, ResponseType>(
    url: string,
    data?: RequestType
  ): Promise<AxiosResponse<ResponseType>> {
    return this.axiosInstance.put<
      ResponseType,
      AxiosResponse<ResponseType>,
      RequestType
    >(url, data);
  }

  private initAxios(): AxiosInstance {
    const { baseURL } = this.config;
    const axiosInstance = axios.create();
    axiosInstance.defaults.baseURL = baseURL;

    return axiosInstance;
  }
}

export class Http {
  static axios: AxiosHttp;

  static init() {
    this.axios = new AxiosHttp({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  }
}
