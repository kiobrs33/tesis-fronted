import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { loginThunk } from "../redux/authThunks";
import { logout } from "../redux/authSlice";

interface ILoginForm {
  email: string;
  password: string;
}

interface IUseLogin {
  // Variables de React-Hook-Form
  handleOnSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  register: ReturnType<typeof useForm<ILoginForm>>["register"];
  errors: FieldErrors<ILoginForm>;

  // Variables del Custom Hook
  isLoading: boolean;
  isAuthenticated: boolean;
  responseMessage?: string;
  handleLogout: () => void;
}

export const useLogin = (): IUseLogin => {
  const dispatch = useAppDispatch();
  const { isLoading, isAuthenticated, responseMessage } = useAppSelector(
    (state) => state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();

  // Iniciar sesión
  const onSubmit: SubmitHandler<ILoginForm> = (data) => {
    dispatch(loginThunk(data));
  };

  // Cerrar sesión
  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    handleOnSubmit: handleSubmit(onSubmit),
    register,
    errors,
    isLoading,
    isAuthenticated,
    responseMessage,
    handleLogout,
  };
};
