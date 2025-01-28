import { NavLink } from "react-router";
import { useRegister } from "../../hooks/useRegister";

export const RegisterPage = () => {
  const { register, handleOnSubmit, errors, passwordValue, isLoading } =
    useRegister();

  return (
    <div className="d-flex justify-content-center align-items-center my-5">
      {isLoading ? (
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div
          className="card p-4 shadow"
          style={{ maxWidth: "500px", width: "100%" }}
        >
          <h2 className="text-center mb-4">Registro</h2>
          <form onSubmit={handleOnSubmit}>
            <div className="mb-3">
              <label htmlFor="firstname" className="form-label">
                Nombres
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.firstname ? "is-invalid" : ""
                }`}
                id="firstname"
                placeholder="Introduce tus nombres"
                {...register("firstname", {
                  required: "El campo nombres es obligatorio.",
                })}
              />
              {errors.firstname && (
                <div className="invalid-feedback">
                  {errors.firstname.message}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="lastname" className="form-label">
                Apellidos
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.lastname ? "is-invalid" : ""
                }`}
                id="lastname"
                placeholder="Introduce tus apellidos"
                {...register("lastname", {
                  required: "El campo apellidos es obligatorio.",
                })}
              />
              {errors.lastname && (
                <div className="invalid-feedback">
                  {errors.lastname.message}
                </div>
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
                  required: "El campo edad es obligatorio.",
                  min: { value: 1, message: "La edad debe ser mayor a 0." },
                  max: {
                    value: 120,
                    message: "La edad debe ser menor o igual a 120.",
                  },
                  valueAsNumber: true,
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
                  required: "El campo correo es obligatorio.",
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
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                id="password"
                placeholder="Introduce tu contraseña"
                {...register("password", {
                  required: "El campo contraseña es obligatorio.",
                  minLength: {
                    value: 6,
                    message: "La contraseña debe tener al menos 6 caracteres.",
                  },
                })}
              />
              {errors.password && (
                <div className="invalid-feedback">
                  {errors.password.message}
                </div>
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
            <NavLink to="/login" className="text-decoration-none">
              ¿Ya tienes una cuenta? Inicia sesión
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};
