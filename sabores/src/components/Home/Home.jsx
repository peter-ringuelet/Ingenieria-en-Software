import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

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
          <button className="btn-primary" onClick={() => navigate("/restaurants")}>
            Iniciar Sesión
          </button>
          <button className="btn-secondary" onClick={() => alert("Registrarse no implementado aún")}>
            Registrarse
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
