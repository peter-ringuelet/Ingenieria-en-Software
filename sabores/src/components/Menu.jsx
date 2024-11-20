import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/theme.css"; // Archivo global con colores y fuentes

const Menu = () => {
  return (
    <nav className="navbar navbar-expand-lg" style={styles.navbar}>
      <div className="container">
        <Link className="navbar-brand" to="/restaurants" style={styles.brand}>
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
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/restaurants" style={styles.navLink}>
                Restaurantes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/reviews" style={styles.navLink}>
                Reseñas
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile" style={styles.navLink}>
                Mi Perfil
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: "#333333", // Fondo oscuro con mejor contraste
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Sombra para darle profundidad
    padding: "10px 20px",
  },
  brand: {
    fontSize: "2rem", // Tamaño más grande
    fontWeight: "bold", // Más grueso
    color: "#e67e22", // Naranja de acento
    textTransform: "uppercase", // Para resaltar
  },
  navLink: {
    color: "#ffffff", // Blanco para mejor contraste
    fontSize: "1.1rem",
    fontWeight: "bold",
    marginLeft: "20px", // Espaciado entre elementos
    textDecoration: "none",
    transition: "color 0.3s ease",
  },
  navLinkHover: {
    color: "#f39c12", // Un tono de naranja más brillante
  },
};

export default Menu;


