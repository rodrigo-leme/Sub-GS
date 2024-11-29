import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import AppRoutes from './routes/AppRoutes';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <Router>
      <div className="app-container">
        <Header toggleSidebar={toggleSidebar} />
        <div className="main-content">
          <Sidebar 
            isOpen={isSidebarOpen} 
            closeSidebar={closeSidebar}
            isMinimized={isSidebarMinimized}
            setIsMinimized={setIsSidebarMinimized}
          />
          <main 
            className={`content 
              ${isSidebarOpen ? 'sidebar-open' : ''} 
              ${isSidebarMinimized ? 'sidebar-minimized' : ''}`
            }
          >
            <AppRoutes />
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;