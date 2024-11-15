import {
  createServer,
  IncomingMessage,
  ServerResponse,
  STATUS_CODES,
} from "node:http";
import { extname as pathExtName } from "node:path";
import { readFile, access, constants } from "node:fs/promises";
import { IHttpContext, TServerParams } from "./types";
import { html } from "ssr";
import { guessMimeType } from "./utils";

function notFound(res: ServerResponse, reason = "") {
  const responseStatus = 404;
  console.warn(`[${responseStatus}] ${reason}`);
  res.writeHead(responseStatus, STATUS_CODES[responseStatus], {
    "Content-Type": "text/plain",
  });
  res.end();
}

function internalError(res: ServerResponse, reason = "") {
  const responseStatus = 500;
  console.error(`[${responseStatus}] ${reason}`);
  res.writeHead(responseStatus, STATUS_CODES[responseStatus], {
    "Content-Type": "text/plain",
  });
  res.end();
}

function createContext(
  req: IncomingMessage,
  res: ServerResponse
): IHttpContext {
  return {
    req,
    res,
    text(text) {
      res.writeHead(200, { "content-type": "text/plain" });
      res.end(text);
    },
    html(node) {
      res.writeHead(200, { "content-type": "text/html" });
      res.end(html(node));
    },
    async file(path, mime) {
      try {
        await access(path, constants.R_OK);
        const contents = await readFile(path);
        const ext = pathExtName(path);
        const contentType = mime ?? guessMimeType(ext);
        res.writeHead(200, { "content-type": contentType });
        res.end(contents);
      } catch (err) {
        notFound(res, `ERROR: ${err}`);
        return;
      }
    },
  };
}

function start(params: TServerParams) {
  const server = createServer();
  const { port, host, handlers } = params;

  server.on("request", (req, res) => {
    console.debug(`${req.method}: ${req.url}`);
    try {
      for (const handler of handlers) {
        if (handler.accepts(req)) {
          handler.handle(createContext(req, res));
          return;
        }
      }
      const responseStatus = req.method === "GET" ? 404 : 400;
      console.warn(`[${responseStatus}] for un-handled request...`);
      res.writeHead(responseStatus, STATUS_CODES[responseStatus], {
        "Content-Type": "text/plain",
      });
      res.end();
    } catch (err) {
      internalError(res, `Server failure (on request): ${err}`);
    }
  });

  server.on("error", (err) => {
    console.error(`Server failure (unexpected): ${err}`);
  });

  server.on("listening", () => {
    console.info(`Server ready at http://${host}:${port}`);
  });

  server.listen(port, host);
}

export { start };
export * from "./utils";
