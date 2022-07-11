import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { env } from "env";

const BASE_URL = env.api;
export abstract class HttpService {
    protected readonly http: AxiosInstance;
    public controller: AbortController;
    public requestingUrl = '';

    constructor(
        private readonly path?: string
    ){
        this.http = axios.create({
            baseURL: this.path ? `${BASE_URL}${this.path}` : BASE_URL
        });

        this.controller = new AbortController();

        this.http.interceptors.request.use(
            req => {
                if (this.requestingUrl === req.url){
                  this.requestingUrl = '';
                  this.controller.abort();
                  this.controller = new AbortController();
                }
                if (req.headers)
                this.requestingUrl = req.url ?? '';
                return {
                  ...req,
                  signal: this.controller.signal
                };
            }
        );
    };

    protected handleResponse<T>(response: AxiosResponse<T>): IHttpResponse<T> {
      return { data: response.data, status: response.status };
    }
}

export interface IHttpResponse<T> {
  status: number;
  data: T
}

class Base extends HttpService {
  public constructor() {
    super('');
  }

  public fetcher = async <T>(url: string, config?: AxiosRequestConfig): Promise<IHttpResponse<T>> => {
    return this.http.get(url, config).then(this.handleResponse);
  };

  public poster = async <T>(url: string, config?: AxiosRequestConfig, data?: Record<string, any>): Promise<IHttpResponse<T>> => {
    return this.http.post(url, data, config).then(this.handleResponse);
  };

  public putter = async <T>(url: string, config?: AxiosRequestConfig, data?: Record<string, any>): Promise<IHttpResponse<T>> => {
    return this.http.put(url, data, config).then(this.handleResponse);
  };

  public deleter = async <T>(url: string, config?: AxiosRequestConfig): Promise<IHttpResponse<T>> => {
    return this.http.delete(url, config).then(this.handleResponse);
  };
}

export const { fetcher, poster, putter, deleter } = new Base();