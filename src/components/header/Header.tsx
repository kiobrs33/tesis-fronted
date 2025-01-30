import { NavLink, useNavigate } from "react-router";
import { useLogin } from "../../modules/auth";
import { WithRoleProtection } from "../../redux/components/WithRoleProtection";

export const Header = () => {
  const navigate = useNavigate();
  const { handleLogout, isAuthenticated } = useLogin();

  return (
    <nav
      className="navbar navbar-expand-lg bg-dark border-bottom"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand">
          Victor Store
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <WithRoleProtection allowedRoles={["ADMIN"]}>
              {/* <li className="nav-item">
                <NavLink
                  to="/admin"
                  end
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Inicio
                </NavLink>
              </li> */}
              {/* <li className="nav-item">
                <NavLink
                  to="/admin/orders"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Pedidos
                </NavLink>
              </li> */}
              <li className="nav-item">
                <NavLink
                  to="/admin/contents"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Contenidos
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/admin/clients"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Clientes
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/admin/balances"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Saldos
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Mi perfil
                </a>
                <ul className="dropdown-menu dropdown-menu-lg-end">
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() => navigate("/admin/profile")}
                    >
                      Mi cuenta
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" onClick={handleLogout}>
                      Cerrar sesión
                    </a>
                  </li>
                </ul>
              </li>
            </WithRoleProtection>
            <WithRoleProtection allowedRoles={["CLIENT"]}>
              <li className="nav-item">
                <NavLink
                  to="/client"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Tienda
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Mi perfil
                </a>
                <ul className="dropdown-menu dropdown-menu-lg-end">
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() => navigate("/client/profile")}
                    >
                      Mi cuenta
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" onClick={handleLogout}>
                      Cerrar sesión
                    </a>
                  </li>
                </ul>
              </li>
            </WithRoleProtection>
            {!isAuthenticated && (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    Inicio
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    Iniciar sesión
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    Registrarse
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
