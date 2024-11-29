import { IncomingMessage } from "node:http";

function isGet(req: IncomingMessage): boolean {
  return req.method === "GET";
}

function isPost(req: IncomingMessage): boolean {
  return req.method === "POST";
}

function isGetOrPost(req: IncomingMessage): boolean {
  return isGet(req) || isPost(req);
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

function transformRawData(rawData: string) {
  const rawPairs = rawData.split("&");
  const data: Record<string, string> = {};
  for (const pair of rawPairs) {
    const [key, rawValue] = pair.split("=");
    const value = rawValue.replaceAll("+", " ");
    data[key] = decodeURIComponent(value);
  }
  return data;
}

function handlePost(
  req: IncomingMessage,
  callback: (data: Record<string, string>, rawData: string) => void
) {
  let postData = "";
  req.on("data", (chunk) => {
    postData += chunk;
  });
  req.on("end", () => {
    callback(transformRawData(postData), postData);
  });
}

export {
  isGet,
  isStatic,
  isFavicon,
  guessMimeType,
  isGetOrPost,
  isPost,
  handlePost,
};
