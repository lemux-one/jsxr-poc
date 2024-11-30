import { isFavicon, isStatic } from "httpw";
import { env, join } from "../utils";
import { IHandler } from "httpw/types";

const staticHandler: IHandler = {
  accepts: (c) => isStatic(c.req),
  handle(c) {
    const relativePath = isFavicon(c.req)
      ? "favicon.ico"
      : String(c.req.url).split(env().staticPrefix)[1];
    const fileCandidates = env().staticDirs.map((staticDir) =>
      join(staticDir, relativePath)
    );
    c.file(fileCandidates);
  },
};

export { staticHandler };
