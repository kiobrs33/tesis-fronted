import { useNavigate } from "react-router";

export const ErrorPage = () => {
  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
      <h1 className="display-1 fw-bold text-danger">404</h1>
      <h2 className="mb-4">Página no encontrada</h2>
      <p className="text-muted text-center mb-4">
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
      </p>
      <button className="btn btn-primary px-4 py-2" onClick={handleGoHome}>
        Ir a Inicio
      </button>
    </div>
  );
};
