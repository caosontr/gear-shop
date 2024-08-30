import sleep from "../../ultis/sleep";
import axiosInstance from "../../config/axiosInstance";
import { AuthResponse, LoginForm, SignInForm } from "../../types/Auth";

const signIn = async (formValue: SignInForm): Promise<AuthResponse> => {
  await sleep(2000);
  const res = await axiosInstance.post<AuthResponse>("/register", formValue);
  return res.data;
};

const login = async (formValue: LoginForm): Promise<AuthResponse> => {
  await sleep(2000);
  const res = await axiosInstance.post<AuthResponse>("/login", formValue);
  return res.data;
};
export { signIn, login };
