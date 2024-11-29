import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const HidroChart = ({ data = [] }) => {
  // dados da mock
  const chartData = data.length > 0 ? data : [
    { regiao: 'Sul', geracao: 800, potencial: 1200 },
    { regiao: 'Sudeste', geracao: 1200, potencial: 1500 },
    { regiao: 'Norte', geracao: 600, potencial: 2000 }
  ];

  return (
    <div style={{ width: '100%', height: 300 }}>
      <h2>Geração Hidrelétrica por Região</h2>
      <ResponsiveContainer>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="regiao" />
          <YAxis label={{ value: 'MW', angle: -90, position: 'insideLeft' }} />
          <Tooltip 
            formatter={(value, name) => [
              `${value} MW`, 
              name === 'geracao' ? 'Geração Atual' : 'Potencial'
            ]}
          />
          <Legend />
          <Bar dataKey="geracao" fill="#2ecc71" name="Geração Atual" />
          <Bar dataKey="potencial" fill="#3498db" name="Potencial" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HidroChart;