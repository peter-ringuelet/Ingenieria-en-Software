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
    avatar: "",
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
          avatar: data.avatar || "",
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
      avatar: profileData.avatar || "",
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
    setFormData((prevFormData) => ({ ...prevFormData, avatar: file }));
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // Envía los datos del formulario al backend
    const updatedData = await updateProfile({
      user: {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
      },
      phone: formData.phone,
      avatar: formData.avatar, // Esto puede ser un archivo
    });

    // Actualiza los datos del perfil y del formulario
    setProfileData(updatedData);
    setFormData({
      first_name: updatedData.user.first_name || "",
      last_name: updatedData.user.last_name || "",
      email: updatedData.user.email || "",
      phone: updatedData.phone || "",
      avatar: updatedData.avatar || "", // Asegúrate de que esta URL sea válida
    });

    setIsEditing(false);
    setError(null);
  } catch (err) {
    console.error("Error al actualizar el perfil:", err);
    setError("No se pudo actualizar el perfil.");
  }
};


  if (loading) return <div className="profile-container">Cargando...</div>;
  if (error && !isEditing)
    return <div className="profile-container"><p className="text-danger">{error}</p></div>;

  const { avatar, first_name, last_name, email, phone } = formData;
  const avatarUrl = avatar || "/images/default-avatar.png";

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
