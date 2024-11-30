import { Show } from "../helpers";
import { BaseLayout } from "../layouts/BaseLayout";

const endPoint = "/login";

export function LoginPage(props: {
  next?: string;
  user?: string;
  error?: boolean;
}) {
  const { next, user = "", error = false } = props;
  const params = next ? `?next=${encodeURIComponent(next)}` : "";

  return (
    <BaseLayout title="Log In">
      <main class="mt-12 mx-auto p-6 w-96 bg-gray-100 dark:bg-gray-950">
        <form
          class="flex flex-col gap-6"
          action={`${endPoint}${params}`}
          method="post"
        >
          <input
            class="px-3 pb-1 w-full border-b border-b-gray-300 dark:border-b-gray-800 invalid:border-red-500"
            name="usr"
            placeholder="User"
            required
            value={`${user}`}
          />
          <input
            class="px-3 pb-1 w-full border-b border-b-gray-300 dark:border-b-gray-800 invalid:border-red-500"
            type="password"
            name="pwd"
            placeholder="Password"
            required
          />
          <Show if={error}>
            <span class="text-red-500">Wrong credentials</span>
          </Show>
          <button
            class="w-full pb-1 bg-blue-800 text-white font-bold hover:bg-blue-700 cursor-pointer"
            type="submit"
          >
            Log In
          </button>
        </form>
      </main>
    </BaseLayout>
  );
}
