// src/DesktopViewLazy.jsx
import React, { useState, useMemo } from "react";
import { useOrgData } from "../hooks/OrgDataContext";
import "../DesktopView.css";
import Node from "../utils/Node"; // Ensure the path is correct
import SearchBar from "../utils/SearchBar"; // Ensure the path is correct

/** 
 * Recursively search through the org data and return nodes that match the query. 
 */
const filterOrgData = (nodes, query) => {
  const filtered = [];

  nodes.forEach((node) => {
    const { data, children } = node;
    const isMatch =
      data.name.toLowerCase().includes(query.toLowerCase()) ||
      data.title.toLowerCase().includes(query.toLowerCase());

    let filteredChildren = [];
    if (children) {
      filteredChildren = filterOrgData(children, query);
    }

    if (isMatch || filteredChildren.length > 0) {
      filtered.push({
        ...node,
        expanded: !!filteredChildren.length, // Expand if children match
        children: filteredChildren,
      });
    }
  });

  return filtered;
};

/**
 * Main org chart component that uses `useOrgData` hook
 * Renders the org chart and includes the floating search bar.
 */
export default function DesktopViewLazy() {
  const { orgData, loading, error } = useOrgData();
  const [searchQuery, setSearchQuery] = useState("");

  // Memoize the filtered data to optimize performance
  const filteredData = useMemo(() => {
    if (!searchQuery) return orgData;
    return filterOrgData(orgData, searchQuery);
  }, [orgData, searchQuery]);

  if (loading) {
    return (
      <div className="lazy-loader">
        <p>Loading org chart...</p>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!filteredData || filteredData.length === 0) {
    return (
      <div>
        {/* Floating Search Bar */}
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div>No data available.</div>
      </div>
    );
  }

  return (
    <div className="lazy-org-chart-container">
      {/* Floating Search Bar */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="lazy-org-chart-inner">
        {filteredData.map((rootNode, index) => (
          <Node key={index} node={rootNode} searchQuery={searchQuery} />
        ))}
      </div>
    </div>
  );
}
