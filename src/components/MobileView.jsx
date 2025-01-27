import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../mobile.css'; // Import the CSS file
import '../index.css';

import { useOrgData } from '../hooks/OrgDataContext'; // Import the custom hook for shared data context
import { WuLoader } from '@npm-questionpro/wick-ui-lib';


const OrgNode = ({ node, onToggle, isExpanded, level }) => {
  return (
    <div className={`org-node level-${level}`}>
      {node.type === 'person' && node.data ? (
        <div className="org-node-person">
          <img
            src={node.data.image}
            alt={node.data.name}
            className="org-node-avatar"
          />
          <div className="org-node-info">
            <h3>{node.data.name}</h3>
            <p>{node.data.title}</p>
          </div>
        </div>
      ) : (
        <div className="org-node-label">{node.label}</div>
      )}

      {/* Toggle button (only if there are children) */}
      {node.children && node.children.length > 0 && (
        <button className="toggle-button" onClick={onToggle}>
          <i
            className={isExpanded ? 'fa fa-chevron-down' : 'fa fa-chevron-up'}
          />
        </button>
      )}
    </div>
  );
};

const OrgChart = ({ data }) => {
  const [expandedNodes, setExpandedNodes] = React.useState(new Set());

  const handleToggle = (index) => {
    setExpandedNodes((prevExpandedNodes) => {
      const updatedSet = new Set(prevExpandedNodes);
      if (updatedSet.has(index)) {
        updatedSet.delete(index);
      } else {
        updatedSet.add(index);
      }
      return updatedSet;
    });
  };

  const renderTree = (nodes, level = 1, parentIndex = '', isRoot = false) => {
    return (
      <ul className="org-tree">
        {nodes.map((node, index) => {
          const currentIndex = `${parentIndex}${index}`;
          const isExpanded = expandedNodes.has(currentIndex);
          const liClassName = `level-${level} ${isRoot ? 'root-node' : ''}`;

          return (
            <li key={currentIndex} className={liClassName}>
              <OrgNode
                node={node}
                onToggle={() => handleToggle(currentIndex)}
                isExpanded={isExpanded}
                level={level}
              />
              {node.children && node.children.length > 0 && (
                <div
                  className={`org-children-wrapper ${
                    isExpanded ? 'expanded' : ''
                  }`}
                >
                  {isExpanded && (
                    <div className="org-children">
                      {renderTree(
                        node.children,
                        level + 1,
                        `${currentIndex}-`,
                        false
                      )}
                    </div>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="org-chart-container">{renderTree(data, 1, '', true)}</div>
  );
};

export default function MobileView() {
  const { orgData, loading, error } = useOrgData(); // Use the shared data context

  if (loading) {
    return <div><WuLoader
    color="hsl(208, 80%, 50%)"
    size="md"
  /></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="app">
      <OrgChart data={orgData} />
    </div>
  );
}
