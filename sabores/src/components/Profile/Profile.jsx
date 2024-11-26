// src/components/Profile.js

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout, getProfile, updateProfile } from "../../services/api";
import ProfileHeader from "./ProfileHeader";
import ProfileForm from "./ProfileForm";
import ProfileView from "./ProfileView";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    avatar: null, // Cambiado de "" a null para representar ausencia de archivo
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfileData(data);
        setFormData({
          first_name: data.user.first_name || "",
          last_name: data.user.last_name || "",
          email: data.user.email || "",
          phone: data.phone || "",
          avatar: null, // Inicialmente no hay un nuevo avatar seleccionado
        });
        setLoading(false);
      } catch (err) {
        console.error("Error al obtener el perfil:", err);
        setError("No se pudo cargar el perfil.");
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleEditClick = () => setIsEditing(true);

  const handleCancelEdit = () => {
    setFormData({
      first_name: profileData.user.first_name || "",
      last_name: profileData.user.last_name || "",
      email: profileData.user.email || "",
      phone: profileData.phone || "",
      avatar: null, // Resetear el avatar al cancelar
    });
    setIsEditing(false);
    setError(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevFormData) => ({ ...prevFormData, avatar: file || null }));
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append('user.first_name', formData.first_name);
      form.append('user.last_name', formData.last_name);
      form.append('user.email', formData.email);
      form.append('phone', formData.phone);
      
      if (formData.avatar) { // Solo agrega avatar si es un archivo
        form.append('avatar', formData.avatar);
      }

      const updatedData = await updateProfile(form);

      setProfileData(updatedData);
      setFormData({
        first_name: updatedData.user.first_name || "",
        last_name: updatedData.user.last_name || "",
        email: updatedData.user.email || "",
        phone: updatedData.phone || "",
        avatar: null, // Resetear avatar después de la actualización
      });

      setIsEditing(false);
      setError(null);
    } catch (err) {
      console.error("Error al actualizar el perfil:", err);
      if (err.response && err.response.data) {
        // Mostrar mensajes de error específicos del backend
        setError(Object.values(err.response.data).flat().join(" "));
      } else {
        setError("No se pudo actualizar el perfil.");
      }
    }
  };

  if (loading) return <div className="profile-container">Cargando...</div>;
  if (error && !isEditing)
    return <div className="profile-container"><p className="text-danger">{error}</p></div>;

  const { first_name, last_name, email, phone } = formData;
  // Utilizar 'avatar_url' en lugar de 'avatar'
  const avatarUrl = profileData && profileData.avatar_url 
    ? profileData.avatar_url 
    : "/images/default-avatar.png";

  return (
    <div className="profile-container">
      <ProfileHeader
        isEditing={isEditing}
        avatarUrl={avatarUrl}
        first_name={first_name}
        last_name={last_name}
      />
      <div className="profile-content">
        {isEditing ? (
          <ProfileForm
            formData={formData}
            handleChange={handleChange}
            handleFileChange={handleFileChange}
            handleSubmit={handleSubmit}
            handleCancelEdit={handleCancelEdit}
            error={error}
          />
        ) : (
          <ProfileView
            first_name={first_name}
            last_name={last_name}
            email={email}
            phone={phone}
            handleEditClick={handleEditClick}
            handleLogout={handleLogout}
          />
        )}
      </div>
    </div>
  );
};

export default Profile;
