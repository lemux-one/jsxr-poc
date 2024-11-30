import { handlePost, isGetOrPost, isPost } from "httpw";
import { IHandler } from "httpw/types";
import { storage } from "../../utils";
import { TodosPage } from "../../ui/pages/TodosPage";

function merge(current: ITodo, allTodos: Record<string, string>) {
  const currentId = String(current.id);
  const overrides: Record<string, any> = {};
  let key = `${currentId}-desc`;
  if (allTodos[key]) overrides["desc"] = allTodos[key];
  key = `${currentId}-done`;
  overrides["done"] = Boolean(allTodos[key]) && allTodos[key] === "on";
  return {
    ...current,
    ...overrides,
  };
}

function updateMany(allTodos: Record<string, string>) {
  storage().todos = [...storage().todos].map((current: ITodo) =>
    merge(current, allTodos)
  );
}

function updateOne(allTodos: Record<string, string>, targetId: string) {
  storage().todos = [...storage().todos].map((current: any) => {
    const currentId = String(current.id);
    if (targetId === currentId) {
      return merge(current, allTodos);
    }
    return { ...current };
  });
}

const path = "/todos";
const todosHandler: IHandler = {
  accepts: (c) => isGetOrPost(c.req) && c.url.pathname === path,
  handle(c) {
    if (isPost(c.req)) {
      handlePost(c.req, (data) => {
        const { _type, ...allTodos } = data;
        const targetId = c.url.searchParams.get("todo");
        if (!targetId) updateMany(allTodos);
        else updateOne(allTodos, targetId);
        c.redir(path);
      });
    } else {
      c.html(<TodosPage />);
    }
  },
};

export { todosHandler };
