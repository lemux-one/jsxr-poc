import { storage } from "../../utils";
import { For } from "../helpers";
import { BaseLayout } from "../layouts/BaseLayout";

function Todo({ todo }: { todo: ITodo }) {
  return (
    <li class="p-1.5">
      <input type="checkbox" name={`${todo.id}-done`} checked={todo.done} />
      <input
        class="ml-1 w-96 bg-bg border border-gray-500 pt-1 pb-2 px-2"
        name={`${todo.id}-desc`}
        value={todo.desc}
      />
      <button
        class="ml-2 bg-fg text-bg px-1.5 pb-1 cursor-pointer hover:underline"
        type="submit"
        formaction={`/?todo=${todo.id}`}
      >
        Save
      </button>
    </li>
  );
}

export function TodosPage() {
  const todos: ITodo[] = storage().todos;
  const userName = storage().users[0].name;

  return (
    <BaseLayout title="Home Page">
      <main class="p-5">
        <h2 class="text-lg">{userName}'s ToDo list:</h2>
        <form action="/" method="post" name={`todos`}>
          <input type="hidden" name="_type" value="todos" />
          <ul class="ml-3">
            <For each={todos}>{(todo: ITodo) => <Todo todo={todo} />}</For>
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
