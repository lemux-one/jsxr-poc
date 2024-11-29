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
      <input type="checkbox" name={`${id}-done`} checked={done} />
      <input
        class="ml-1 w-96 bg-bg border border-gray-500 pt-1 pb-2 px-2"
        name={`${id}-desc`}
        value={desc}
      />
      <button
        class="ml-2 bg-fg text-bg px-1.5 pb-1 cursor-pointer hover:underline"
        type="submit"
        formaction={`/?todo=${id}`}
      >
        Save
      </button>
    </li>
  );
}

export function HomePage() {
  const todos: ITodo[] = storage().todos;
  const userName = storage().users[0].name;
  const isMorning = new Date().getHours() < 12;

  return (
    <BaseLayout title="Home Page">
      <main class="p-5">
        <h1 class="font-bold text-2xl text-primary">Home Page</h1>
        <Show if={isMorning} else={<p>Hello, {userName}!</p>}>
          <p>Good morning, {userName}!</p>
        </Show>
        <p>Welcome back!</p>
        <h2 class="mt-5 text-lg underline">Your ToDo list:</h2>
        <form action="/" method="post" name={`todos`}>
          <input type="hidden" name="_type" value="todos" />
          <ul class="ml-3">
            <For each={todos}>{(todo: ITodo) => <Todo {...todo} />}</For>
          </ul>
          <button
            class="ml-2 bg-fg text-bg px-1.5 pb-1 cursor-pointer hover:underline"
            type="submit"
          >
            Save All
          </button>
        </form>
      </main>
    </BaseLayout>
  );
}
