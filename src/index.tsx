import { handlePost, isGetOrPost, isPost, start } from "httpw";
import { env, storage } from "./server/utils";
import { HomePage } from "./server/ui/pages/HomePage";
import { staticHandler } from "./server/handlers";

storage().users = [{ id: 1, name: "Lemurio" }];
storage().todos = [
  { id: 1, desc: "Try Tailwind 4 by building something", done: true },
  { id: 2, desc: "Post an article about it on my blog", done: false },
];

function updateMany(allTodos: Record<string, string>) {
  let overrides: Record<string, any>;
  let key: string;
  storage().todos = [...storage().todos].map((current: any) => {
    const currentId = String(current.id);
    overrides = {};
    key = `${currentId}-desc`;
    if (allTodos[key]) overrides["desc"] = allTodos[key];
    key = `${currentId}-done`;
    if (allTodos[key]) overrides["done"] = allTodos[key] === "on";
    return {
      ...current,
      ...overrides,
    };
  });
}

function updateOne(allTodos: Record<string, string>, targetId: string) {
  let overrides: Record<string, any>;
  let key: string;
  storage().todos = [...storage().todos].map((current: any) => {
    const currentId = String(current.id);
    if (targetId === currentId) {
      overrides = {};
      key = `${currentId}-desc`;
      if (allTodos[key]) overrides["desc"] = allTodos[key];
      key = `${currentId}-done`;
      if (allTodos[key]) overrides["done"] = allTodos[key] === "on";
      return {
        ...current,
        ...overrides,
      };
    }
    return { ...current };
  });
}

start({
  port: env().port,
  host: env().host,
  handlers: [
    staticHandler,
    {
      accepts: (c) => isGetOrPost(c.req) && c.url.pathname === "/",
      handle(c) {
        if (isPost(c.req)) {
          handlePost(c.req, (data) => {
            const { _type, ...allTodos } = data;
            if (_type === "todos") {
              const targetId = c.url.searchParams.get("todo");
              if (!targetId) updateMany(allTodos);
              else updateOne(allTodos, targetId);
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
