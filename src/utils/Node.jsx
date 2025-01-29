import React, { useState, useEffect } from "react";
import "../DesktopView.css";

/** Highlight matching text */
function highlightText(text, query) {
  if (!query) return text;
  const parts = text.split(new RegExp(`(${query})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span key={i} className="highlight-text">
        {part}
      </span>
    ) : (
      part
    )
  );
}

/** Recursively render an org-node with search highlighting */
export default function Node({ node, searchQuery }) {
  const hasChildren = Array.isArray(node.children) && node.children.length > 0;
  const [isOpen, setIsOpen] = useState(!!node.expanded);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  // Determine if the current node matches the search query
  const isMatch =
    node.data.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    node.data.title.toLowerCase().includes(searchQuery.toLowerCase());

  // Expand the node if it has matching children
  useEffect(() => {
    if (node.expanded) {
      setIsOpen(true);
    }
  }, [node.expanded]);

  return (
    <div className="lazy-node-container">
      {/* Node "card" */}
      <div
        className={`lazy-node ${isMatch ? "highlight" : ""}`}
        title={isMatch ? "Match found" : ""}
      >
        <img
          src={node.data?.image}
          alt={node.data?.name}
          className="lazy-node-image"
        />
        <div className="lazy-node-name">
          {highlightText(node.data?.name, searchQuery)}
        </div>
        <div className="lazy-node-title">
          {highlightText(node.data?.title, searchQuery)}
        </div>

        {/* Toggle button at bottom center, only if this node has children */}
        {hasChildren && (
          <button className="lazy-toggle-btn" onClick={handleToggle}>
            {isOpen ? "−" : "+"}
          </button>
        )}
      </div>

      {/* If expanded and has children, display them */}
      {hasChildren && isOpen && (
        <div className="lazy-children">
          {/* Vertical line going down from the parent node */}
          <div className="lazy-line vertical" />

          {/* This container holds the horizontal line behind child nodes,
              plus the child nodes themselves side by side */}
          <div className="lazy-children-container">
            {/* The horizontal line behind child nodes (only as wide as they are) */}
            <div className="lazy-line horizontal" />

            {/* Render each child node in the same manner */}
            {node.children.map((child, idx) => (
              <Node key={idx} node={child} searchQuery={searchQuery} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
