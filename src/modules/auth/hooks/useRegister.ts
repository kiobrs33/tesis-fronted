import {
  FieldErrors,
  SubmitHandler,
  useForm,
  UseFormWatch,
} from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { IUser, registerThunk } from "../redux/authThunks";

export interface IRegisterForm extends IUser {
  confirmPassword: string;
}

interface IUseRegister {
  // Variables de React-Hook-Form
  handleOnSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  register: ReturnType<typeof useForm<IRegisterForm>>["register"];
  errors: FieldErrors<IRegisterForm>;
  watch: UseFormWatch<IRegisterForm>;

  // Variables del Custom Hook
  isLoading: boolean;
  isAuthenticated: boolean;
  responseMessage?: string;
  passwordValue: string;
}

export const useRegister = (): IUseRegister => {
  const dispatch = useAppDispatch();
  const { isLoading, isAuthenticated, responseMessage } = useAppSelector(
    (state) => state.auth
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IRegisterForm>({
    defaultValues: {
      firstname: "",
      lastname: "",
      age: 0,
      email: "",
      password: "",
      type: "CLIENT",
    },
  });

  // Observar el valor de la contraseña para validar la confirmación
  const passwordValue = watch("password");

  // Register nuevo usuario
  const onSubmit: SubmitHandler<IRegisterForm> = (userData) => {
    console.log(userData);
    dispatch(registerThunk(userData));
  };

  return {
    handleOnSubmit: handleSubmit(onSubmit),
    register,
    errors,
    watch,
    isLoading,
    isAuthenticated,
    responseMessage,
    passwordValue,
  };
};
