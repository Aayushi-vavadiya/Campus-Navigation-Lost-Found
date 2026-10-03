import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";

import Home from "./pages/Home";
import CampusMap from "./pages/CampusMap";
import LostFound from "./pages/LostFound";
import Login from "./pages/Login";

import "./App.css";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function Navigation() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  }

  return (
    <nav className="navbar">
      <div className="logo">CampusConnect</div>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/campus-map">
          Campus Map
        </Link>

        <Link to="/lost-found">
          Lost & Found
        </Link>

        {token ? (
          <button
            onClick={handleLogout}
            className="logout-button"
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navigation />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/campus-map"
          element={
            <ProtectedRoute>
              <CampusMap />
            </ProtectedRoute>
          }
        />

        <Route
          path="/lost-found"
          element={
            <ProtectedRoute>
              <LostFound />
            </ProtectedRoute>
          }
        />

        <Route
          path="/login"
          element={<Login />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;