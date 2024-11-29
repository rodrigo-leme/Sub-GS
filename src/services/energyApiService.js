import axios from 'axios';

 
const BASE_URL = 'https://mocki.io/v1/renewable-sources';

 
const MOCK_RENEWABLE_SOURCES = [
  {
    id: 1,
    name: 'Energia Eólica',
    description: 'Energia gerada pela força dos ventos',
    region: 'Nordeste',
    capacity: 15.4, 
    efficiency: 0.45,
    environmentalImpact: 'Baixo',
    details: {
      icon: '🌬️',
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
      averageEfficiency: '40-50%',
      technicalDetails: {
        turbineTypes: ['Horizontal', 'Vertical'],
        averageHeight: '100-150m',
        windSpeedRequired: '3-25 m/s'
      }
    }
  },
  {
    id: 2,
    name: 'Energia Solar',
    description: 'Energia gerada pela radiação solar',
    region: 'Sudeste',
    capacity: 7.8,  
    efficiency: 0.22,
    environmentalImpact: 'Muito Baixo',
    details: {
      icon: '☀️',
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
      averageEfficiency: '15-22%',
      technicalDetails: {
        panelTypes: ['Monocristalino', 'Policristalino', 'Filme Fino'],
        averageLifespan: '25-30 anos',
        performanceDegradation: '0.5-0.8% por ano'
      }
    }
  },
  {
    id: 3,
    name: 'Energia Hidrelétrica',
    description: 'Energia gerada pelo fluxo de águas',
    region: 'Sul',
    capacity: 109.2, 
    efficiency: 0.90,
    environmentalImpact: 'Médio',
    details: {
      icon: '💧',
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
      averageEfficiency: '85-95%',
      technicalDetails: {
        damTypes: ['Barragem', 'Fio d\'água', 'Reservatório'],
        averageReservoirLifespan: '50-100 anos',
        waterFlowRequired: '50-500 m³/s'
      }
    }
  }
];

export const fetchRenewableSources = async () => {
  try { 
    // tentei simular a chamada da API
    return MOCK_RENEWABLE_SOURCES;
  } catch (error) {
    console.error("Erro ao buscar fontes renováveis", error);
    return MOCK_RENEWABLE_SOURCES;  
  }
};

export const getSourceById = async (id) => {
  try {
    const sources = await fetchRenewableSources();
    const source = sources.find(source => source.id === id);
    
    if (!source) {
      throw new Error(`Fonte de energia com ID ${id} não encontrada`);
    }
    
    return source;
  } catch (error) {
    console.error(`Erro ao buscar fonte com ID ${id}`, error);
    throw error;
  }
};
 
export const getRenewableSourcesStats = async () => {
  try {
    const sources = await fetchRenewableSources();
    
    return {
      totalCapacity: sources.reduce((sum, source) => sum + source.capacity, 0),
      sourceBreakdown: sources.map(source => ({
        name: source.name,
        capacity: source.capacity,
        percentage: (source.capacity / sources.reduce((sum, s) => sum + s.capacity, 0) * 100).toFixed(2)
      })),
      regionalDistribution: sources.reduce((acc, source) => {
        if (acc[source.region]) {
          acc[source.region] += source.capacity;
        } else {
          acc[source.region] = source.capacity;
        }
        return acc;
      }, {}),
      environmentalImpact: {
        low: sources.filter(source => source.environmentalImpact === 'Baixo').length,
        medium: sources.filter(source => source.environmentalImpact === 'Médio').length,
        high: sources.filter(source => source.environmentalImpact === 'Alto').length
      }
    };
  } catch (error) {
    console.error("Erro ao buscar estatísticas de fontes renováveis", error);
    return null;
  }
};

 
export const getRenewableSourcesForecast = async () => {
  try {
    const sources = await fetchRenewableSources();
    
    return sources.map(source => ({
      name: source.name,
      currentCapacity: source.capacity,
      forecastCapacity: source.capacity * 1.2, // Previsão de crescimento de 20%
      growthProjection: '20%',
      estimatedYear: 2030
    }));
  } catch (error) {
    console.error("Erro ao buscar previsões de fontes renováveis", error);
    return null;
  }
};