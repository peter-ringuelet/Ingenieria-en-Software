import React from "react";

const ProfileView = ({ first_name, last_name, email, phone, handleEditClick, handleLogout }) => (
  <>
    <div className="profile-card">
      <h2>Información Personal</h2>
      <p>Nombre: {`${first_name} ${last_name}`}</p>
      <p>Email: {email}</p>
      <p>Teléfono: {phone}</p>
    </div>
    <div className="profile-card">
      <h2>Configuración</h2>
      <div className="button-group">
        <button className="profile-button" onClick={handleEditClick}>
          Editar Perfil
        </button>
        <button
          className="profile-button profile-button-secondary"
          onClick={handleLogout}
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  </>
);

export default ProfileView;
