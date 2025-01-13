import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { signup } from "../../redux/thunks/authThunks";

const types = [
  {
    id: 1,
    name: "Client",
    value: "CLIENT",
  },
  {
    id: 2,
    name: "Admin",
    value: "ADMIN",
  },
];

export const RegisterPage = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleOnSubmit = (data) => {
    console.log("DATA", data);
    dispatch(signup(data));
  };

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <h2>Register</h2>
      <div>
        <label htmlFor="inputFirstname">Nombre</label>
        <input
          type="text"
          id="inputFirstname"
          {...register("firstname", {
            required: { value: true, message: "Se requiere el nombre." },
          })}
        />
        {errors.firstname && <span>{errors.firstname.message}</span>}
      </div>
      <div>
        <label htmlFor="inputLastname">Apellidos</label>
        <input
          type="text"
          id="inputLastname"
          {...register("lastname", {
            required: { value: true, message: "Se requiere los apellidos." },
          })}
        />
        {errors.lastname && <span>{errors.lastname.message}</span>}
      </div>
      <div>
        <label htmlFor="inputAge">Edad</label>
        <input
          type="number"
          id="inputAge"
          {...register("age", {
            required: { value: true, message: "Se requiere la edad." },
            valueAsNumber: true,
          })}
        />
        {errors.age && <span>{errors.age.message}</span>}
      </div>
      <div>
        <label htmlFor="inputEmail">Correo electrónico</label>
        <input
          type="email"
          id="inputEmail"
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
            required: true,
            message: "Se requiere las contraseña.",
          })}
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>
      <div>
        <label htmlFor="inputType">Tipo</label>
        <select id="inputType">
          {types.map((item) => {
            return (
              <option
                key={item.id}
                value={item.value}
                {...register("type", {
                  required: {
                    value: true,
                    message: "Se requiere el tipo de usuario.",
                  },
                })}
              >
                {item.value}
              </option>
            );
          })}
        </select>
        {errors.type && <span>{errors.type.message}</span>}
      </div>
      <button type="submit">Registrarse</button>
    </form>
  );
};
