"use client"
import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

interface CountryData {
	country: string;
	flag: string;
	population: number;
	populationGrowthRate: number;
	obesity: number;
	obesityGrowthRate: number;
	directCosts: number; // New property for direct costs related to obesity
}

const countryData: CountryData[] = [
	{
		country: "China",
		flag: "🇨🇳",
		population: 1410000000,
		populationGrowthRate: -0.013,  // Negative growth rate indicating a population decline
		obesity: 46000000,            // Estimated number of obese individuals
		obesityGrowthRate: 0.05,      // Assuming a continued increase in obesity rate
		directCosts: 56000000000      // Hypothetical value for the direct costs of obesity
	},

	{ country: "USA", flag: "🇺🇸", population: 330000000, populationGrowthRate: 0.01, obesity: 160000000, obesityGrowthRate: 0.02, directCosts: 147000000000 },
	{
		country: "Globe",
		flag: "🌎",
		population: 8114492487,
		populationGrowthRate: 0.0091,
		obesity: 1000000000,
		obesityGrowthRate: 0,
		directCosts: 210000000000
	},
	{
		country: "India",
		flag: "🇮🇳",
		population: 1420000000,
		populationGrowthRate: 0.68,    // Positive growth rate indicating a growing population
		obesity: 46000000,            // Estimated number of obese individuals
		obesityGrowthRate: 0.052,     // Assuming a continued increase in obesity rate
		directCosts: 22000000000      // Hypothetical value for the direct costs of obesity
	},
	{
		country: "Japan",
		flag: "🇯🇵",
		population: 125000000,
		populationGrowthRate: 0.0039,  // Low growth rate
		obesity: 46000000,            // Estimated number of obese individuals
		obesityGrowthRate: 0.05,      // Assuming a continued increase in obesity rate
		directCosts: 30000000000      // Hypothetical value for the direct costs of obesity
	}
];

const ObesityCounter = () => {
	return (
		<div className="space-y-2">
			{countryData.map(data => (
				<CountryObesityCounter key={data.country} {...data} />
			))}
		</div>
	);
};

const CountryObesityCounter: React.FC<CountryData> = ({
	country,
	flag,
	population,
	populationGrowthRate,
	obesity,
	obesityGrowthRate,
	directCosts
}) => {
	const [currentPopulation, setCurrentPopulation] = useState(population);
	const [currentObesity, setCurrentObesity] = useState(obesity);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentPopulation(prev => prev + (prev * populationGrowthRate / (365 * 24 * 60 * 60)));
			setCurrentObesity(prev => prev + (prev * obesityGrowthRate / (365 * 24 * 60 * 60)));
		}, 50); // Update every second

		return () => clearInterval(interval);
	}, [populationGrowthRate, obesityGrowthRate]);

	const populationClass = populationGrowthRate > 0 ? 'text-green-500' : 'text-red-500';
	const obesityClass = obesityGrowthRate > 0 ? 'text-green-500' : 'text-red-500';

	return (
		<Card className="">
			<CardHeader className="flex flex-col md:flex-row justify-between items-center">
				<div className="flex items-center space-x-4 w-full md:w-1/4 mb-4 md:mb-0">
					<p className="font-7xl font-bold">{flag}</p>
					<p className="font-3xl font-semibold dark:font-white">{country}</p>
				</div>
			</CardHeader>
			<CardContent className="flex flex-col md:flex-row items-center justify-between flex-grow space-y-4 md:space-y-0 md:space-x-8">
				<div className="flex flex-col items-center">
					<Badge>Population</Badge>
					<div className="flex border justify-between rounded-md p-2 items-center space-x-2 w-72">
						<p className={`text-xl font-bold ${populationClass} w-32 text-center`}>{Math.round(currentPopulation).toLocaleString('en-US')}</p>
						<Badge variant={populationGrowthRate > 0 ? "positiveGrowth" : "negativeGrowth"}>{(populationGrowthRate * 100).toFixed(2)}%</Badge>
					</div>
				</div>
				<div className="flex flex-col items-center">
					<Badge>Obesity</Badge>
					<div className="flex border rounded-md p-2 items-center space-x-2 w-72 justify-between">
						<p className={`text-xl font-bold ${obesityClass} w-32 text-center`}>{Math.round(currentObesity).toLocaleString('en-US')}</p>
						<Badge variant={obesityGrowthRate > 0 ? "positiveGrowth" : "negativeGrowth"}>{(obesityGrowthRate * 100).toFixed(2)}%</Badge>
					</div>
				</div>
				<div className="flex flex-col items-center">
					<Badge>Direct Costs</Badge>
					<div className="flex border rounded-md p-2 items-center space-x-2 w-64">
						<p className="text-red-500 text-xl font-bold w-32 text-center">${directCosts.toLocaleString('en-US')}</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default ObesityCounter;
