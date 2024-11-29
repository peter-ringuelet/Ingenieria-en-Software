// src/components/Reviews/Reviews.jsx

import React, { useEffect, useState } from "react";
import { getReviews } from "../../services/api";
import { renderStars } from "../Shared/renderStars";
import "./Reviews.css";
import "../../styles/theme.css";

const Reviews = () => {
  const [reviewsData, setReviewsData] = useState([]);
  const [loading, setLoading] = useState(true); // Para manejar el estado de carga
  const [error, setError] = useState(null);     // Para manejar errores

  useEffect(() => {
    // Obtener las reseñas desde el backend cuando el componente se monta
    getReviews()
      .then((data) => {
        setReviewsData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener las reseñas:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-secondary">Cargando reseñas...</p>;
  }

  if (error) {
    return <p className="text-danger">Error al cargar las reseñas.</p>;
  }

  return (
    <div className="container review-container">
      <h1 className="mb-4 text-accent">Reseñas de Restaurantes</h1>   
      {
      reviewsData.length > 0 ? 
      reviewsData.map((review) => (
        <div key={review.id} className="card shadow review-card mb-4">
          <div className="card-body">
            <h5 className="card-title">{review.restaurant_name}</h5>
            <h6 className="card-subtitle mb-2 ">{review.comida}</h6>
            <hr />
            <div className="row review-sections">
              <div className="col-md-6 review-section">
                <h6 className="section-title">Comida</h6>
                <p className="review-stars">
                  <strong>Abundancia:</strong> {renderStars(review.abundancia)}
                </p>
                <p className="review-stars">
                  <strong>Sabor:</strong> {renderStars(review.sabor)}
                </p>
                <p className="review-stars">
                  <strong>Relación calidad-precio:</strong> {renderStars(review.calidadPrecio)}
                </p>
              </div>
              <div className="col-md-6 review-section">
                <h6 className="section-title">Servicios</h6>
                <p className="review-stars">
                  <strong>Limpieza:</strong> {renderStars(review.limpieza)}
                </p>
                <p className="review-stars">
                  <strong>Atención:</strong> {renderStars(review.atencion)}
                </p>
                <p className="review-stars">
                  <strong>Ambiente:</strong> {renderStars(review.ambiente)}
                </p>
              </div>
            </div>
            <p className="mt-3 review-date text-right">
               - {new Date(review.created_at).toLocaleDateString()} -
            </p>
          </div>
        </div>
      ))
    : <p className="alerta">Aún no se han cargado reseñas</p>


    }
    </div>
  );
};

export default Reviews;
