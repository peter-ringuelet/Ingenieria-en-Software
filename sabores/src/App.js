import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Menu from "./components/Menu";
import Restaurants from "./components/Restaurants";
import Reviews from "./components/Reviews";
import Profile from "./components/Profile"; // Nuevo componente

const App = () => {
  return (
    <Router>
      <div style={styles.appContainer}>
        {/* Menú siempre visible */}
        <Menu />
        {/* Vistas dinámicas */}
        <div style={styles.viewContainer}>
          <Routes>
            <Route path="/" element={<Navigate to="/restaurants" replace />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/profile" element={<Profile />} /> {/* Nueva ruta */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

const styles = {
  appContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  viewContainer: {
    flex: 1,
    overflowY: "auto",
  },
};

export default App;
