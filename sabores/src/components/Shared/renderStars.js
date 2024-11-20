import React from "react";
import "./Stars.css"; // Archivo CSS para estilizar las estrellas

export const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <span key={i} className="star star-filled">
          ★
        </span>
      );
    } else if (i - rating <= 0.5) {
      stars.push(
        <span key={i} className="star star-half">
          ★
        </span>
      );
    } else {
      stars.push(
        <span key={i} className="star star-empty">
          ★
        </span>
      );
    }
  }
  return (
    <span className="stars-container">
      {stars} <span className="rating-number">({rating})</span>
    </span>
  );
};
