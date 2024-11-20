import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { restaurantsData } from "../data/restaurants";
import { renderStars } from "../utils/renderStars"; // Importar la función desde utils
import "../styles/theme.css";
import "../styles/Restaurants.css";

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

  const handleReview = (restaurantName) => {
    alert(`Hacer reseña para: ${restaurantName}`);
  };

  const handleMenu = (restaurantName) => {
    alert(`Ver menú de: ${restaurantName}`);
  };

  return (
    <div className="container mt-4 restaurants-container">
      <h1 className="mb-4 text-accent">Explora los Sabores de tu Ciudad</h1>
      {loading ? (
        <p className="text-secondary">Cargando ubicación...</p>
      ) : (
        <MapContainer
          center={[-34.8692, -58.0497]}
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
                <div>{renderStars(restaurant.rating)}</div>
                <p><strong>Especialidad:</strong> {restaurant.specialty}</p>
                <p><strong>Horario:</strong> {restaurant.hours}</p>
                <p><strong>Rango de precios:</strong> {restaurant.priceRange}</p>
                <div className="d-flex justify-content-around mt-3">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleReview(restaurant.name)}
                  >
                    Hacer Reseña
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleMenu(restaurant.name)}
                  >
                    Ver Menú
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
};

export default Restaurants;

