import { Outlet } from "react-router";
import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";

export const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="p-5">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
