import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Menu from "./components/Menu/Menu";
import Restaurants from "./components/Restaurants/Restaurants";
import Reviews from "./components/Reviews/Reviews";
import Profile from "./components/Profile/Profile";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register"; // Importar Register
import { isAuthenticated } from "./services/auth";

const App = () => {
  const [authenticated, setAuthenticated] = useState(isAuthenticated());

  useEffect(() => {
    const handleAuthChange = () => {
      setAuthenticated(isAuthenticated());
    };

    window.addEventListener("authChange", handleAuthChange);
    return () => window.removeEventListener("authChange", handleAuthChange);
  }, []);

  return (
    <Router>
      <div style={styles.appContainer}>
        <Routes>
          {/* Ruta para la página de inicio */}
          <Route path="/" element={<Home />} />

          {/* Ruta para el formulario de inicio de sesión */}
          <Route
            path="/login"
            element={
              authenticated ? <Navigate to="/restaurants" /> : <Login />
            }
          />

          {/* Ruta para el formulario de registro */}
          <Route
            path="/register"
            element={
              authenticated ? <Navigate to="/restaurants" /> : <Register />
            }
          />

          {/* Rutas protegidas */}
          <Route
            path="*"
            element={
              authenticated ? (
                <>
                  <Menu />
                  <div style={styles.viewContainer}>
                    <Routes>
                      <Route path="/restaurants" element={<Restaurants />} />
                      <Route path="/reviews" element={<Reviews />} />
                      <Route path="/profile" element={<Profile />} />
                      {/* Redirigir rutas desconocidas a /restaurants */}
                      <Route path="*" element={<Navigate to="/restaurants" />} />
                    </Routes>
                  </div>
                </>
              ) : (
                <Navigate to="/" />
              )
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
    backgroundColor: "var(--background-dark)",
  },
  viewContainer: {
    flex: 1,
    overflowY: "auto",
  },
};

export default App;
