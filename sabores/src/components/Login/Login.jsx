// src/components/Login/Login.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/api";
import "./Login.css"; // Asegúrate de importar el CSS correctamente

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(""); // Limpiar error al cambiar la entrada
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.username, formData.password);
      // Al iniciar sesión correctamente, redirigimos a la página de restaurantes
      navigate("/restaurants");
    } catch (err) {
      // Manejar error
      setError("Usuario o contraseña incorrectos.");
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Usuario</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            placeholder="Ingrese su usuario"
            className="login-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Ingrese su contraseña"
            className="login-input"
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-primary">
          Iniciar Sesión
        </button>
      </form>
      <p className="mt-3">
        ¿No tienes una cuenta?{" "}
        <button className="btn-link" onClick={() => navigate("/register")}>
          Regístrate aquí
        </button>
      </p>
    </div>
  );
};

export default Login;
