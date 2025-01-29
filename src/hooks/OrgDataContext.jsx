import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const OrgDataContext = createContext();

// Provider component
export const OrgDataProvider = ({ children }) => {
  const [orgData, setOrgData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrgData = async () => {
      try {
        const response = await fetch('http://localhost:4001/org-chart');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setOrgData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

   /* useEffect(() => {
      const fetchOrgData = async () => {
        try {
          // Replace the API URL with a local JSON import.
          const response = await import('../org-data.json');
          setOrgData(response.default);
        } catch (err) {
          setError('Failed to load mock data');
        } finally {
          setLoading(false);
        }
      };*/

    fetchOrgData();
  }, []);

  return (
    <OrgDataContext.Provider value={{ orgData, loading, error }}>
      {children}
    </OrgDataContext.Provider>
  );
};

// Custom hook to use the OrgDataContext
export const useOrgData = () => {
  return useContext(OrgDataContext);
};
