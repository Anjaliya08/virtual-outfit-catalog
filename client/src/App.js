import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import VirtualTryOnPage from "./pages/VirtualTryOnPage";
import WishlistPage from "./pages/WishlistPage";
import CartPage from "./pages/CartPage";
import StyleQuizPage from "./pages/StyleQuizPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { OutfitProvider, useOutfit } from "./context/OutfitContext";
import "./App.css";

// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

// Navbar Component
function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const { wishlistItems, cartItems } = useOutfit();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="nav-container">
        <h2 className="logo">👗 TryFit</h2>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/try-on">Virtual Try-On</Link>
          <Link to="/wishlist">
            Wishlist
            {wishlistItems.length > 0 && (
              <span className="badge">{wishlistItems.length}</span>
            )}
          </Link>
          <Link to="/cart">
            Cart
            {cartItems.length > 0 && (
              <span className="badge">{cartItems.length}</span>
            )}
          </Link>
          <Link to="/style-quiz">Style Quiz</Link>

          {!isLoggedIn ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

// Main App Component
function App() {
  return (
    <OutfitProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/try-on"
            element={
              <ProtectedRoute>
                <VirtualTryOnPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <WishlistPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/style-quiz"
            element={
              <ProtectedRoute>
                <StyleQuizPage />
              </ProtectedRoute>
            }
          />

          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </OutfitProvider>
  );
}

export default App;
