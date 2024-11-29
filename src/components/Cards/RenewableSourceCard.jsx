import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RenewableSourceCard = ({ source }) => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  // Dados específicos para cada tipo de energia (mantidos do exemplo anterior)
  const energyDetails = {
    'Energia Eólica': {
      icon: '🌬️',
      description: 'Energia gerada pela força dos ventos',
      advantages: [
        'Fonte limpa e renovável',
        'Baixo custo operacional',
        'Não emite gases de efeito estufa'
      ],
      challenges: [
        'Dependência das condições climáticas',
        'Impacto visual na paisagem',
        'Ruído dos aerogeradores'
      ],
      bestRegions: ['Nordeste', 'Sul', 'Sudeste'],
      potentialCapacity: '18.5 GW',
      averageEfficiency: '40-50%'
    },
    'Energia Solar': {
      icon: '☀️',
      description: 'Energia gerada pela radiação solar',
      advantages: [
        'Energia limpa e inesgotável',
        'Baixa manutenção',
        'Pode ser instalada em diversos locais'
      ],
      challenges: [
        'Dependência de luz solar',
        'Custo inicial de instalação',
        'Necessidade de grandes áreas'
      ],
      bestRegions: ['Nordeste', 'Sudeste', 'Centro-Oeste'],
      potentialCapacity: '11.2 GW',
      averageEfficiency: '15-22%'
    },
    'Energia Hidrelétrica': {
      icon: '💧',
      description: 'Energia gerada pelo fluxo de águas',
      advantages: [
        'Fonte estável e previsível',
        'Grande capacidade de geração',
        'Baixo custo de geração após instalação'
      ],
      challenges: [
        'Impacto ambiental na construção',
        'Dependência de condições hidrológicas',
        'Alto custo inicial de construção'
      ],
      bestRegions: ['Sul', 'Sudeste', 'Norte'],
      potentialCapacity: '109.2 GW',
      averageEfficiency: '85-95%'
    }
  };

  // Seleciona os detalhes específicos da fonte
  const details = energyDetails[source.name] || {};

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleViewDetails = () => {
    navigate(`/source/${source.id}`);
  };

  return (
    <div className="renewable-source-card">
      <div className="card-header">
        <span className="card-icon">{details.icon}</span>
        <h2>{source.name}</h2>
      </div>

      <div className="card-body">
        <p>{details.description}</p>

        <div className="card-stats">
          <div className="stat-item">
            <strong>Capacidade:</strong> 
            <span>{source.capacity} GW</span>
          </div>
          <div className="stat-item">
            <strong>Eficiência:</strong> 
            <span>{(source.efficiency * 100).toFixed(0)}%</span>
          </div>
          <div className="stat-item">
            <strong>Região:</strong> 
            <span>{source.region}</span>
          </div>
        </div>

        {expanded && (
          <div className="card-details">
            <div className="card-section">
              <h3>Vantagens</h3>
              <ul>
                {details.advantages?.map((adv, index) => (
                  <li key={index}>{adv}</li>
                ))}
              </ul>
            </div>

            <div className="card-section">
              <h3>Desafios</h3>
              <ul>
                {details.challenges?.map((challenge, index) => (
                  <li key={index}>{challenge}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="card-actions">
        <button onClick={toggleExpand}>
          {expanded ? 'Mostrar Menos' : 'Saiba Mais'}
        </button>
        <button 
          className="details-button" 
          onClick={handleViewDetails}
        >
          Ver Detalhes Completos
        </button>
      </div>
    </div>
  );
};

export default RenewableSourceCard;