import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  getSourceById, 
  getRenewableSourcesForecast 
} from '../services/energyApiService';

const SourceDetails = () => {
  const { id } = useParams();
  const [source, setSource] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchSourceDetails = async () => {
      try {
        const sourceData = await getSourceById(parseInt(id));
        const forecastData = await getRenewableSourcesForecast();
        
        setSource(sourceData);
        setForecast(
          forecastData.find(f => f.name === sourceData.name)
        );
      } catch (error) {
        console.error('Erro ao buscar detalhes da fonte', error);
      }
    };

    fetchSourceDetails();
  }, [id]);

  if (!source) return <div>Carregando...</div>;


  const renderChart = () => {
    return (
      <div className="source-chart">
        <h3>Projeção de Capacidade</h3>
        <div className="chart-placeholder">
          <div 
            className="chart-bar" 
            style={{
              width: `${forecast ? forecast.currentCapacity * 2 : 0}px`,
              backgroundColor: '#3498db'
            }}
          >
            Capacidade Atual: {source.capacity} GW
          </div>
          <div 
            className="chart-bar" 
            style={{
              width: `${forecast ? forecast.forecastCapacity * 2 : 0}px`,
              backgroundColor: '#2ecc71'
            }}
          >
            Previsão {forecast?.estimatedYear}: {forecast?.forecastCapacity} GW
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="source-details-page">
      <div className="source-header">
        <span className="source-icon">{source.details.icon}</span>
        <h1>{source.name}</h1>
        <Link to="/sources" className="back-link">← Voltar</Link>
      </div>

      <div className="source-tabs">
        {['overview', 'technical', 'environmental', 'forecast'].map(tab => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {
              {
                'overview': 'Visão Geral',
                'technical': 'Detalhes Técnicos',
                'environmental': 'Impacto Ambiental',
                'forecast': 'Projeções'
              }[tab]
            }
          </button>
        ))}
      </div>

      <div className="source-content">
        {activeTab === 'overview' && (
          <div className="overview-section">
            <h2>Descrição</h2>
            <p>{source.description}</p>

            <div className="key-stats">
              <div className="stat-item">
                <strong>Capacidade Atual:</strong>
                <span>{source.capacity} GW</span>
              </div>
              <div className="stat-item">
                <strong>Eficiência:</strong>
                <span>{source.efficiency * 100}%</span>
              </div>
              <div className="stat-item">
                <strong>Impacto Ambiental:</strong>
                <span>{source.environmentalImpact}</span>
              </div>
            </div>

            <div className="advantages-challenges">
              <div className="advantages">
                <h3>Vantagens</h3>
                <ul>
                  {source.details.advantages.map((adv, index) => (
                    <li key={index}>{adv}</li>
                  ))}
                </ul>
              </div>
              <div className="challenges">
                <h3>Desafios</h3>
                <ul>
                  {source.details.challenges.map((challenge, index) => (
                    <li key={index}>{challenge}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'technical' && (
          <div className="technical-section">
            <h2>Detalhes Técnicos</h2>
            <div className="technical-grid">
              {Object.entries(source.details.technicalDetails).map(([key, value]) => (
                <div key={key} className="technical-item">
                  <strong>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong>
                  <span>
                    {Array.isArray(value) ? value.join(', ') : value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'environmental' && (
          <div className="environmental-section">
            <h2>Impacto Ambiental</h2>
            <div className="environmental-details">
              <p>Análise detalhada do impacto ambiental da {source.name}.</p>
              <div className="environmental-metrics">
                <div className="metric">
                  <strong>Emissões de CO2:</strong>
                  <span>Baixas (próximo a zero)</span>
                </div>
                <div className="metric">
                  <strong>Área de Instalação:</strong>
                  <span>Variável conforme a região</span>
                </div>
                <div className="metric">
                  <strong>Impacto em Ecossistemas:</strong>
                  <span>{source.environmentalImpact}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'forecast' && (
          <div className="forecast-section">
            <h2>Projeções Futuras</h2>
            {renderChart()}
            <div className="forecast-details">
              {forecast && (
                <>
                  <div className="forecast-item">
                    <strong>Capacidade Atual:</strong>
                    <span>{forecast.currentCapacity} GW</span>
                  </div>
                  <div className="forecast-item">
                    <strong>Projeção para {forecast.estimatedYear}:</strong>
                    <span>{forecast.forecastCapacity} GW</span>
                  </div>
                  <div className="forecast-item">
                    <strong>Crescimento Projetado:</strong>
                    <span>{forecast.growthProjection}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SourceDetails;