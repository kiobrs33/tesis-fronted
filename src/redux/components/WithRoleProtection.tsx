import { useSelector } from "react-redux";
import { RootState } from "../store";

interface IProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

export const WithRoleProtection = ({ children, allowedRoles }: IProps) => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  if (!isAuthenticated || !allowedRoles.includes(user.type)) {
    return null; // No renderiza nada si el usuario no tiene permisos
  }

  return <>{children}</>;
};
