import { Route, Routes } from "react-router";
import { useAppSelector } from "../redux/hooks/hooks";
import { MainLayout } from "../layouts/MainLayout";
import { ProtectedRoute } from "../redux/components/ProtectedRoute";
import {
  BalancesPage,
  ClientsPage,
  ContentsPage,
  DownloadsPage,
  ErrorPage,
  LandingPage,
  ProfilePage,
} from "../pages";
import { OrdersPage } from "../pages/orders/OrdersPage";
import { HomePage } from "../pages/home/HomePage";
import { LoginPage, RegisterPage } from "../modules/auth";

export const AppRouter = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Rutas publicas */}
        <Route
          path="/"
          element={
            <ProtectedRoute
              redirectTo="/admin/clients"
              isAllowed={!isAuthenticated}
            />
          }
        >
          <Route index element={<LandingPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        {/* Rutas privadas */}
        <Route
          path="admin"
          element={
            <ProtectedRoute redirectTo="/login" isAllowed={isAuthenticated} />
          }
        >
          <Route index element={<HomePage />} />
          <Route path="clients" element={<ClientsPage />} />
          <Route path="contents" element={<ContentsPage />} />
          <Route path="balances" element={<BalancesPage />} />
          <Route path="downloads" element={<DownloadsPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Route>

      {/* Control para rutas inexistentes 404  not found */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};
