import React from "react";
import "./Stars.css"; // Archivo CSS para estilizar las estrellas

export const renderStars = (rating, customClass = "") => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <span key={i} className={`star star-filled ${customClass}`}>
          ★
        </span>
      );
    } else if (i - rating <= 0.5) {
      stars.push(
        <span key={i} className={`star star-half ${customClass}`}>
          ★
        </span>
      );
    } else {
      stars.push(
        <span key={i} className={`star star-empty ${customClass}`}>
          ★
        </span>
      );
    }
  }
  return (
    <span className={`stars-container ${customClass}`}>
      {stars} <span className="rating-number">({rating})</span>
    </span>
  );
};
