import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { restaurantsData } from "../../data/restaurants";
import { renderStars } from "../Shared/renderStars";
import "../../styles/theme.css";
import "./Restaurants.css";

const restaurantIcon = (visited) =>
  new L.Icon({
    iconUrl: visited
      ? "https://cdn-icons-png.flaticon.com/512/1046/1046747.png"
      : "/icons/food.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

const locationIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const Restaurants = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [reviewModal, setReviewModal] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    lugar: "",
    comida: "",
    abundancia: "",
    sabor: "",
    calidadPrecio: "",
    limpieza: "",
    atencion: "",
    ambiente: "",
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
          setLoading(false);
        }
      );
    } else {
      console.error("Geolocalización no soportada.");
      setLoading(false);
    }
  }, []);

  const handleMenu = (menu) => {
    setSelectedMenu(menu);
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

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewForm((prev) => ({ ...prev, [name]: value }));
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
          {location && (
            <Marker position={location} icon={locationIcon}>
              <Popup>Tu ubicación actual</Popup>
            </Marker>
          )}
          {restaurantsData.map((restaurant) => (
            <Marker
              key={restaurant.id}
              position={restaurant.coords}
              icon={restaurantIcon(restaurant.visited)}
            >
              <Popup>
                <h5 className="text-accent">{restaurant.name}</h5>
                {restaurant.visited ? (
                  <div>
                    {renderStars(restaurant.rating)}{" "}
                    <span className="text-success">(Visitado)</span>
                  </div>
                ) : (
                  <p className="text-danger">(No visitado)</p>
                )}
                <p><strong>Especialidad:</strong> {restaurant.specialty}</p>
                <p><strong>Horario:</strong> {restaurant.hours}</p>
                <p><strong>Teléfono:</strong> {restaurant.phone}</p>
                <div className="d-flex justify-content-around mt-3">
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
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}

      {/* Modal para mostrar el menú */}
      {selectedMenu && (
        <div className="menu-modal">
          <div className="menu-modal-content">
            <h2 className="text-accent">Menú</h2>
            {Object.entries(selectedMenu).map(([category, items]) => (
              <div key={category}>
                <h3>{category}</h3>
                <ul>
                  {items.map((item, index) => (
                    <li key={index}>
                      {item.name} - {item.price}
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
          <div className="menu-modal-content">
            <h2 className="text-accent">Hacer Reseña</h2>
            <div className="menu-divider"></div>
            <form>
              <p><strong>Restaurante:</strong> {reviewForm.lugar}</p>
              <label>Comida</label>
              <select
                name="comida"
                value={reviewForm.comida}
                onChange={handleReviewChange}
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
                  <div key={field}>
                    <label>{field}</label>
                    <input
                      type="number"
                      name={field}
                      min="1"
                      max="5"
                      value={reviewForm[field]}
                      onChange={handleReviewChange}
                    />
                  </div>
                )
              )}
              <button
                type="button"
                className="btn btn-primary mt-3"
                onClick={submitReview}
              >
                Enviar Reseña
              </button>
              <button
                type="button"
                className="btn btn-secondary mt-3"
                onClick={closeReviewModal}
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Restaurants;
