import { Route, Routes } from "react-router";
import { useAppSelector } from "../redux/hooks/hooks";
import { MainLayout } from "../layouts/MainLayout";
import { ProtectedRoute } from "../redux/components/ProtectedRoute";
import {
  BalancesPage,
  ContentsPage,
  DownloadsPage,
  ErrorPage,
  LandingPage,
  ProfilePage,
} from "../pages";
import { OrdersPage } from "../pages/orders/OrdersPage";
import { HomePage } from "../pages/home/HomePage";
import { LoginPage, RegisterPage } from "../modules/auth";
import { AdminClients } from "../modules/clients/pages/admin/AdminClients";
import { DashboardUser } from "../modules/user/pages/DashboardUser";
import { CarBuy } from "../modules/user/pages/CarBuy";
import { Myacount } from "../modules/user/pages/Myacount";

export const AppRouter = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

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

        {/* Rutas Privadas */}
        <Route
          element={
            <ProtectedRoute redirectTo="/login" isAllowed={isAuthenticated} />
          }
        >
          {/* Admin */}
          <Route
            path="admin"
            element={
              <ProtectedRoute
                redirectTo="/client"
                isAllowed={user.type === "ADMIN"}
              />
            }
          >
            <Route index element={<HomePage />} />
            <Route path="clients" element={<AdminClients />} />
            <Route path="contents" element={<ContentsPage />} />
            <Route path="balances" element={<BalancesPage />} />
            <Route path="downloads" element={<DownloadsPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          {/* Client */}
          <Route
            path="client"
            element={
              <ProtectedRoute
                redirectTo="/admin/clients"
                isAllowed={user.type === "CLIENT"}
              />
            }
          >
            <Route index element={<DashboardUser />} />
            <Route path="card-buy" element={<CarBuy />} />
            <Route path="profile" element={<Myacount />} />
          </Route>
        </Route>
      </Route>

      {/* Control para rutas inexistentes 404  not found */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};
