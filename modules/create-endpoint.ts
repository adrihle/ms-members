import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { HttpStatus } from 'interfaces';

type Cookie = {
  name: string;
  value: string;
  options: {
    ttl: number;
  };
};

export type MyResponse<T> = {
  body?: T;
  cookies?: Cookie[];
  error?: {
    key: string;
  };
  headers?: { [key: string]: string | number };
  location?: string;
  status?: HttpStatus;
};

//! Add here whatever you need to add to your requests
export interface MyRequest<T = any> extends NextApiRequest {
  body: T;
}

export type RouteHandler<OutType = any, InType = any> = (
  req: MyRequest<InType>
) => Promise<MyResponse<OutType>>;

export type Middleware = (
  req: MyRequest,
  res?: NextApiResponse
) => Promise<void>;

export const createEndpoints = (endpoints: {
  [key: string]: RouteHandler<any, any>;
}): NextApiHandler => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { method = '' } = req;
    const handler = endpoints[method.toLowerCase()];
    if (!handler) {
      return onError(new RouteError(HttpStatus.NOT_FOUND), req, res);
    }

    try {
      const {
        status = HttpStatus.NO_CONTENT,
        body,
        headers,
        location,
        cookies,
      } = await handler(req as MyRequest);
      const command = res.status(status);
      if (cookies) applyCookies(command, cookies);
      if (headers) applyHeaders(command, headers);
      if (location) {
        applyRedirect(command, location);
        command.end();
      } else {
        command.send(body || {});
        command.end();
      }
    } catch (err: any) {
      let error = err;
      if (error.status && error.error && !(error instanceof RouteError)) {
        error = new RouteError(error.status);
      }
      return onError(error, req, res);
    }
  };
};

const applyRedirect = (res: NextApiResponse, location: string) => {
  res.status(HttpStatus.TEMPORARY_REDIRECT);
  res.setHeader('Location', location);
};

const applyCookies = (res: NextApiResponse, cookies: Cookie[]) => {
  cookies.forEach(({ name, value, options = {} }) => {
    let valueStr = `${name}=${value};Path=/;`;
    if (options.ttl) valueStr += `Max-Age=${options.ttl};`;
    res.setHeader('Set-Cookie', valueStr);
  });
};

const applyHeaders = (
  res: NextApiResponse,
  headers: { [key: string]: string | number }
) => {
  Object.entries(headers).forEach(([key, value]) =>
    res.setHeader(key, String(value))
  );
};

export class RouteError {
  constructor(
    readonly status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
    readonly message: string = '',
    readonly _error?: Error
  ) {}

  toString(): string {
    return `[${this.status}]: ${this.message}`;
  }
}

function onError(
  error: RouteError | Error | any,
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (error.errmsg?.includes('E11000')) {
    error = new RouteError(HttpStatus.WRONG_REQUEST, undefined, error);
  }

  if (error instanceof RouteError) {
    const body = {
      message: error.message,
    };
    res.setHeader('silent', String(req.headers.silent));
    res.status(error.status).send(body);
  } else {
    const body = {
      error: 'ERROR_SERVER',
      message: 'Internal Server Error',
    };
    res.setHeader('silent', String(req.headers.silent));
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(body);
  }
}