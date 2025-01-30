import { Outlet } from "react-router";
import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { useAppSelector } from "../redux/hooks/hooks";

export const MainLayout = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      {!isAuthenticated && <Footer />}
    </>
  );
};
