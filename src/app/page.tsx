
"use client";
import { CountryData, columns } from "../components/columns"
import { useEffect, useState } from 'react';
import AreaChartHero from '../components/AreaChartHero';
import BarChartHero from '../components/BarChartHero';
import { fetchClientData } from '../utils/fetchData';
import countryObesityJson from "../../public/data/obesity_country_percentage.json";
import Image from 'next/image';
import { ModeToggle } from '@/components/ToggleTheme';
import { DataTable } from '@/components/data-table';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function Home() {
  const [internetAdoptionData, setInternetAdoptionData] = useState([]);
  const [obesityData, setObesityData] = useState([]);
  const [depressionData, setDepressionData] = useState([]);
  const [countryData, setCountryData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const internetData = await fetchClientData('/data/internet_adoption.json');
        const obesityData = await fetchClientData('/data/obesity.json');
        const depressionData = await fetchClientData('/data/depression.json');
        const countryData = await fetchClientData('/data/combined-data.json');
        setInternetAdoptionData(internetData);
        setObesityData(obesityData);
        setDepressionData(depressionData);
        setCountryData(countryData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <main className="container mx-auto p-4 dark:bg-gray-900">
      <nav className="w-full p-2 pb-2 flex justify-between border-b items-center">
        <Image alt="logo" src="/logo.png" width={100} height={100} className="size-8" />
        <h1 className="text-xl font-semibold">The Health Clock</h1>
        <ModeToggle />
      </nav>
      <div className="h-6 flex justify-end items-center">
        <Popover>
          <PopoverTrigger>
            ?
          </PopoverTrigger>
          <PopoverContent>
            <p className="text-lg font-bold">Sources:</p>
            <ul>
              <li><a href="https://worldpopulationreview.com/">Population Data</a></li>
              <li><a href="https://indianexpress.com/article/health-wellness/obesity-lancet-study-india-cause-9188931/#:~:text=The%20report%20showed%20more%20than,1.1%20million%20men%20in%201990">India obesity</a></li>
            </ul>
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <DataTable columns={columns} data={countryData} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <BarChartHero
            data={countryObesityJson}
            barKey="percentage"
            barColor="#8884d8"
            xAxisLabel="Country"
            yAxisLabel="Obesity Percentage"
            title="Obesity Rates by Country"
          />
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
