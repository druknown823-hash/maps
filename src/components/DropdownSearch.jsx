<<<<<<< HEAD
import { useState, useRef, useEffect, useMemo } from 'react';
import { NODES as DEFAULT_NODES } from '../data/nodesData';
=======
import { useState, useRef, useEffect } from 'react';
// import { NODES } from '../data/nodesData';
>>>>>>> ef2fa6991b94f3d561441eb2fc7b00b7085406b1
import '../DropdownSearch.css';

export default function DropdownSearch({
  label,
  value,
  onChange,
<<<<<<< HEAD
  placeholder = 'Search Google Maps...',
  nodes = DEFAULT_NODES,
  type,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const dropdownRef = useRef(null);

  // Derive the selected node object
  const selectedNode = useMemo(() => {
    return nodes.find((n) => n.id === value || n.name === value) || null;
  }, [nodes, value]);

  // Adjust state during render without useEffect setState
  const [prevValue, setPrevValue] = useState(value);
  const [searchTerm, setSearchTerm] = useState(
    selectedNode ? selectedNode.name : value || ''
  );

  if (value !== prevValue) {
    setPrevValue(value);
    setSearchTerm(selectedNode ? selectedNode.name : value || '');
  }

  // Categories list
  const categories = useMemo(() => {
    const set = new Set(nodes.map((n) => n.category).filter(Boolean));
    return ['All', ...Array.from(set)];
  }, [nodes]);

  // Determine icon & context
  const isStart = type === 'start' || /start|from|origin/i.test(label || '');
  const isDest = type === 'destination' || /dest|to|end/i.test(label || '');

  // Filter items based on searchTerm & category
  const filteredItems = useMemo(() => {
    return nodes.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      const term = searchTerm.trim().toLowerCase();
      if (!term) return matchesCategory;

      const matchesSearch =
        item.name.toLowerCase().includes(term) ||
        item.id.toLowerCase().includes(term) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(term)) ||
        (item.category && item.category.toLowerCase().includes(term));

      return matchesCategory && matchesSearch;
    });
  }, [nodes, searchTerm, selectedCategory]);

=======
  placeholder = 'Search location...',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  // Sync internal search input with controlled prop `value`
  useEffect(() => {
    setSearchTerm(value || '');
  }, [value]);
  const NODES = [];

  const filteredItems = NODES.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

>>>>>>> ef2fa6991b94f3d561441eb2fc7b00b7085406b1
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
<<<<<<< HEAD
        if (selectedNode) {
          setSearchTerm(selectedNode.name);
        }
=======
>>>>>>> ef2fa6991b94f3d561441eb2fc7b00b7085406b1
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
<<<<<<< HEAD
  }, [selectedNode]);

  const handleSelect = (item) => {
    onChange(item.id);
    setSearchTerm(item.name);
    setIsOpen(false);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    setSearchTerm('');
    onChange('');
    setIsOpen(true);
  };

  return (
    <div className="gm-search-container" ref={dropdownRef}>
      {label && <label className="gm-search-label">{label}</label>}

      <div
        className={`gm-input-card ${isOpen ? 'focused' : ''} ${
          isStart ? 'is-start' : ''
        } ${isDest ? 'is-dest' : ''}`}
      >
        <div className="gm-icon-container">
          {isStart ? (
            <span className="gm-pin-icon start-pin" title="Starting point">
              <span className="inner-dot"></span>
            </span>
          ) : isDest ? (
            <span className="gm-pin-icon dest-pin" title="Destination">
              📍
            </span>
          ) : (
            <span className="gm-pin-icon search-pin" title="Search">
              🔍
            </span>
          )}
        </div>

=======
  }, []);

  const handleSelect = (itemId) => {
    onChange(itemId);
    setIsOpen(false);
  };

  const handleClear = () => {
    setSearchTerm('');
    onChange('');
  };

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      {label && <label className="dropdown-label">{label}</label>}

      <div className="input-wrapper">
>>>>>>> ef2fa6991b94f3d561441eb2fc7b00b7085406b1
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
<<<<<<< HEAD
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="gm-search-input"
          aria-expanded={isOpen}
        />

        {searchTerm && (
          <button
            className="gm-clear-btn"
            onClick={handleClear}
            type="button"
            title="Clear search"
            aria-label="Clear input"
          >
            ✕
=======
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="dropdown-input"
        />
        {searchTerm && (
          <button className="clear-btn" onClick={handleClear} type="button">
            &times;
>>>>>>> ef2fa6991b94f3d561441eb2fc7b00b7085406b1
          </button>
        )}
      </div>

      {isOpen && (
<<<<<<< HEAD
        <div className="gm-dropdown-panel">
          {categories.length > 1 && (
            <div className="gm-categories-bar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`gm-category-chip ${
                    selectedCategory === cat ? 'active' : ''
                  }`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          <ul className="gm-results-list">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => {
                const isSelected = value === item.id;
                return (
                  <li
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    className={`gm-result-item ${isSelected ? 'selected' : ''}`}
                  >
                    <div
                      className="gm-item-icon-wrapper"
                      style={{
                        backgroundColor: `${item.color || '#4285F4'}18`,
                        borderColor: `${item.color || '#4285F4'}40`,
                      }}
                    >
                      <span className="gm-item-emoji">
                        {item.icon || '📍'}
                      </span>
                    </div>

                    <div className="gm-item-content">
                      <div className="gm-item-title-row">
                        <span className="gm-item-title">{item.name}</span>
                        {item.category && (
                          <span className="gm-item-badge">{item.category}</span>
                        )}
                      </div>
                      {item.subtitle && (
                        <span className="gm-item-subtitle">
                          {item.subtitle}
                        </span>
                      )}
                    </div>

                    {isSelected && (
                      <span className="gm-item-check" title="Selected">
                        ✓
                      </span>
                    )}
                  </li>
                );
              })
            ) : (
              <li className="gm-no-results">
                <div className="gm-no-results-icon">📍</div>
                <div className="gm-no-results-text">
                  No matching places found
                </div>
                <div className="gm-no-results-hint">
                  Try searching for a different keyword or category
                </div>
              </li>
            )}
          </ul>
        </div>
=======
        <ul className="dropdown-menu">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <li
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`dropdown-item ${value === item.id ? 'selected' : ''}`}
              >
                <span>{item.name}</span>
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    backgroundColor: item.color,
                  }}
                />
              </li>
            ))
          ) : (
            <li className="dropdown-no-results">No location found</li>
          )}
        </ul>
>>>>>>> ef2fa6991b94f3d561441eb2fc7b00b7085406b1
      )}
    </div>
  );
}