import { useState } from 'react';
import '../Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
<<<<<<< HEAD
  const [activeId, setActiveId] = useState('map');

  const navItems = [
    { id: 'home', label: 'Home', icon: '', href: '#home' },
    { id: 'map', label: '3D Map', icon: '', href: '#map' },
    { id: 'nodes', label: 'Locations', icon: '', href: '#nodes' },
    { id: 'about', label: 'About', icon: 'ℹ', href: '#about' },
  ];

  return (
    <nav className="navbar">
      {/* Nav links — each is its own floating pill */}
      <div className={`nav-float-group ${isOpen ? 'active' : ''}`}>
        {navItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className={`nav-float-item nav-link-pill ${activeId === item.id ? 'active' : ''}`}
            onClick={() => setActiveId(item.id)}
          >
            <span className="nav-pill-icon">{item.icon}</span>
            <span className="nav-pill-label">{item.label}</span>
          </a>
        ))}
      </div>

      {/* Mobile hamburger */}
=======

  return (
    <nav className="navbar">
      <div className="navbar-logo">🗺️ 3D Map Navigator</div>

      <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
        <a href="#home">Home</a>
        <a href="#map">3D Map</a>
        <a href="#nodes">Locations</a>
        <a href="#about">About</a>
        <button className="navbar-btn">Live Nav</button>
      </div>

>>>>>>> ef2fa6991b94f3d561441eb2fc7b00b7085406b1
      <button
        className="navbar-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
    </nav>
  );
}