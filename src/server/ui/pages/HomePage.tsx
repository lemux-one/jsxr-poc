import { BaseLayout } from "../layouts/BaseLayout";
import { Show } from "../helpers";
import { storage } from "../../utils";

export function HomePage() {
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
        <a href="/todos" class="underline text-primary">
          ToDo list
        </a>
      </main>
    </BaseLayout>
  );
}
