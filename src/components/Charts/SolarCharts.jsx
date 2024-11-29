import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SolarChart = ({ data = [] }) => {
  // dados da mock
  const chartData = data.length > 0 ? data : [
    { mes: 'Jan', geracao: 200, irradiacao: 6.5 },
    { mes: 'Fev', geracao: 250, irradiacao: 7.0 },
    { mes: 'Mar', geracao: 300, irradiacao: 7.5 },
    { mes: 'Abr', geracao: 280, irradiacao: 7.2 },
    { mes: 'Mai', geracao: 220, irradiacao: 6.8 },
    { mes: 'Jun', geracao: 180, irradiacao: 6.3 }
  ];

  return (
    <div style={{ width: '100%', height: 300 }}>
      <h2>Geração Solar - Sazonalidade</h2>
      <ResponsiveContainer>
        <AreaChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="mes" />
          <YAxis 
            yAxisId="left" 
            label={{ value: 'Geração (MW)', angle: -90, position: 'insideLeft' }} 
          />
          <YAxis 
            yAxisId="right" 
            orientation="right" 
            label={{ value: 'Irradiação (kWh/m²)', angle: 90, position: 'insideRight' }} 
          />
          <Tooltip 
            formatter={(value, name) => [
              name === 'geracao' ? `${value} MW` : `${value} kWh/m²`, 
              name === 'geracao' ? 'Geração' : 'Irradiação'
            ]}
          />
          <Legend />
          <Area 
            yAxisId="left" 
            type="monotone" 
            dataKey="geracao" 
            stroke="#f39c12" 
            fill="#f39c12" 
            fillOpacity={0.3} 
            name="Geração"
          />
          <Area 
            yAxisId="right" 
            type="monotone" 
            dataKey="irradiacao" 
            stroke="#e74c3c" 
            fill="#e74c3c" 
            fillOpacity={0.3} 
            name="Irradiação"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SolarChart;