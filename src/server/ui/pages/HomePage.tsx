import { BaseLayout } from "../layouts/BaseLayout";
import { For, Show } from "../helpers";
import { storage } from "../../utils";

interface ITodo {
  id: number;
  desc: string;
  done?: boolean;
}

function Todo(props: ITodo) {
  const { id, desc, done } = props;
  return (
    <li class="p-1.5">
      <form action="/" method="post" name={`todo-${id}`}>
        <input type="hidden" name="_type" value="todo" />
        <input type="hidden" name="id" value={id} />
        <input type="checkbox" name="done" checked={done} />
        <input
          class="ml-1 w-96 bg-bg border border-gray-500 pt-1 pb-2 px-2"
          name="desc"
          value={desc}
        />
        <button
          class="ml-2 bg-fg text-bg px-1.5 pb-1 cursor-pointer hover:underline"
          type="submit"
        >
          Save
        </button>
      </form>
    </li>
  );
}

export function HomePage() {
  const todos: ITodo[] = storage().todos;
  const userName = storage().users[0].name;
  const isMorning = new Date().toLocaleTimeString().split(" ")[1] === "AM";
  return (
    <BaseLayout title="Home Page">
      <main class="p-5">
        <h1 class="font-bold text-2xl text-primary">Home Page</h1>
        <Show if={isMorning} else={<p>Hello, {userName}!</p>}>
          <p>Good morning, {userName}!</p>
        </Show>
        <p>Welcome back!</p>
        <h2 class="mt-5 text-lg underline">Your ToDo list:</h2>
        <ul class="ml-3">
          <For each={todos}>{(todo: ITodo) => <Todo {...todo} />}</For>
        </ul>
      </main>
    </BaseLayout>
  );
}
