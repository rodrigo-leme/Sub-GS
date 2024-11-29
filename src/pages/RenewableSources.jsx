import React, { useState, useEffect } from 'react';
import { fetchRenewableSources } from '../services/energyApiService';

const RenewableSources = () => {
  const [sources, setSources] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const loadSources = async () => {
      try {
        const data = await fetchRenewableSources();
        setSources(data);
      } catch (error) {
        console.error('Erro ao carregar fontes renováveis', error);
      }
    };

    loadSources();
  }, []);

  const filteredSources = sources.filter(source => 
    source.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="renewable-sources-page">
      <h1>Fontes Renováveis</h1>
      
      <div className="sources-filter">
        <input 
          type="text" 
          placeholder="Filtrar fontes..." 
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <div className="sources-grid">
        {filteredSources.map(source => (
          <div key={source.id} className="source-card">
            <h2>{source.name}</h2>
            <p>{source.description}</p>
            <div className="source-details">
              <span>Região: {source.region}</span>
              <span>Capacidade: {source.capacity} MW</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RenewableSources;