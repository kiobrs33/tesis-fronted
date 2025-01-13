import { ReactNode } from "react";
import { Navigate, Outlet } from "react-router";

interface ProtectedRouteProps {
  user: {
    token?: string;
    firstname?: string;
    lastname?: string;
    permissions?: string[];
  } | null;
  children?: ReactNode;
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  user,
  children,
  redirectTo = "/",
}) => {
  // Login
  if (!user?.token) {
    return <Navigate to={redirectTo} />;
  }

  // Permissions
  // if (user.permissions.includes("analize")) {
  //   return <Navigate to={redirectTo} />;
  // }

  return children ? children : <Outlet />;
};
