import { BaseLayout } from "../layouts/BaseLayout";
import { For, Show } from "../helpers";

export function HomePage() {
  const todos = ["Try Tailwind 4", "Post an article to my blog"];
  const userName = "Sir";
  const isMorning = new Date().toLocaleTimeString().split(" ")[1] === "AM";
  return (
    <BaseLayout title="Home Page">
      <main class="p-[1rem]">
        <h1 class="font-bold text-[2rem] text-primary">Home Page</h1>
        <Show if={isMorning} else={<p>Hello, {userName}!</p>}>
          <p>Good morning, {userName}!</p>
        </Show>
        <p>Welcome back!</p>
        <h2 class="mt-[1.5rem] text-[1.2rem] underline">Your ToDo list:</h2>
        <ul class="ml-[1rem]">
          <For each={todos}>
            {(todo: string) => (
              <li class="before:content-['-'] before:text-foreground before:mr-[.3rem]">
                <span>{todo}</span>
              </li>
            )}
          </For>
        </ul>
      </main>
    </BaseLayout>
  );
}
