import { IncomingMessage } from "node:http";

function isGet(req: IncomingMessage): boolean {
  return req.method === "GET";
}

function isFavicon(req: IncomingMessage): boolean {
  return req.url === "/favicon.ico";
}

function isStatic(req: IncomingMessage, prefix = "/static/"): boolean {
  return isGet(req) && (isFavicon(req) || String(req.url).startsWith(prefix));
}

const mimeTypes: Record<string, string> = {
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpg",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
};

function guessMimeType(ext: string): string {
  if (Object.keys(mimeTypes).includes(ext)) {
    return mimeTypes[ext];
  }
  return "application/octet-stream";
}

export { isGet, isStatic, isFavicon, guessMimeType };
