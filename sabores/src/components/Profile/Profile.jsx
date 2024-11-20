import React from "react";
import "../../styles/theme.css";
import "./Profile.css";
import profileData from "../../data/profile"; // Importa los datos del usuario

const Profile = () => {
  const { avatar, name, email, phone, preferences } = profileData;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={avatar} alt="Avatar" className="profile-avatar" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-description">
          Bienvenido a tu perfil. Aquí puedes actualizar tu información personal y preferencias.
        </p>
      </div>
      <div className="profile-content">
        <div className="profile-card">
          <h2>Información Personal</h2>
          <p>Email: {email}</p>
          <p>Teléfono: {phone}</p>
        </div>
        <div className="profile-card">
          <h2>Preferencias</h2>
          <p>Idioma: {preferences.language}</p>
          <p>Zona Horaria: {preferences.timezone}</p>
        </div>
        <div className="profile-card">
          <h2>Configuración</h2>
          <button className="profile-button">Editar Perfil</button>
          <button className="profile-button profile-button-secondary">Cerrar Sesión</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
