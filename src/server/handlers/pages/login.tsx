import { IHandler } from "httpw/types";
import { LoginPage } from "../../ui/pages/LoginPage";
import { handlePost, isGetOrPost, isPost } from "httpw";
import { storage } from "../../utils";

function auth(user: string, password: string) {
  const storedUser = ([...storage().users] as IUser[]).find(
    (current) => current.user === user
  );
  return storedUser?.password === password;
}

const loginPath = "/login";
const loginHandler: IHandler = {
  accepts: (c) => isGetOrPost(c.req) && c.url.pathname === loginPath,
  handle(c) {
    const next = c.url.searchParams.get("next") ?? undefined;
    if (isPost(c.req)) {
      handlePost(c.req, (data) => {
        console.dir(data);
        const { usr, pwd } = data;
        const isAuthed = auth(usr, pwd);
        if (isAuthed) c.redir(next ?? "/");
        else c.html(<LoginPage next={next} user={usr} error />);
      });
    } else {
      c.html(<LoginPage next={next} />);
    }
  },
};

export { loginHandler };
