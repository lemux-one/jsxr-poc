import { isGet } from "httpw";
import { IHandler } from "httpw/types";
import { HomePage } from "../../ui/pages/HomePage";

const homeHandler: IHandler = {
  accepts: (c) => isGet(c.req) && c.url.pathname === "/",
  handle(c) {
    c.html(<HomePage />);
  },
};

export { homeHandler };
