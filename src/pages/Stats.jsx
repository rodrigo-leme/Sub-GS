import React, { useState, useEffect } from 'react';
import { fetchRenewableSources } from '../services/energyApiService';

const Stats = () => {
  const [stats, setStats] = useState({
    totalGeneration: 0,
    sourceBreakdown: [],
    regionBreakdown: []
  });

  useEffect(() => {
    const calculateStats = async () => {
      try {
        const sources = await fetchRenewableSources();
        
        const totalGeneration = sources.reduce((sum, source) => 
          sum + (source.capacity || 0), 0
        );

        const sourceBreakdown = sources.map(source => ({
          name: source.name,
          capacity: source.capacity || 0,
          percentage: ((source.capacity || 0) / totalGeneration * 100).toFixed(2)
        }));

        const regionBreakdown = sources.reduce((acc, source) => {
          const existingRegion = acc.find(r => r.name === source.region);
          if (existingRegion) {
            existingRegion.capacity += source.capacity || 0;
          } else {
            acc.push({
              name: source.region,
              capacity: source.capacity || 0
            });
          }
          return acc;
        }, []);

        setStats({
          totalGeneration,
          sourceBreakdown,
          regionBreakdown
        });
      } catch (error) {
        console.error('Erro ao calcular estatísticas', error);
      }
    };

    calculateStats();
  }, []);

  return (
    <div className="stats-page">
      <h1>Estatísticas de Energia Renovável</h1>
      
      <section className="total-generation">
        <h2>Geração Total</h2>
        <p>{stats.totalGeneration.toFixed(2)} MW</p>
      </section>

      <section className="source-breakdown">
        <h2>Distribuição por Fonte</h2>
        <div className="breakdown-grid">
          {stats.sourceBreakdown.map(source => (
            <div key={source.name} className="breakdown-item">
              <h3>{source.name}</h3>
              <p>{source.capacity.toFixed(2)} MW</p>
              <p>{source.percentage}%</p>
            </div>
          ))}
        </div>
      </section>

      <section className="region-breakdown">
        <h2>Distribuição por Região</h2>
        <div className="breakdown-grid">
          {stats.regionBreakdown.map(region => (
            <div key={region.name} className="breakdown-item">
              <h3>{region.name}</h3>
              <p>{region.capacity.toFixed(2)} MW</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Stats;