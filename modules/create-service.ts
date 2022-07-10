import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const BASE_URL = 'http://localhost:3000/api/';
const TOKEN = 'mediasmart2019';

export interface IHttpResponse<T> {
  status: number
  data: T
}

/**
 * Abstract class for http services with
 * abort controller trigger feature added
 * @constructor
 * @param {string} path Base subpath for requests
 * @param {Array<(req: AxiosRequestConfig) => void>} reqInterceptorHandlers Array of custom
 * interceptors functions for request
 * @param {Array<(req: AxiosRequestConfig) => void>}  resInterceptorHandlers Array of custom
 * interceptors functions for response
 * @param {Array<(err: AxiosError) => void>} resInterceptorErrorHandlers Array of custom
 * interceptors functions for error response
 * @version 1.00
 */

export abstract class HttpBase {
  protected readonly http: AxiosInstance;
  protected controller: AbortController;
  private requestingUrl = '';

  constructor (
    private readonly path: string = '',
    private readonly resInterceptorsHandlers: Array<(res: AxiosResponse) => void> = [],
    private readonly resInterceptorErrorHandlers: Array<(err: AxiosError) => void> = []
  ) {
    this.path = path[0] === '/' ? path : `/${path}`;

    this.http = axios.create({
      baseURL: this.path ? `${BASE_URL}${this.path}` : BASE_URL
    });

    this.controller = new AbortController();

    this.http.interceptors.request.use(req => {
      console.log(req)
      return { ...req, signal: this.controller.signal };
    });

    this.http.interceptors.response.use(
      res => {
        console.log('from response')
        return this.handleResponse(res);
      },
      err => {
        console.log('from response')
        return err;
      }
    );
  }

  protected checkAndRefreshController = (url: string): void => {
    if (this.requestingUrl !== url) {
      this.requestingUrl = url;
      return;
    }
    this.requestingUrl = '';
    this.controller.abort();
    this.controller = new AbortController();
  };

  protected handleRequestAuthorization = (req: AxiosRequestConfig): AxiosRequestConfig => {
    if (!TOKEN) return req;
    return { ...req, headers: { ...req.headers, Authorization: TOKEN } };
  };

  protected handleResponse<T>(response: AxiosResponse<T>): IHttpResponse<T> {
    const { data, status } = response;
    return { data, status };
  }
}

class Base extends HttpBase {
  constructor () {
    super('');
  }

  /**
   * Generic fetcher for standard use
   * @param {string} url Target url
   * @param {AxiosRequestConfig} config Optional request config
   * @type {T} Expected response interface
   * @version 1.00
   */

  public fetcher = async <T>(url: string, config?: AxiosRequestConfig): Promise<IHttpResponse<T>> => {
    return await this.http.get<T>(url, config).then(this.handleResponse);
  };

  /**
   * Generic poster for standard use
   * @param {string} url Target url
   * @param {K} data Optional body attached
   * @param {AxiosRequestConfig} config Optional request config
   * @type {T} Expected response interface
   * @type {K} Body interface
   * @version 1.00
   */

  public poster = async <T, K>(url: string, data?: K, config?: AxiosRequestConfig): Promise<IHttpResponse<T>> => {
    return await this.http.post(url, data, config).then(this.handleResponse);
  };

  /**
   * Generic putter for standard use
   * @param {string} url Target url
   * @param {K} data Optional body attached
   * @param {AxiosRequestConfig} config Optional request config
   * @type {T} Expected response interface
   * @type {K} Body interface
   * @version 1.00
   */

  public putter = async <T, K>(url: string, data?: K, config?: AxiosRequestConfig): Promise<IHttpResponse<T>> => {
    return await this.http.put(url, data, config).then(this.handleResponse);
  };

  /**
   * Generic deleter for standard use
   * @param {string} url Target url
   * @param {AxiosRequestConfig} config Optional request config
   * @type {T} Expected response interface
   * @version 1.00
   */

  public deleter = async <T>(url: string, config?: AxiosRequestConfig): Promise<IHttpResponse<T>> => {
    return await this.http.delete(url, config).then(this.handleResponse);
  };
}

export const { fetcher, poster, putter, deleter } = new Base();
