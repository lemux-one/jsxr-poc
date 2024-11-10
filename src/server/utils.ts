import { join } from "node:path";

type Env = {
  host: string;
  port: number;
  staticDir: string;
  staticPrefix: string;
  isDev: boolean;
};

let currentEnv: Env;

function env(): Env {
  const isDev = process.env.NODE_ENV !== "production";
  if (!currentEnv) {
    currentEnv = {
      host: process.env.NODE_HOST ?? "localhost",
      port: !isNaN(Number(process.env.NODE_PORT))
        ? Number(process.env.NODE_PORT)
        : 3000,
      staticDir:
        process.env.NODE_STATIC_DIR ??
        join(process.cwd(), isDev ? "src" : "", "static"),
      staticPrefix: process.env.NODE_STATIC_URL_PREFIX ?? "/static/",
      isDev,
    };
  }
  return currentEnv;
}

export { env, join };
