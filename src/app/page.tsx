
"use client"

import { useEffect, useState } from 'react';
import LineChartHero from '../components/LineChartHero';
import { fetchClientData } from '../utils/fetchData';

export default function Home() {
  const [internetAdoptionData, setInternetAdoptionData] = useState([]);
  const [obesityData, setObesityData] = useState([]);
  const [depressionData, setDepressionData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const internetData = await fetchClientData('/data/internet_adoption.json');
        const obesityData = await fetchClientData('/data/obesity.json');
        const depressionData = await fetchClientData('/data/depression.json');
        console.log('Internet Adoption Data:', internetData);
        console.log('Obesity Data:', obesityData);
        console.log('Depression Data:', depressionData);
        setInternetAdoptionData(internetData);
        setObesityData(obesityData);
        setDepressionData(depressionData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <main className="container grid grid-cols-2 gap-4 gap-y-4 mx-auto p-4">
      <div className="flex flex-col">
        <h1 className="text-xl font-bold">The Bad</h1>
        <LineChartHero
          data={obesityData}
          lines={[{ key: 'obesity_percentage', color: '#82ca9d' }]}
          legend={true}
          xAxisLabel="Year"
          yAxisLabel="Percentage"
          title="Obesity Rates Over Years"
        />
        <LineChartHero
          data={depressionData}
          lines={[
            { key: 'lifetime_depression_percentage', color: '#82ca9d' },
            { key: 'current_depression_percentage', color: '#8884d8' }
          ]}
          legend={true}
          xAxisLabel="Year"
          yAxisLabel="Percentage"
          title="Depression Rates Over Years"
        />
      </div >
      <div>
        <h1 className="text-xl font-bold mb-4">The Good</h1>
        <LineChartHero
          data={internetAdoptionData}
          lines={[{ key: 'internet_adoption_percentage', color: '#8884d8' }]}
          legend={true}
          xAxisLabel="Year"
          yAxisLabel="Percentage"
          title="Internet Adoption Over Years"
        />
        <h1>cost of compute plummeting</h1>
        <LineChartHero

          data={internetAdoptionData}
          lines={[{ key: 'internet_adoption_percentage', color: '#8884d8' }]}
          legend={true}
          xAxisLabel="Year"
          yAxisLabel="Percentage"
          title="Internet Adoption Over Years"
        />
        <h1>effectiveness of ai skyrocketing</h1>
      </div>

    </main >

  );
}
