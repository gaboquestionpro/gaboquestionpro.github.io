// src/components/SearchBar.jsx
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "../DesktopView.css"; 

/**
 * Floating Search Bar Component
 * @param {string} searchQuery - The current search query
 * @param {function} setSearchQuery - Function to update the search query
 */
function SearchBar({ searchQuery, setSearchQuery }) {
  const [inputValue, setInputValue] = useState(searchQuery);
  const [isVisible, setIsVisible] = useState(false); // Control visibility
  const containerRef = useRef(null);

  // Debounce the search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(inputValue);
    }, 300); // Debounce delay (ms)

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, setSearchQuery]);

  // Close search bar when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target) &&
        !event.target.matches(".floating-search-toggle")
      ) {
        setIsVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [containerRef]);

  const handleClear = () => {
    setInputValue("");
    setSearchQuery("");
  };

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        className={`floating-search-toggle ${isVisible ? "active" : ""}`}
        onClick={toggleVisibility}
        title={isVisible ? "Close Search" : "Open Search"}
        aria-label={isVisible ? "Close Search" : "Open Search"}
      >
        {isVisible ? "✕" : "🔍"} {/* Replace with icons if desired */}
      </button>

      {/* Floating Search Bar */}
      <div
        ref={containerRef}
        className={`floating-search-container ${
          isVisible ? "visible" : "hidden"
        }`}
        aria-hidden={!isVisible}
      >
        <input
          type="text"
          placeholder="Search by name or title..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="floating-search-input"
          aria-label="Search by name or title"
        />
        {inputValue && (
          <button
            onClick={handleClear}
            className="floating-clear-button"
            title="Clear Search"
            aria-label="Clear search input"
          >
            ✕
          </button>
        )}
      </div>
    </>
  );
}

// PropTypes for type checking
SearchBar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
};

// Exporting with React.memo for performance optimization
export default React.memo(SearchBar);
