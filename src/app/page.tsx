
"use client"

import { useEffect, useState } from 'react';
import AreaChartHero from '../components/AreaChartHero';
import { fetchClientData } from '../utils/fetchData';
import { ModeToggle } from '@/components/ToggleTheme';
import ObesityCounter from '@/components/obesitycounter';

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
    <main className="container mx-auto p-4 dark:bg-gray-900">
      <nav className="w-full h-32 flex justify-between">

        <ModeToggle />

        <h1 className="text-4xl font-semibold">⏰ Obesity Clock</h1>
        <p>by map</p>
      </nav>
      <ObesityCounter />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <h1 className="text-xl font-bold">The Bad</h1>
          <AreaChartHero
            data={obesityData}
            areas={[{ key: 'obesity_percentage', color: '#82ca9d' }]}
            legend={true}
            xAxisLabel="Year"
            yAxisLabel="Percentage"
            title="Obesity Rates Over Years"
          />
          <AreaChartHero
            data={depressionData}
            areas={[
              { key: 'lifetime_depression_percentage', color: '#82ca9d' },
              { key: 'current_depression_percentage', color: '#8884d8' }
            ]}
            legend={true}
            xAxisLabel="Year"
            yAxisLabel="Percentage"
            title="Depression Rates Over Years"
          />
        </div>
        <div className="space-y-4">
          <h1 className="text-xl font-bold text-white mb-4">The Good</h1>
          <AreaChartHero
            data={internetAdoptionData}
            areas={[{ key: 'internet_adoption_percentage', color: '#8884d8' }]}
            legend={true}
            xAxisLabel="Year"
            yAxisLabel="Percentage"
            title="Internet Adoption Over Years"
          />
        </div>
      </div>
      <p>sources: https://indianexpress.com/article/health-wellness/obesity-lancet-study-india-cause-9188931/#:~:text=The%20report%20showed%20more%20than,1.1%20million%20men%20in%201990.</p>
    </main>

  );
}
