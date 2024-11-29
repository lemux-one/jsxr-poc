import { handlePost, isGetOrPost, isPost, start } from "httpw";
import { env, storage } from "./server/utils";
import { HomePage } from "./server/ui/pages/HomePage";
import { staticHandler } from "./server/handlers";

storage().users = [{ id: 1, name: "Lemurio" }];
storage().todos = [
  { id: 1, desc: "Try Tailwind 4 by building something", done: true },
  { id: 2, desc: "Post an article about it on my blog", done: false },
];

start({
  port: env().port,
  host: env().host,
  handlers: [
    staticHandler,
    {
      accepts: (req) => isGetOrPost(req) && req.url === "/",
      handle(c) {
        if (isPost(c.req)) {
          handlePost(c.req, (data) => {
            const { _type, ...todo } = data;
            if (_type === "todo") {
              storage().todos = [...storage().todos].map((current: any) => {
                if (String(current.id) === todo.id) {
                  return {
                    ...current,
                    desc: todo.desc,
                    done: todo.done === "on",
                  };
                }
                return current;
              });
            }
            c.html(<HomePage />);
          });
        } else {
          c.html(<HomePage />);
        }
      },
    },
  ],
});
