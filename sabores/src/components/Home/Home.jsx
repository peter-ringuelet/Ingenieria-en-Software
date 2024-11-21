import React from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { isAuthenticated } from "../../services/auth";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  if (isAuthenticated()) {
    return <Navigate to="/restaurants" />;
  }
  return (
    <div className="home-wrapper">
      {/* Sección izquierda */}
      <div className="home-left">
        <h1 className="home-title">SABORES</h1>
        <p className="home-subtitle">
          Explora los mejores restaurantes y comparte tus experiencias.
        </p>
      </div>

      {/* Sección derecha */}
      <div className="home-right">
        <div className="home-buttons">
          <button className="btn-primary" onClick={() => navigate("/login")}>
            Iniciar Sesión
          </button>
          <button
            className="btn-secondary"
            onClick={() => navigate("/register")}
          >
            Registrarse
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
