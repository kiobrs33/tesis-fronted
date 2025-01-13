import { BrowserRouter, Route, Routes } from "react-router";
import { useAppSelector } from "../redux/hooks/hooks";
import { MainLayout } from "../layouts/MainLayout";
import { ProtectedRoute } from "../components/routes/ProtectedRoute";
import {
  BalancesPage,
  ClientsPage,
  ContentsPage,
  DownloadsPage,
  HomePage,
  LoginPage,
  ProfilePage,
  RegisterPage,
} from "../pages";
import { OrdersPage } from "../pages/orders/OrdersPage";

export const AppRouter = () => {
  const { token, user } = useAppSelector((state) => state.auth);
  const { firstname, lastname } = user;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route
            path="admin"
            element={<ProtectedRoute user={{ token, firstname, lastname }} />}
          >
            <Route path="clients" element={<ClientsPage />} />
            <Route path="contents" element={<ContentsPage />} />
            <Route path="balances" element={<BalancesPage />} />
            <Route path="downloads" element={<DownloadsPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
