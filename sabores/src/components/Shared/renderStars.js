import React from "react";

export const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} className={i <= rating ? "text-warning" : "text-secondary"}>
        ★
      </span>
    );
  }
  return <span>{stars}</span>;
};
