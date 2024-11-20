import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/theme.css"; // Archivo global con colores y fuentes
import "./Menu.css"; // Estilos específicos para el menú

const Menu = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand brand" to="/restaurants">
          Sabores
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto menu-list">
            <li className="nav-item">
              <Link className="nav-link" to="/restaurants">
                Restaurantes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/reviews">
                Reseñas
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile">
                Mi Perfil
              </Link>
            </li>
          </ul>
          {/* Toggle Switch para el tema */}
          <div className="theme-toggle-switch">
            <input
              type="checkbox"
              id="theme-switch"
              checked={darkMode}
              onChange={toggleTheme}
            />
            <label htmlFor="theme-switch"></label>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
