import { Link, NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">SavageTech</div>

      <nav className="nav">
        <input type="checkbox" className="nav__check" id="checkbtn" />
        <ul className="nav__menu">
          <li className="nav__item">
            <NavLink
              to="/"
              className={({ isActive }) => {
                return `nav__link ${isActive ? "nav__link--active" : ""}`;
              }}
            >
              Home
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink
              to="login"
              className={({ isActive }) => {
                return `nav__link ${isActive ? "nav__link--active" : ""}`;
              }}
            >
              Login
            </NavLink>
          </li>
          <li className="nav__item">
            <Link to="register" className="nav__link k">
              Register
            </Link>
          </li>
          <li className="nav__item">
            <Link to="admin/clients" className="nav__link">
              Clientes
            </Link>
          </li>
          <li className="nav__item">
            <Link to="admin/contents" className="nav__link nav__link--active">
              Contenidos
            </Link>
          </li>
          <li className="nav__item">
            <Link to="admin/balances" className="nav__link">
              Saldos
            </Link>
          </li>
          <li className="nav__item">
            <Link to="admin/downloads" className="nav__link">
              Descargas
            </Link>
          </li>
        </ul>

        <div className="header__btn-menu">
          <label htmlFor="checkbtn" className="header__icon-menu">
            <i className="fas fa-bars"></i>
          </label>
        </div>
      </nav>
    </header>
  );
};
