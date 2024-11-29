import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ toggleSidebar }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Nova atualização em Energia Solar', type: 'info' },
    { id: 2, message: 'Alerta de manutenção eólica', type: 'warning' }
  ]);

  const handleSearch = (e) => {
    e.preventDefault();
    
    console.log('Buscando:', searchTerm);
  };

  const clearNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <header className="main-header">
      <div className="header-left">
        <button 
          className="sidebar-toggle" 
          onClick={toggleSidebar}
        >
          ☰
        </button>
        <div className="logo">
 
          <span>Energia Renovável</span>
        </div>
      </div>

      <div className="header-center">
        <form onSubmit={handleSearch} className="search-bar">
          <input 
            type="text" 
            placeholder="Buscar fontes, regiões..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">🔍</button>
        </form>
      </div>

      <div className="header-right">
        <div className="notifications">
          <div className="notification-icon">
            🔔 {notifications.length}
          </div>
          {notifications.length > 0 && (
            <div className="notifications-dropdown">
              {notifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`notification ${notification.type}`}
                >
                  {notification.message}
                  <button 
                    onClick={() => clearNotification(notification.id)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="user-profile">
 
          <span>Usuário</span>
        </div>
      </div>
    </header>
  );
};

export default Header;