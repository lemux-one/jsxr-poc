import { isGet, start } from "httpw";
import { env } from "./server/utils";
import { HomePage } from "./server/pages/HomePage";
import { staticHandler } from "./server/handlers";

start({
  port: env().port,
  host: env().host,
  handlers: [
    staticHandler,
    {
      accepts: (req) => isGet(req) && req.url === "/",
      handle(c) {
        c.html(<HomePage />);
      },
    },
  ],
});
