import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Menu from "./components/Menu/Menu";
import Restaurants from "./components/Restaurants/Restaurants";
import Reviews from "./components/Reviews/Reviews";
import Profile from "./components/Profile/Profile";

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
            <Route path="/profile" element={<Profile />} />
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
    backgroundColor: "var(--background-dark)", // Fondo oscuro
  },
  viewContainer: {
    flex: 1,
    overflowY: "auto",
  },
};

export default App;
