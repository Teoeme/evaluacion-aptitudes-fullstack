import axios, { AxiosError, type AxiosInstance } from "axios";
import type { HttpAdapter } from "./http.adapter";
import { AxiosErrorMapper } from "./axiosErrorMapper";
import type { IErrorMapper } from "./IErrorMapper";

type Options = {
  baseUrl: string;
  headers?: Record<string, string>;
};

export class AxiosAdapter implements HttpAdapter {
  private readonly axiosInstance: AxiosInstance;
  errorMapper: IErrorMapper;

  constructor(options: Options) {
    this.axiosInstance = axios.create({
      baseURL: options.baseUrl,
      headers: options.headers,
      withCredentials: true,
    });

    this.errorMapper = new AxiosErrorMapper();

    this.axiosInstance.interceptors.response.use( //pasarlo por el mapper central
      (res)=>res,
      (err:AxiosError) =>{
        const mappedError=this.errorMapper.fromFetcherError(err)
        return Promise.reject(mappedError)
      }
    )
  }

  async get<T>(url: string, options?: Record<string, unknown>): Promise<T> {
    const { data } = await this.axiosInstance.get<T>(url, {
     ...options,
    });
    return data;
  }

  async post<T>(
    url: string,
    body?: unknown,
    options?: Record<string, unknown>
  ): Promise<T> {
    const { data } = await this.axiosInstance.post<T>(url, body, {
      ...options,
    });
    return data;
  }

  async put<T>(
    url: string,
    body?: unknown,
    options?: Record<string, unknown>
  ): Promise<T> {
    const { data } = await this.axiosInstance.put<T>(url, body, {
      ...options,
    });
    return data;
  }

  async patch<T>(
    url: string,
    body?: unknown,
    options?: Record<string, unknown>
  ): Promise<T> {
    const { data } = await this.axiosInstance.patch<T>(url, body, {
      ...options,
    });
    return data;
  }

  async delete<T>(url: string, options?: Record<string, unknown>): Promise<T> {
    const { data } = await this.axiosInstance.delete<T>(url, {
      ...options,
    });
    return data;
  }
}
