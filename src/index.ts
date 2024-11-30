import { start } from "httpw";
import { env, storage } from "./server/utils";
import { homeHandler, staticHandler } from "./server/handlers";
import { todosHandler } from "./server/handlers/pages/todos";

storage().users = [{ id: 1, name: "Lemurio" }];
storage().todos = [
  { id: 1, desc: "Try Tailwind 4 by building something", done: true },
  { id: 2, desc: "Post an article about it on my blog", done: false },
];

start({
  port: env().port,
  host: env().host,
  handlers: [staticHandler, homeHandler, todosHandler],
});
