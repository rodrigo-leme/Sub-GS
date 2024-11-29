import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const Settings = () => {
  const [theme, setTheme] = useLocalStorage('app-theme', 'light');
  const [notifications, setNotifications] = useLocalStorage('notifications', {
    emailAlerts: true,
    pushNotifications: false
  });
  const [language, setLanguage] = useLocalStorage('app-language', 'pt-BR');

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const toggleNotification = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="settings-page">
      <h1>Configurações</h1>

      <section className="theme-settings">
        <h2>Tema</h2>
        <div className="theme-options">
          <button 
            onClick={() => handleThemeChange('light')}
            className={theme === 'light' ? 'active' : ''}
          >
            Claro
          </button>
          <button 
            onClick={() => handleThemeChange('dark')}
            className={theme === 'dark' ? 'active' : ''}
          >
            Escuro
          </button>
        </div>
      </section>

      <section className="notification-settings">
        <h2>Notificações</h2>
        <div className="notification-options">
          <label>
            <input 
              type="checkbox" 
              checked={notifications.emailAlerts}
              onChange={() => toggleNotification('emailAlerts')}
            />
            Alertas por E-mail
          </label>
          <label>
            <input 
              type="checkbox" 
              checked={notifications.pushNotifications}
              onChange={() => toggleNotification('pushNotifications')}
            />
            Notificações Push
          </label>
        </div>
      </section>

      <section className="language-settings">
        <h2>Idioma</h2>
        <select 
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="pt-BR">Português (Brasil)</option>
          <option value="en-US">English (US)</option>
          <option value="es-ES">Español</option>
        </select>
      </section>
    </div>
  );
};

export default Settings;