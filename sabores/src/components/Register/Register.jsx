// src/components/Register/Register.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/api";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    // Verificar si las contraseñas coinciden
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      // Llama a la función de registro
      await register(formData.username, formData.email, formData.password);

      // Si el registro es exitoso, redirige al login
      navigate("/login");
    } catch (err) {
      // Manejar errores específicos del backend
      if (err.response && err.response.status === 400) {
        // Busca los mensajes de error específicos para username o email
        const errorData = err.response.data;
        if (errorData.username) {
          setError(errorData.username[0]); // Mensaje de error del servidor para username
        } else if (errorData.email) {
          setError(errorData.email[0]); // Mensaje de error del servidor para email
        } else {
          setError("Datos inválidos. Revisa la información ingresada.");
        }
      } else {
        // Error genérico o problemas de red
        setError(err.message || "Hubo un error al registrarte. Inténtalo nuevamente.");
      }
    }
  };



  return (
    <div className="register-container">
      <h2>Crear Cuenta</h2>
      <form onSubmit={handleSubmit} className="register-form">
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
            className="register-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Ingrese su correo"
            className="register-input"
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
            className="register-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar Contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Confirme su contraseña"
            className="register-input"
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-primary">
          Registrarse
        </button>
      </form>
      <p className="mt-3">
        ¿Ya tienes una cuenta?{" "}
        <button className="btn-link" onClick={() => navigate("/login")}>
          Inicia sesión aquí
        </button>
      </p>
    </div>
  );
};

export default Register;