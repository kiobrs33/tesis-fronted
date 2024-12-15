import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { Clients } from "./pages/clients/Clients";
import { About } from "./pages/about/About";
import { Balances } from "./pages/balances/Balances";
import { Downloads } from "./pages/downloads/Downloads";
import { Contents } from "./pages/contents/Contents";

import { Header } from "./components/header/Header";
import { Footer } from "./components/footer/Footer";
import { useAppSelector } from "./redux/hooks/hooks";

import "./assets/css/normalize.css";
import "./assets/css/main.css";
import { ProtectedRoute } from "./components/router/ProtectedRoute";
import { Signin } from "./modules/auth/pages/signin/Signin";
import { Register } from "./modules/auth/pages/register/Register";

function App() {
  const { token, user } = useAppSelector((state) => state.auth);
  const { firstname, lastname } = user;

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route index element={<Home />} />
        <Route path="login" element={<Signin />} />
        <Route path="register" element={<Register />} />
        <Route path="about" element={<About />} />

        <Route
          path="admin"
          element={<ProtectedRoute user={{ token, firstname, lastname }} />}
        >
          <Route path="clients" element={<Clients />} />
          <Route path="contents" element={<Contents />} />
          <Route path="balances" element={<Balances />} />
          <Route path="downloads" element={<Downloads />} />
        </Route>
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
