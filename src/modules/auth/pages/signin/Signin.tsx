import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks/hooks";
import { signin } from "../../slice/thunks";

export const Signin = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

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
      <pre>{JSON.stringify(auth.user)}</pre>
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
          {...register("password", {
            required: { value: true, message: "Se requires la Contraseña" },
          })}
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>
      <button type="submit">Ingresar</button>
    </form>
  );
};
