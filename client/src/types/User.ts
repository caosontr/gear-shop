export interface User {
  id: string;
  email: string;
  password: string;
}
export type RegisterForm = {
  username: string;
  email: string;
  password: string;
};

export type LoginForm = {
  email: string;
  password: string;
};
