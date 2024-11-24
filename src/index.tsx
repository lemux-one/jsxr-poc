import { isFavicon, isGet, isStatic, start } from "httpw";
import { env, join } from "./server/utils";
import { HomePage } from "./server/pages/HomePage";

start({
  port: env().port,
  host: env().host,
  handlers: [
    {
      accepts: (req) => isStatic(req),
      handle(c) {
        const relativePath = isFavicon(c.req)
          ? "favicon.ico"
          : String(c.req.url).split(env().staticPrefix)[1];
        const fileCandidates = env().staticDirs.map((staticDir) =>
          join(staticDir, relativePath)
        );
        c.file(fileCandidates);
      },
    },
    {
      accepts: (req) => isGet(req) && req.url === "/",
      handle(c) {
        c.html(<HomePage />);
      },
    },
  ],
});
