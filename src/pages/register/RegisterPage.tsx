import { useForm, SubmitHandler } from "react-hook-form";

interface RegisterFormInputs {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const onSubmit: SubmitHandler<RegisterFormInputs> = (data) => {
    console.log("Datos enviados:", data);
    alert("Registro exitoso");
  };

  // Observar el valor de la contraseña para validar la confirmación
  const passwordValue = watch("password");

  return (
    <div className="d-flex justify-content-center align-items-center ">
      <div
        className="card p-4 shadow"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <h2 className="text-center mb-4">Registro</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              Nombres
            </label>
            <input
              type="text"
              className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
              id="firstName"
              placeholder="Introduce tus nombres"
              {...register("firstName", {
                required: "El campo Nombres es obligatorio.",
              })}
            />
            {errors.firstName && (
              <div className="invalid-feedback">{errors.firstName.message}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Apellidos
            </label>
            <input
              type="text"
              className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
              id="lastName"
              placeholder="Introduce tus apellidos"
              {...register("lastName", {
                required: "El campo Apellidos es obligatorio.",
              })}
            />
            {errors.lastName && (
              <div className="invalid-feedback">{errors.lastName.message}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="age" className="form-label">
              Edad
            </label>
            <input
              type="number"
              className={`form-control ${errors.age ? "is-invalid" : ""}`}
              id="age"
              placeholder="Introduce tu edad"
              {...register("age", {
                required: "El campo Edad es obligatorio.",
                min: { value: 1, message: "La edad debe ser mayor a 0." },
                max: {
                  value: 120,
                  message: "La edad debe ser menor o igual a 120.",
                },
              })}
            />
            {errors.age && (
              <div className="invalid-feedback">{errors.age.message}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Correo electrónico
            </label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              id="email"
              placeholder="tuemail@ejemplo.com"
              {...register("email", {
                required: "El campo Correo es obligatorio.",
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Introduce un correo válido.",
                },
              })}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              id="password"
              placeholder="Introduce tu contraseña"
              {...register("password", {
                required: "El campo Contraseña es obligatorio.",
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener al menos 6 caracteres.",
                },
              })}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              className={`form-control ${
                errors.confirmPassword ? "is-invalid" : ""
              }`}
              id="confirmPassword"
              placeholder="Repite tu contraseña"
              {...register("confirmPassword", {
                required: "Debes confirmar tu contraseña.",
                validate: (value) =>
                  value === passwordValue || "Las contraseñas no coinciden.",
              })}
            />
            {errors.confirmPassword && (
              <div className="invalid-feedback">
                {errors.confirmPassword.message}
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Registrarse
          </button>
        </form>
        <div className="text-center mt-3">
          <a href="/login" className="text-decoration-none">
            ¿Ya tienes una cuenta? Inicia sesión
          </a>
        </div>
      </div>
    </div>
  );
};
