import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Menu from "./components/Menu/Menu";
import Restaurants from "./components/Restaurants/Restaurants";
import Reviews from "./components/Reviews/Reviews";
import Profile from "./components/Profile/Profile";
import Home from "./components/Home/Home"; // Nueva vista inicial

const App = () => {
  return (
    <Router>
      <div style={styles.appContainer}>
        {/* Menú siempre visible excepto en la vista de inicio */}
        <Routes>
          <Route
            path="/"
            element={<Home />} // Vista inicial no tiene el menú
          />
          <Route
            path="*"
            element={
              <>
                <Menu />
                <div style={styles.viewContainer}>
                  <Routes>
                    <Route path="/restaurants" element={<Restaurants />} />
                    <Route path="/reviews" element={<Reviews />} />
                    <Route path="/profile" element={<Profile />} />
                  </Routes>
                </div>
              </>
            }
          />
        </Routes>
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
