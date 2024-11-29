import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Sidebar = ({ 
  isOpen, 
  closeSidebar, 
  isMinimized, 
  setIsMinimized 
}) => {
  const menuItems = [
    { name: 'Dashboard', icon: '📊', path: '/' },
    { name: 'Fontes Renováveis', icon: '☀️', path: '/sources' },
    { name: 'Estatísticas', icon: '📈', path: '/stats' },
    { name: 'Configurações', icon: '⚙️', path: '/settings' }
  ];

  return (
    <>
      {isOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={closeSidebar}
        />
      )}
      <aside 
        className={`main-sidebar 
          ${isOpen ? 'open' : ''} 
          ${isMinimized ? 'minimized' : ''}`
        }
      >
        <div className="sidebar-header">
          <h2>{!isMinimized ? 'Menu Principal' : ''}</h2>
          <div className="sidebar-controls">
            <button 
              className="minimize-sidebar" 
              onClick={() => setIsMinimized(!isMinimized)}
              title={isMinimized ? 'Expandir' : 'Minimizar'}
            >
              {isMinimized ? '▶' : '◀'}
            </button>
            <button 
              className="close-sidebar" 
              onClick={closeSidebar}
            >
              ×
            </button>
          </div>
        </div>

        <nav className="sidebar-menu">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `menu-item 
                ${isActive ? 'active' : ''} 
                ${isMinimized ? 'minimized' : ''}`
              }
              title={isMinimized ? item.name : ''}
            >
              <span className="menu-icon">{item.icon}</span>
              {!isMinimized && <span className="menu-text">{item.name}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          {!isMinimized ? (
            <>
              <Link to="/help" className="help-link">❓ Ajuda</Link>
              <Link to="/logout" className="logout-link">🚪 Sair</Link>
            </>
          ) : (
            <>
              <Link to="/help" className="help-link" title="Ajuda">❓</Link>
              <Link to="/logout" className="logout-link" title="Sair">🚪</Link>
            </>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;