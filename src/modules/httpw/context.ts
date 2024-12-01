import { IncomingMessage, ServerResponse, STATUS_CODES } from "node:http";
import { extname as pathExtName } from "node:path";
import { readFile, access, constants } from "node:fs/promises";
import { IHttpContext } from "./types";
import { html } from "ssr";
import { guessMimeType } from "./utils";
import { HTTP } from "./constants";

function respondWith(
  res: ServerResponse,
  content: unknown,
  params?: { code?: number; type?: string; loggable?: boolean }
) {
  const { code = HTTP.OK, type = "text/plain", loggable } = params ?? {};
  const shouldLog = loggable ?? code >= 400;
  if (shouldLog) console.debug(`[${code}] ${STATUS_CODES[code]}`);
  res.writeHead(code, STATUS_CODES[code], { "content-type": type });
  function onReady() {
    res.end();
  }
  if (!res.write(content)) {
    res.once("drain", onReady);
  } else {
    process.nextTick(onReady);
  }
}

function createContext(
  req: IncomingMessage,
  res: ServerResponse,
  url: URL
): IHttpContext {
  return {
    req,
    res,
    url,
    text(text = "", code = HTTP.OK) {
      respondWith(res, text, { code });
    },
    html(node, code = HTTP.OK) {
      respondWith(res, html(node), { code, type: "text/html" });
    },
    async file(paths, mime) {
      let path = null;
      for (let i = 0; !path && i < paths.length; i++) {
        try {
          await access(paths[i], constants.R_OK);
          path = paths[i];
        } catch (_err) {}
      }
      if (!path) {
        respondWith(res, STATUS_CODES[HTTP.NOT_FOUND], {
          code: HTTP.NOT_FOUND,
        });
      } else {
        try {
          const contents = await readFile(path);
          const ext = pathExtName(path);
          const contentType = mime ?? guessMimeType(ext);
          respondWith(res, contents, { code: HTTP.OK, type: contentType });
        } catch (err) {
          console.error(`failed to serve static file '${path}'`, err);
          respondWith(res, STATUS_CODES[HTTP.NOT_FOUND], {
            code: HTTP.NOT_FOUND,
          });
        }
      }
    },
    redir(location, code = HTTP.SEE_OTHER) {
      res.writeHead(code, STATUS_CODES[code], {
        Location: location,
      });
    },
    error(reason, code = HTTP.INTERNAL_ERROR) {
      const message = reason ?? STATUS_CODES[code];
      console.error(`[${code}] ${message}`);
      respondWith(res, message, { code });
    },
  };
}

export { createContext };
