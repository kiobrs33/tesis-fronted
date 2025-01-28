import { ReactNode } from "react";
import { Navigate, Outlet } from "react-router";

interface ProtectedRouteProps {
  children?: ReactNode;
  redirectTo: string;
  isAllowed: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectTo = "/",
  isAllowed = false,
}) => {
  // Verifica si tiene acceso o no a la ruta
  if (!isAllowed) {
    return <Navigate to={redirectTo} />;
  }

  return children ? children : <Outlet />;
};
