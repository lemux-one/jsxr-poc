import { createServer, STATUS_CODES } from "node:http";
import { TServerParams } from "./types";
import { createContext } from "./context";
import { HTTP } from "./constants";

function start(params: TServerParams) {
  const server = createServer();
  const { port, host, handlers } = params;

  server.on("request", (req, res) => {
    console.debug(`${req.method}: ${req.url}`);
    const url = new URL(req.url ?? "", `http://${req.headers.host}`);
    const ctx = createContext(req, res, url);
    const handler = handlers.find((current) => current.accepts(ctx));
    try {
      if (!handler) {
        const responseStatus =
          req.method === "GET" ? HTTP.NOT_FOUND : HTTP.BAD_REQUEST;
        console.warn(`[${responseStatus}] Un-handled`);
        ctx.text(STATUS_CODES[responseStatus], responseStatus);
      } else {
        handler.handle(ctx);
      }
    } catch (err) {
      ctx.error(`Server failure (on request): ${err}`);
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
