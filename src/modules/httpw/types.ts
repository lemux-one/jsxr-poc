import { type IncomingMessage, type ServerResponse } from "node:http";

interface IHttpContext {
  req: IncomingMessage;
  res: ServerResponse<IncomingMessage>;
  text(text: string): void;
  html(node: unknown): void;
  file(paths: string[], mime?: string): void;
}

interface IHandler {
  accepts(req: IncomingMessage): boolean;
  handle(ctx: IHttpContext): void;
}

type TServerParams = {
  port: number;
  host: string;
  handlers: IHandler[];
};

export { TServerParams, IHandler, IHttpContext };
