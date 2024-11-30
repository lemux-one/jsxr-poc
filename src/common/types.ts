interface IUser {
  id: number;
  user: string;
  password: string;
  name: string;
}

interface ITodo {
  id: number;
  desc: string;
  done?: boolean;
}
