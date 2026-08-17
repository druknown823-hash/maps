import { useState, useRef, useEffect } from 'react';
import { NODES } from '../data/nodesData';
import '../DropdownSearch.css';

export default function DropdownSearch({
  label,
  value,
  onChange,
  placeholder = 'Search location...',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  // Sync internal search input with controlled prop `value`
  useEffect(() => {
    setSearchTerm(value || '');
  }, [value]);

  const filteredItems = NODES.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="dropdown-input"
        />
        {searchTerm && (
          <button className="clear-btn" onClick={handleClear} type="button">
            &times;
          </button>
        )}
      </div>

      {isOpen && (
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
      )}
    </div>
  );
}