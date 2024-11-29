import React from 'react';
import PropTypes from 'prop-types';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const EnergyStatsCard = ({ 
  type, 
  totalGeneration, 
  region, 
  potentialCapacity 
}) => {
  const [favoriteStats, setFavoriteStats] = useLocalStorage('favoriteStats', []);

  const statsColors = {
    'Eólica': '#3498db',
    'Solar': '#f39c12',
    'Hidrelétrica': '#2ecc71',
    'Biomassa': '#9b59b6'
  };

  const toggleFavorite = () => {
    const statKey = `${type}-${region}`;
    const isFavorite = favoriteStats.some(stat => stat.key === statKey);

    if (isFavorite) {
      setFavoriteStats(favoriteStats.filter(stat => stat.key !== statKey));
    } else {
      setFavoriteStats([
        ...favoriteStats, 
        { 
          key: statKey, 
          type, 
          region, 
          totalGeneration, 
          potentialCapacity 
        }
      ]);
    }
  };

  const isFavorite = favoriteStats.some(
    stat => stat.key === `${type}-${region}`
  );

  return (
    <div 
      className="energy-stats-card"
      style={{ 
        backgroundColor: statsColors[type] || '#34495e', 
        color: 'white' 
      }}
    >
      <div className="card-header">
        <h3>{type} - {region}</h3>
        <button 
          onClick={toggleFavorite}
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </div>

      <div className="card-body">
        <div className="stat-item">
          <span>Geração Total:</span>
          <strong>{totalGeneration} MWh</strong>
        </div>

        <div className="stat-item">
          <span>Capacidade Potencial:</span>
          <strong>{potentialCapacity} MW</strong>
        </div>
      </div>

      <div className="card-footer">
        <p>Última Atualização: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
};

EnergyStatsCard.propTypes = {
  type: PropTypes.oneOf([
    'Eólica', 
    'Solar', 
    'Hidrelétrica', 
    'Biomassa'
  ]).isRequired,
  totalGeneration: PropTypes.number.isRequired,
  region: PropTypes.string.isRequired,
  potentialCapacity: PropTypes.number.isRequired
};

export default EnergyStatsCard;