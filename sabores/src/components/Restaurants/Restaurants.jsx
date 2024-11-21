import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { restaurantsData } from "../../data/restaurants";
import { renderStars } from "../Shared/renderStars";
import { restaurantIcon, locationIcon } from "../../utils/mapIcons";
import "../../styles/theme.css";
import "./Restaurants.css";

const Restaurants = () => {
  const [location, setLocation] = useState({ lat: -34.854, lng: -58.043 });
  const [loading, setLoading] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [reviewModal, setReviewModal] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    lugar: "",
    comida: "",
    abundancia: 0,
    sabor: 0,
    calidadPrecio: 0,
    limpieza: 0,
    atencion: 0,
    ambiente: 0,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLoading(false);
        },
        (error) => {
          console.error("Error obteniendo la ubicación:", error);
          // Usar coordenadas de City Bell por defecto
          setLocation({ lat: -34.854, lng: -58.043 });
          setLoading(false);
        }
      );
    } else {
      console.error("Geolocalización no soportada.");
      // Usar coordenadas de City Bell por defecto
      setLocation({ lat: -34.854, lng: -58.043 });
      setLoading(false);
    }
  }, []);

  const handleMenu = (menu) => {
    if (menu) {
      setSelectedMenu(menu);
    }
  };

  const closeMenu = () => {
    setSelectedMenu(null);
  };

  const openReviewModal = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setReviewForm((prev) => ({
      ...prev,
      lugar: restaurant.name,
      comida: "",
    }));
    setReviewModal(true);
  };

  const closeReviewModal = () => {
    setReviewModal(false);
    setSelectedRestaurant(null);
  };

  const handleStarClick = (field, value) => {
    setReviewForm((prev) => ({ ...prev, [field]: value }));
  };

  const submitReview = () => {
    alert(`Reseña enviada:\n${JSON.stringify(reviewForm, null, 2)}`);
    closeReviewModal();
  };

  return (
    <div className="container mt-4 restaurants-container">
      <h1 className="mb-4 text-accent">Explora los Sabores de tu Ciudad</h1>
      {loading ? (
        <p className="text-secondary">Cargando ubicación...</p>
      ) : (
        <MapContainer
          center={[location.lat, location.lng]}
          zoom={15}
          className="map-container"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <Marker position={[location.lat, location.lng]} icon={locationIcon}>
            <Popup>Tu ubicación actual</Popup>
          </Marker>
          {restaurantsData.map((restaurant) => (
            <Marker
              key={restaurant.id}
              position={restaurant.coords}
              icon={restaurantIcon(restaurant.visited)}
            >
              <Popup>
                <div className="popup-content">
                  <h5 className="text-accent">{restaurant.name}</h5>
                  {restaurant.visited ? (
                    <div>
                      {renderStars(restaurant.rating)}{" "}
                      <span className="text-success">(Visitado)</span>
                    </div>
                  ) : (
                    <p className="text-danger">(No visitado)</p>
                  )}
                  <p>
                    <strong>Especialidad:</strong> {restaurant.specialty}
                  </p>
                  <p>
                    <strong>Horario:</strong> {restaurant.hours}
                  </p>
                  <p>
                    <strong>Teléfono:</strong> {restaurant.phone}
                  </p>
                  <div className="popup-buttons mt-3">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleMenu(restaurant.menu)}
                    >
                      Ver Menú
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => openReviewModal(restaurant)}
                    >
                      Hacer Reseña
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}

      {/* Modal del Menú */}
      {selectedMenu && (
        <div className="menu-modal">
          <div className="menu-modal-content">
            <h2 className="text-accent">Menú</h2>
            <div className="menu-divider"></div>
            {Object.entries(selectedMenu).map(([category, items]) => (
              <div key={category}>
                <h3>{category}</h3>
                <ul>
                  {items.map((item, index) => (
                    <li key={index}>
                      <span>{item.name}</span>
                      <span>{item.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <button className="btn btn-secondary" onClick={closeMenu}>
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Modal para hacer la reseña */}
      {reviewModal && (
        <div className="menu-modal">
          <div className="menu-modal-content compact">
            <h2 className="text-accent">Hacer Reseña</h2>
            <div className="menu-divider"></div>
            <form className="review-form">
              <p>
                <strong>Restaurante:</strong> {reviewForm.lugar}
              </p>
              <label>
                <strong>Comida:</strong>
              </label>
              <select
                name="comida"
                value={reviewForm.comida}
                onChange={(e) =>
                  setReviewForm({ ...reviewForm, comida: e.target.value })
                }
              >
                <option value="">Seleccionar comida</option>
                {selectedRestaurant.menu &&
                  Object.values(selectedRestaurant.menu).flat().map((item, idx) => (
                    <option key={idx} value={item.name}>
                      {item.name}
                    </option>
                  ))}
              </select>
              {["abundancia", "sabor", "calidadPrecio", "limpieza", "atencion", "ambiente"].map(
                (field) => (
                  <div key={field} className="star-rating-container">
                    <label>{field}</label>
                    <div className="star-rating">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`star ${
                            reviewForm[field] >= star ? "selected" : "unselected"
                          }`}
                          onClick={() => handleStarClick(field, star)}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                )
              )}
              <div className="buttons-container">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={submitReview}
                >
                  Enviar Reseña
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeReviewModal}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Restaurants;
