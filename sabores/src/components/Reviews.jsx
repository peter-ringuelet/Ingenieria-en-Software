import React from "react";
import { reviewsData } from "../data/reviews";
import { renderStars } from "../utils/renderStars";
import "../styles/theme.css"; 
import "../styles/Reviews.css";

const Reviews = () => {
  return (
    <div className="container review-container">
      <h1 className="mb-4 text-accent">Reseñas de Restaurantes</h1>
      {reviewsData.map((review) => (
        <div key={review.id} className="card shadow review-card mb-4">
          <div className="card-body">
            <h5 className="card-title">{review.lugar}</h5>
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
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;

