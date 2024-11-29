import { BaseLayout } from "../layouts/BaseLayout";
import { For, Show } from "../helpers";

interface ITodo {
  desc: string;
  done?: boolean;
}

function Todo(props: ITodo) {
  const { desc, done } = props;
  return (
    <li>
      <input type="checkbox" checked={done} />
      <span class="ml-1">{desc}</span>
    </li>
  );
}

export function HomePage() {
  const todos = [
    { desc: "Try Tailwind 4 by building something", done: true },
    { desc: "Post an article about it on my blog", done: false },
  ];
  const userName = "Sir";
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
