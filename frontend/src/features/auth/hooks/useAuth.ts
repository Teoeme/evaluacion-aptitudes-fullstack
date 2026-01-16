import { useDispatch } from "react-redux";
import authActions from "../../../app/providers/auth/authActions";
import { logout } from "../../../app/providers/auth/auth.Slice";
import type { AppDispatch } from "../../../app/store/store";
import type { LoginCredentials } from "../use-cases/login";
import { logoutUseCase } from "../use-cases/logout";

export const useAuth = () => {
  const dispatcher = useDispatch<AppDispatch>();

  const handleLogin = async (values: LoginCredentials) => {
    const { user } = await dispatcher(
      authActions.login({
        email: values.email,
        password: values.password,
      })
    ).unwrap();
    return {
      user,
    };
  };

  const logoutUser = (): boolean => {
    try {
      const logoutSuccess = logoutUseCase();
      dispatcher(logout());
      return logoutSuccess;
    } catch {
      dispatcher(logout());
      return false;
    }
  };


  return { handleLogin, logoutUser };

};
