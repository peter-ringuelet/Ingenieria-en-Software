import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/theme.css"; // Archivo global con colores y fuentes
import "./Menu.css"; // Estilos específicos para el menú
import { ReactComponent as LogoApp } from '../../FoodFans.svg';

const Menu = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container">
          <Link className="navbar-brand brand" to="/restaurants">
            <LogoApp/>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleMenu}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}
            id="navbarNav"
          >
            <ul className="navbar-nav ms-auto menu-list" onClick={() => setMenuOpen(false)}>
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
            <div className="theme-toggle-icon" onClick={toggleTheme}>
              <img
                src={
                  darkMode
                    ? "https://cdn-icons-png.flaticon.com/512/1046/1046747.png"
                    : "/icons/food.png"
                }
                alt="Theme Toggle"
              />
            </div>
          </div>
        </div>
      </nav>
      {menuOpen && <div className="backdrop" onClick={closeMenu}></div>}
      <div className="content-offset">
        {/* Contenido que está debajo del menú */}
      </div>
    </>
  );
};

export default Menu;
