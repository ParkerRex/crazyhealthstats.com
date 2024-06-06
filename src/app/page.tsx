
"use client"

import { useEffect, useState } from 'react';
import LineChartHero from '../components/LineChartHero';
import { fetchClientData } from '../utils/fetchData';

export default function Home() {
  const [internetAdoptionData, setInternetAdoptionData] = useState([]);
  const [obesityData, setObesityData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const internetData = await fetchClientData('/data/internet_adoption.json');
        const obesityData = await fetchClientData('/data/obesity.json');
        console.log('Internet Adoption Data:', internetData);
        console.log('Obesity Data:', obesityData);
        setInternetAdoptionData(internetData);
        setObesityData(obesityData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Data Visualization</h1>
      <section className="mb-8">
        <LineChartHero
          data={internetAdoptionData}
          categories={['internet_adoption_percentage']}
          legend={true}
          xAxisLabel="Year"
          yAxisLabel={null} // Set to null if you don't want any label
          title="Internet Adoption Over Years"
        />
      </section>
      <section>
        <LineChartHero
          data={obesityData}
          categories={['obesity_percentage']}
          legend={true}
          xAxisLabel="Year"
          yAxisLabel={null} // Set to null if you don't want any label
          title="Obesity Rates Over Years"
        />
      </section>
    </main>
  );
}
