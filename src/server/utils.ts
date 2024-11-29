import { join } from "node:path";

type Env = {
  host: string;
  port: number;
  staticDirs: string[];
  staticPrefix: string;
  isDev: boolean;
};

let currentEnv: Env;
function env(): Env {
  if (!currentEnv) {
    const isDev = process.env.NODE_ENV !== "production";
    const staticSrc = isDev ? ["src", "_dev"] : [""];
    const staticDirs = process.env.NODE_STATIC_DIR
      ? [process.env.NODE_STATIC_DIR]
      : staticSrc.map((src) => join(process.cwd(), src, "static"));
    currentEnv = {
      host: process.env.NODE_HOST ?? "localhost",
      port: !isNaN(Number(process.env.NODE_PORT))
        ? Number(process.env.NODE_PORT)
        : 3000,
      staticPrefix: process.env.NODE_STATIC_URL_PREFIX ?? "/static/",
      staticDirs,
      isDev,
    };
  }
  return currentEnv;
}

let currentStorage: Record<string, any>;
function storage() {
  if (!currentStorage) {
    currentStorage = {};
  }
  return currentStorage;
}

export { env, join, storage };
