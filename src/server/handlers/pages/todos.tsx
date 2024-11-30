import { handlePost, isGetOrPost, isPost } from "httpw";
import { IHandler } from "httpw/types";
import { storage } from "../../utils";
import { TodosPage } from "../../ui/pages/TodosPage";

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

const todosHandler: IHandler = {
  accepts: (c) => isGetOrPost(c.req) && c.url.pathname === "/todos",
  handle(c) {
    if (isPost(c.req)) {
      handlePost(c.req, (data) => {
        const { _type, ...allTodos } = data;
        if (_type === "todos") {
          const targetId = c.url.searchParams.get("todo");
          if (!targetId) updateMany(allTodos);
          else updateOne(allTodos, targetId);
        }
        c.redir("/todos");
      });
    } else {
      c.html(<TodosPage />);
    }
  },
};

export { todosHandler };
