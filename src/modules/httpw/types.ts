import { type IncomingMessage, type ServerResponse } from "node:http";

interface IHttpContext {
  req: IncomingMessage;
  res: ServerResponse<IncomingMessage>;
  url: URL;
  text(text?: string, statusCode?: number): void;
  html(node: unknown, statusCode?: number): void;
  file(paths: string[], mime?: string): void;
  redir(location: string, statusCode?: number): void;
  error(reason?: string, statusCode?: number): void;
}

interface IHandler {
  accepts(ctx: IHttpContext): boolean;
  handle(ctx: IHttpContext): void;
  unprotected?: boolean;
}

interface IMiddleware {
  apply(ctx: IHttpContext): void;
}

type TServerParams = {
  port: number;
  host: string;
  handlers: IHandler[];
  before?: IMiddleware[];
  after?: IMiddleware[];
};

export { TServerParams, IHandler, IHttpContext };
