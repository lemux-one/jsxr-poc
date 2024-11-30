import { start } from "httpw";
import { env, storage } from "./server/utils";
import {
  homeHandler,
  loginHandler,
  staticHandler,
  todosHandler,
} from "./server/handlers";

const mockedUsers: IUser[] = [
  { id: 1, name: "Admin", user: "admin", password: "123" },
];
const mockedTodos: ITodo[] = [
  { id: 1, desc: "Try Tailwind 4 by building something", done: true },
  { id: 2, desc: "Post an article about it on my blog", done: false },
];
storage().users = mockedUsers;
storage().todos = mockedTodos;

start({
  port: env().port,
  host: env().host,
  handlers: [staticHandler, homeHandler, todosHandler, loginHandler],
});
