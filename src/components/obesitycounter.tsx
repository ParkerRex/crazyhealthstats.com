"use client";

import { useState, useEffect } from "react";
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/20/solid';
import { cn } from "@/lib/utils";
import rawData from "../../public/data/combined-data.json"
const countryData: CountryData[] = rawData as CountryData[];


interface CountryData {
  country: string;
  population: number;
  populationGrowthRate: number;
  obesity?: number;
  obesityGrowthRate?: number;
  directCosts?: number;
}

const ObesityCounter = () => {
  return (
    <div className="space-y-4">
      {countryData.map((data) => (
        <CountryObesityCounter key={data.country} {...data} />
      ))}
    </div>
  );
};

const CountryObesityCounter: React.FC<CountryData> = ({
  country,
  population,
  populationGrowthRate,
  obesity = 0,
  obesityGrowthRate = 0,
  directCosts = 0 // defaults
}) => {
  const [currentPopulation, setCurrentPopulation] = useState(population);
  const [currentObesity, setCurrentObesity] = useState(obesity);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPopulation(prev => prev + (prev * populationGrowthRate / (365 * 24 * 60 * 60)));
      setCurrentObesity(prev => prev + (prev * obesityGrowthRate / (365 * 24 * 60 * 60)));
    }, 1000);

    return () => clearInterval(interval);
  }, [populationGrowthRate, obesityGrowthRate]);


  return (
    <div>
      <h3 className="text-base font-semibold leading-6 text-gray-900">{country}</h3>
      <dl className="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-x md:divide-y-0">
        <div className="px-4 py-5 sm:p-6">
          <dt className="text-base font-normal text-gray-900">Total Population</dt>
          <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
            <div className="flex items-baseline text-2xl font-semibold text-slate-600">
              {Math.round(currentPopulation).toLocaleString('en-US')}
              <span className={cn(populationGrowthRate > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800', 'inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium')}>
                {populationGrowthRate > 0 ? (
                  <ArrowUpIcon className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500" aria-hidden="true" />
                ) : (
                  <ArrowDownIcon className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-red-500" aria-hidden="true" />
                )}
                {(populationGrowthRate * 100).toFixed(2)}%
              </span>
            </div>
          </dd>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <dt className="text-base font-normal text-gray-900">Obese Population</dt>
          <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
            <div className="flex items-baseline text-2xl font-semibold text-slate-600">
              {Math.round(currentObesity).toLocaleString('en-US')}
              <span className={cn(obesityGrowthRate > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800', 'inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium')}>
                {obesityGrowthRate > 0 ? (
                  <ArrowUpIcon className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500" aria-hidden="true" />
                ) : (
                  <ArrowDownIcon className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-red-500" aria-hidden="true" />
                )}
                {(obesityGrowthRate * 100).toFixed(2)}%
              </span>
            </div>
          </dd>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <dt className="text-base font-normal text-gray-900">Economic Impact</dt>
          <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
            <div className="flex items-baseline text-2xl font-semibold text-slate-600">
              ${directCosts.toLocaleString('en-US')}
            </div>
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default ObesityCounter;
