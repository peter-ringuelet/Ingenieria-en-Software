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
      {reviewsData.map((review) => (
        <div key={review.id} className="card shadow review-card mb-4">
          <div className="card-body">
            <h5 className="card-title">{review.restaurant.name}</h5>
            <h6 className="card-subtitle">{review.comida}</h6>
            <hr />
            <div className="row">
              <div className="col-md-6">
                <h6 className="text-secondary">Comida</h6>
                <p>Abundancia: {renderStars(review.abundancia)}</p>
                <p>Sabor: {renderStars(review.sabor)}</p>
                <p>Relación calidad-precio: {renderStars(review.calidadPrecio)}</p>
              </div>
              <div className="col-md-6">
                <h6 className="text-secondary">Servicios</h6>
                <p>Limpieza: {renderStars(review.limpieza)}</p>
                <p>Atención: {renderStars(review.atencion)}</p>
                <p>Ambiente: {renderStars(review.ambiente)}</p>
              </div>
            </div>
            <p className="mt-3 text-muted">
               - {new Date(review.created_at).toLocaleDateString()} -
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
