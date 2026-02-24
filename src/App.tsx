import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { Admin } from './pages/Admin';
import { initAnalytics } from './lib/analytics';
import './App.css';

function App() {
  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <Router>
      <div className="app">
        <header className="header">
          <div className="header-content">
            <Link to="/" className="logo">
              ✨ Spiritual Store
            </Link>
            <nav className="nav">
              <a href="#incense">Incense</a>
              <a href="#oils">Oils</a>
              <a href="#cards">Cards</a>
              <a href="#carpets">Carpets</a>
              <Link to="/admin">Admin</Link>
            </nav>
          </div>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>

        <footer className="footer">
          <div className="footer-content">
            <p>&copy; 2024 Spiritual Store. All rights reserved.</p>
            <p>Premium spiritual products for your sacred journey</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
