
"use client";
import { columns } from "../components/columns"
import { Button } from "../components/ui/button"
import { useEffect, useState } from 'react';
import AreaChartHero from '../components/AreaChartHero';
import BarChartHero from '../components/BarChartHero';
import { fetchClientData } from '../utils/fetchData';
import countryObesityJson from "../../public/data/obesity_country_percentage.json";
import Image from 'next/image';
import { ModeToggle } from '@/components/ToggleTheme';
import { DataTable } from '@/components/data-table';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import CustomLineChart from "@/components/gdp";
import { Megaphone } from "lucide-react";
import { useTheme } from 'next-themes';


export default function Home() {
  const [internetAdoptionData, setInternetAdoptionData] = useState([]);
  const [obesityData, setObesityData] = useState([]);
  const [depressionData, setDepressionData] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const { theme } = useTheme();


  useEffect(() => {
    async function fetchData() {
      try {
        const internetData = await fetchClientData('/data/internet_adoption.json');
        const obesityData = await fetchClientData('/data/obesity.json');
        const depressionData = await fetchClientData('/data/depression.json');
        const countryData = await fetchClientData('/data/population-for-table.json');
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
        <div className="flex items-center space-x-2">
          <a href="https://mapthemap.com">
            <Image
              alt="logo"
              src={theme === 'dark' ? '/logo-dark.svg' : '/logo.svg'}
              width={100}
              height={100}
              className="size-6"
            />
          </a>
          <p className="font-bold"><span className="text-gray-200">/ {" "}</span>Health Stats</p>
        </div>
        <ModeToggle />
      </nav>

      {/* Alert Section */}
      <div className="my-4">
        <Alert>
          <Megaphone className="h-4 w-4" />
          <AlertTitle>Note from Maker</AlertTitle>
          <AlertDescription>There are complete data sets for the ten most populous countries. The remainders have incomplete data and are TODOS. The goal was to get an idea of the scale in our largest countries. If the data looks incorrect, <span className="font-semibold"><a target="_blank" href="https://x.com/parkerrex">DM me!{" "}</a></span>I spent a couple hours pulling this together. You can see them in the sources popover below the table. If you're interested in contributing, <span className="font-semibold"><a target="_blank" href="https://github.com/ParkerRex/crazyhealthstats.com">submit a pr!</a></span></AlertDescription>
        </Alert>
      </div>

      {/* Data Table Section */}
      <div className="flex justify-center">
        <DataTable columns={columns} data={countryData} />
      </div>

      {/* Sources Popover */}
      <div className="mb-4 flex justify-end">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost">Data sources</Button>
          </PopoverTrigger>
          <PopoverContent>
            <p className="text-lg font-bold">Sources:</p>
            <ul className="list-disc">
              <li><a href="https://worldpopulationreview.com/">Population Data</a></li>
              <li><a href="https://data.worldobesity.org/rankings/">Obesity data</a></li>
              <li><a href="https://indianexpress.com/article/health-wellness/obesity-lancet-study-india-cause-9188931/#:~:text=The%20report%20showed%20more%20than,1.1%20million%20men%20in%201990">India obesity</a></li>
              <li><a href="https://stop.publichealth.gwu.edu/LFD-oct23#:~:text=Obesity%20continues%20to%20have%20a,surpass%20%244%20trillion%20by%202035.">$4T metric</a></li>
              <li><a href="https://obesitymedicine.org/blog/health-economic-impact-of-obesity/">$1.4T economic cost to USA</a></li>
              <li><a href="https://www.statista.com/chart/19621/annual-health-expenditure-per-capita-due-to-obesity/">Expenditure per capita</a></li>
              <li><a href="https://www.statista.com/statistics/1386185/overweight-and-obesity-economic-impact-worldwide-forecasts/">Impact of obesity in USA</a></li>
              <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10204471/#:~:text=India%2C%20the%20largest%20country%20in,trend%20%5B14%2C15%5D.">India obesity</a></li>
              <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10357130/#:~:text=According%20to%20the%202021%20Children's,%25%20in%202022%20%5B4%5D.">China obesity %</a></li>
              <li><a href="https://www.worldobesity.org/news/economic-cost-of-overweight-and-obesity-set-to-reach-3.3-of-global-gdp-by-2060">Obesity as % of GDP</a></li>

              <li><a href="https://data.worldobesity.org/publications/WOF-Economic-Impacts-2-V2.pdf">Obesity in Indonesia</a></li>
            </ul>
          </PopoverContent>
        </Popover>
      </div>

      {/* Charts and Graphs Section */}
      <h2 className="text-2xl font-bold">Charts</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <CustomLineChart />
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
      </div>
    </main>

  );
}
