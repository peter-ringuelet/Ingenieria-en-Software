import React from "react";

const ProfileForm = ({
  formData,
  handleChange,
  handleFileChange,
  handleSubmit,
  handleCancelEdit,
  error,
}) => (
  <form onSubmit={handleSubmit} className="profile-form">
    <div className="profile-card">
      <h2>Información Personal</h2>
      <div className="form-group">
        <label>Nombre</label>
        <input
          type="text"
          name="first_name"
          value={formData.first_name || ""}
          onChange={handleChange}
          className="profile-input"
          required
        />
      </div>
      <div className="form-group">
        <label>Apellido</label>
        <input
          type="text"
          name="last_name"
          value={formData.last_name || ""}
          onChange={handleChange}
          className="profile-input"
          required
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email || ""}
          onChange={handleChange}
          className="profile-input"
          required
        />
      </div>
      <div className="form-group">
        <label>Teléfono</label>
        <input
          type="text"
          name="phone"
          value={formData.phone || ""}
          onChange={handleChange}
          className="profile-input"
        />
      </div>
      <div className="form-group">
        <label>Avatar</label>
        <input
          type="file"
          name="avatar"
          accept="image/*"
          onChange={handleFileChange}
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
);

export default ProfileForm;
