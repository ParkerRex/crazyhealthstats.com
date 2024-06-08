
"use client"
import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

interface CountryData {
	country: string;
	flag: string;
	population: number;
	populationGrowthRate: number;
	obesity: number;
	obesityGrowthRate: number;
}

const countryData: CountryData[] = [
	{ country: "USA", flag: "🇺🇸", population: 330000000, populationGrowthRate: 0.01, obesity: 160000000, obesityGrowthRate: 0.02 },
	{ country: "China", flag: "🇨🇳", population: 1393000000, populationGrowthRate: 0.0039, obesity: 46000000, obesityGrowthRate: 0.05 },
	{ country: "India", flag: "🇮🇳", population: 1420000000, populationGrowthRate: 0.0039, obesity: 46000000, obesityGrowthRate: 0.052 },
	{ country: "Japan", flag: "🇯🇵", population: 125000000, populationGrowthRate: 0.0039, obesity: 46000000, obesityGrowthRate: 0.05 },
	// Add similar objects for other countries
];

const ObesityCounter = () => {
	return (
		<>
			{countryData.map(data => (
				<CountryObesityCounter key={data.country} {...data} />
			))}
		</>
	);
};

const CountryObesityCounter: React.FC<CountryData> = ({ country, flag, population, populationGrowthRate, obesity, obesityGrowthRate }) => {
	const startYear = new Date().getFullYear();
	const getYearFraction = () => {
		const now = new Date();
		const start = new Date(now.getFullYear(), 0, 1);
		const end = new Date(now.getFullYear() + 1, 0, 1);
		return (now - start) / (end - start);
	};

	const calculateCurrentValues = (startValue: number, growthRate: number) => {
		const yearsSinceStart = new Date().getFullYear() - startYear + getYearFraction();
		return startValue * Math.pow(1 + growthRate, yearsSinceStart);
	};

	const [currentPopulation, setCurrentPopulation] = useState(calculateCurrentValues(population, populationGrowthRate));
	const [currentObesity, setCurrentObesity] = useState(calculateCurrentValues(obesity, obesityGrowthRate));

	// Calculate new obese people per minute
	const newObesePerMinute = currentObesity * obesityGrowthRate / (365 * 24 * 60);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentPopulation(prev => prev * (1 + populationGrowthRate / (365 * 24 * 60 * 60)));
			setCurrentObesity(prev => prev * (1 + obesityGrowthRate / (365 * 24 * 60 * 60)));
		}, 50); // Update every 50ms for smoother transition
		return () => clearInterval(interval);
	}, []);

	return (
		<Card className="p-4 mb-4 bg-white">
			<div className="flex justify-between items-center w-full">
				<div className="flex items-center space-x-4">
					<p className="text-lg font-semibold w-20">{flag} {country}</p>
				</div>
				<div className="flex items-center justify-between flex-grow">
					<div className="flex flex-col items-center">
						<Badge>Population</Badge>
						<p className="text-red-500 text-xl font-bold w-40">{currentPopulation.toLocaleString('en-US')}</p>
					</div>
					<Separator orientation="vertical" className="w-1" />
					<div className="flex flex-col items-center">

						<Badge>Obesity</Badge>
						<p className="text-red-500 text-xl font-bold w-40">{currentObesity.toLocaleString('en-US')}</p>
					</div>
					<div className="flex flex-col items-center">
						<Badge>New Obese/Min</Badge>
						<p className="text-red-500 text-xl font-bold">{newObesePerMinute.toLocaleString('en-US', { maximumFractionDigits: 0 })}</p>
					</div>
				</div>
			</div>
		</Card>
	);
};

export default ObesityCounter;

