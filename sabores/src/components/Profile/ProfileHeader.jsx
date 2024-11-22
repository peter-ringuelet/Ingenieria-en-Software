import React from "react";

const ProfileHeader = ({ isEditing, avatarUrl, first_name, last_name }) => (
  <div className="profile-header">
    {isEditing ? (
      <>
        <h1 className="profile-name">Editar Perfil</h1>
        <p className="profile-description">
          Modifica tu información y haz clic en "Guardar Cambios".
        </p>
      </>
    ) : (
      <>
        <img src={avatarUrl} alt="Avatar" className="profile-avatar" />
        <h1 className="profile-name">{`${first_name} ${last_name}`}</h1>
        <p className="profile-description">
          Bienvenido a tu perfil. Aquí puedes actualizar tu información personal.
        </p>
      </>
    )}
  </div>
);

export default ProfileHeader;
