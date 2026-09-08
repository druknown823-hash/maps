import { useState } from 'react';
import '../Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
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