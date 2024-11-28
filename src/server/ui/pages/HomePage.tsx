import Show from "../helpers/Show";
import { BaseLayout } from "../layouts/BaseLayout";

export function HomePage() {
  return (
    <BaseLayout title="Home Page">
      <h1 class="font-bold text-[2rem]">Home Page</h1>
      <Show if={true} else={<p>Hello, Sir!</p>}>
        <p>Good morning, Sir!</p>
      </Show>
      <p>Welcome back!</p>
    </BaseLayout>
  );
}
