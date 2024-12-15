import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { signin } from "../../redux/slices/auth/thunks";

export const Login = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleOnSubmit = (data) => {
    dispatch(signin(data));
  };

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <h2>Login</h2>
      <div>
        <label htmlFor="inputEmail">Correo electrónico</label>
        <input
          type="email"
          id="inputEmail"
          aria-describedby="emailHelp"
          {...register("email", {
            required: { value: true, message: "Se requiere el Email." },
          })}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      <div>
        <label htmlFor="inputPassword" className="form-label">
          Contraseña
        </label>
        <input
          type="password"
          id="inputPassword"
          {...register("password", { required: true })}
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>
      <button type="submit">Ingresar</button>
    </form>
  );
};
