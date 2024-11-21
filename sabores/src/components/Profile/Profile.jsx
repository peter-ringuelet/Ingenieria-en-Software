// src/components/Profile/Profile.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout, getProfile, updateProfile } from "../../services/api";
import "./Profile.css"; // Importamos los estilos

const Profile = () => {
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState(null);
  const [formData, setFormData] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar el modo edición
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfileData(data);
        setFormData(data); // Inicializamos formData con los datos del perfil
        setLoading(false);
      } catch (err) {
        console.error("Error al obtener el perfil:", err);
        setError("No se pudo cargar el perfil.");
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setFormData(profileData); // Restablecemos los cambios
    setIsEditing(false);
    setError(null); // Limpiamos cualquier error previo
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = await updateProfile(formData);
      setProfileData(updatedData); // Actualizamos los datos del perfil
      setIsEditing(false);
      setError(null); // Limpiamos cualquier error previo
    } catch (err) {
      console.error("Error al actualizar el perfil:", err);
      setError("No se pudo actualizar el perfil.");
    }
  };

  if (loading) {
    return <div className="profile-container">Cargando...</div>;
  }

  if (error && !isEditing) {
    return (
      <div className="profile-container">
        <p className="text-danger">{error}</p>
      </div>
    );
  }

  if (!profileData) {
    return null; // O muestra un mensaje de que no hay datos
  }

  const { avatar, name, email, phone } = formData;

  // Definir la URL del avatar, usando la imagen predeterminada si no hay avatar
  const avatarUrl = avatar || "/images/default-avatar.png";

  return (
    <div className="profile-container">
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
            <h1 className="profile-name">{name}</h1>
            <p className="profile-description">
              Bienvenido a tu perfil. Aquí puedes actualizar tu información personal.
            </p>
          </>
        )}
      </div>
      <div className="profile-content">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="profile-card">
              <h2>Información Personal</h2>
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  name="name"
                  value={name || ""}
                  onChange={handleChange}
                  className="profile-input"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={email || ""}
                  onChange={handleChange}
                  className="profile-input"
                />
              </div>
              <div className="form-group">
                <label>Teléfono</label>
                <input
                  type="text"
                  name="phone"
                  value={phone || ""}
                  onChange={handleChange}
                  className="profile-input"
                />
              </div>
              <div className="form-group">
                <label>Avatar (URL)</label>
                <input
                  type="text"
                  name="avatar"
                  value={avatar || ""}
                  onChange={handleChange}
                  className="profile-input"
                />
              </div>
            </div>
            {error && <p className="text-danger">{error}</p>}
            <div className="button-group">
              <button type="submit" className="profile-button">
                Guardar Cambios
              </button>
              <button
                type="button"
                className="profile-button profile-button-secondary"
                onClick={handleCancelEdit}
              >
                Cancelar
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="profile-card">
              <h2>Información Personal</h2>
              <p>Nombre: {name}</p>
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
        )}
      </div>
    </div>
  );
};

export default Profile;
