// src/components/Restaurants/Restaurants.jsx

import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { getRestaurants, submitReview } from "../../services/api"; // Importamos las funciones necesarias
import { renderStars } from "../Shared/renderStars";
import { restaurantIcon, locationIcon } from "../../utils/mapIcons";
import "../../styles/theme.css";
import "./Restaurants.css";

const Restaurants = () => {
  // Estados para manejar la ubicación, carga, datos de restaurantes, menú seleccionado, restaurante seleccionado, modal de reseña y formulario de reseña
  const [location, setLocation] = useState({ lat: -34.854, lng: -58.043 });
  const [loading, setLoading] = useState(true);
  const [restaurantsData, setRestaurantsData] = useState([]); // Estado para los restaurantes
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

  // Función para cargar los restaurantes desde el backend
  const loadRestaurants = () => {
    setLoading(true);
    getRestaurants()
      .then((data) => {
        setRestaurantsData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los restaurantes:", error);
        setLoading(false);
      });
  };

  // useEffect para obtener la ubicación del usuario al montar el componente
  useEffect(() => {
    // Obtener la ubicación del usuario
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
          // Usar coordenadas por defecto
          setLocation({ lat: -34.854, lng: -58.043 });
          setLoading(false);
        }
      );
    } else {
      console.error("Geolocalización no soportada.");
      // Usar coordenadas por defecto
      setLocation({ lat: -34.854, lng: -58.043 });
      setLoading(false);
    }
  }, []);

  // useEffect para cargar los restaurantes al montar el componente
  useEffect(() => {
    loadRestaurants();
  }, []);

  // Manejar la selección del menú de un restaurante
  const handleMenu = (menuItems) => {
    if (menuItems && menuItems.length > 0) {
      // Agrupar los items del menú por categoría
      const menu = menuItems.reduce((acc, item) => {
        const category = item.category;
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(item);
        return acc;
      }, {});
      setSelectedMenu(menu);
    }
  };

  // Cerrar el menú seleccionado
  const closeMenu = () => {
    setSelectedMenu(null);
  };

  // Abrir el modal de reseña para un restaurante seleccionado
  const openReviewModal = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setReviewForm((prev) => ({
      ...prev,
      lugar: restaurant.name,
      comida: "",
    }));
    setReviewModal(true);
  };

  // Cerrar el modal de reseña
  const closeReviewModal = () => {
    setReviewModal(false);
    setSelectedRestaurant(null);
  };

  // Manejar el clic en las estrellas de calificación
  const handleStarClick = (field, value) => {
    setReviewForm((prev) => ({ ...prev, [field]: value }));
  };

  // Manejar el envío de la reseña
  const submitReviewHandler = () => {
    if (!selectedRestaurant) {
      return;
    }

    // Validar que se hayan completado todos los campos requeridos
    if (
      !reviewForm.comida ||
      reviewForm.abundancia === 0 ||
      reviewForm.sabor === 0 ||
      reviewForm.calidadPrecio === 0 ||
      reviewForm.limpieza === 0 ||
      reviewForm.atencion === 0 ||
      reviewForm.ambiente === 0
    ) {
      alert("Por favor, completa todos los campos de la reseña.");
      return;
    }

    const reviewData = {
      restaurant: selectedRestaurant.id,
      comida: reviewForm.comida,
      abundancia: reviewForm.abundancia,
      sabor: reviewForm.sabor,
      calidadPrecio: reviewForm.calidadPrecio,
      limpieza: reviewForm.limpieza,
      atencion: reviewForm.atencion,
      ambiente: reviewForm.ambiente,
    };

    submitReview(reviewData)
      .then(() => {
        alert("Reseña enviada exitosamente");
        closeReviewModal();
        loadRestaurants(); // Refrescar los datos de los restaurantes
      })
      .catch((error) => {
        console.error("Error al enviar la reseña:", error);
        alert("Ocurrió un error al enviar la reseña.");
      });
  };

  return (
    <div className="container mt-4 restaurants-container">
      <h1 className="mb-4 text-accent">Explora los Sabores de tu Ciudad</h1>
      {loading ? (
        <p className="text-secondary">Cargando ubicación y restaurantes...</p>
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
          {/* Marker para la ubicación del usuario */}
          <Marker position={[location.lat, location.lng]} icon={locationIcon}>
            <Popup>Tu ubicación actual</Popup>
          </Marker>
          {/* Markers para los restaurantes */}
          {restaurantsData.map((restaurant) => (
            <Marker
              key={restaurant.id}
              position={[restaurant.latitude, restaurant.longitude]}
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
                      onClick={() => handleMenu(restaurant.menu_items)}
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
                {selectedRestaurant &&
                  selectedRestaurant.menu_items.map((item, idx) => (
                    <option key={idx} value={item.name}>
                      {item.name}
                    </option>
                  ))}
              </select>
              {[
                "abundancia",
                "sabor",
                "calidadPrecio",
                "limpieza",
                "atencion",
                "ambiente",
              ].map((field) => (
                <div key={field} className="star-rating-container">
                  <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
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
              ))}
              <div className="buttons-container">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={submitReviewHandler}
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
