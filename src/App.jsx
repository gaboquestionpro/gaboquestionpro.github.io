import React, { useState, useEffect } from 'react';
import MobileView from './components/MobileView';
import DesktopView from './components/DesktopView';
import { PrimeReactProvider } from 'primereact/api';
import { OrgDataProvider } from './hooks/OrgDataContext';
import AppHeader from './components/AppHeader';
function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <AppHeader />
      <OrgDataProvider>
        {isMobile ? (
          <MobileView />
        ) : (
          <PrimeReactProvider>
            <DesktopView />
          </PrimeReactProvider>
        )}
      </OrgDataProvider>
    </>
  );
}

export default App;
