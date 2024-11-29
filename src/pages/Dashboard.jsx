import React, { useState, useEffect } from 'react';
import { fetchRenewableSources } from '../services/energyApiService';
import RenewableSourceCard from '../components/Cards/RenewableSourceCard';
import EolicaChart from '../components/Charts/EolicaChart';
import { useLocalStorage } from '../hooks/useLocalStorage';

const Dashboard = () => {
  const [sources, setSources] = useState([]);
  const [dashboardConfig, setDashboardConfig] = useLocalStorage('dashboardConfig', {
    showCharts: true,
    selectedSources: []
  });

  useEffect(() => {
    const loadSources = async () => {
      const data = await fetchRenewableSources();
      setSources(data);
    };
    loadSources();
  }, []);

  const toggleChartVisibility = () => {
    setDashboardConfig(prev => ({
      ...prev,
      showCharts: !prev.showCharts
    }));
  };


  //obs: Tive algumas dificuldades na comunicação com a API da mockapi
  const mockEolicaData = [
    { regiao: 'Nordeste', geracao: 500 },
    { regiao: 'Sul', geracao: 350 },
    { regiao: 'Sudeste', geracao: 200 }
  ];

  return (
    <div className="dashboard">
      <h1>Dashboard de Energias Renováveis</h1>
      
      <div className="dashboard-controls">
        <button onClick={toggleChartVisibility}>
          {dashboardConfig.showCharts ? 'Ocultar Gráficos' : 'Mostrar Gráficos'}
        </button>
      </div>

      {dashboardConfig.showCharts && (
        <div className="dashboard-charts">
          <EolicaChart data={mockEolicaData} />
        </div>
      )}

      <div className="renewable-sources-grid">
        {sources.map(source => (
          <RenewableSourceCard 
            key={source.id} 
            source={source} 
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;