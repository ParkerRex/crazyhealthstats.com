
"use client"
import { useState, useEffect } from "react";
import { Card, CardHeader } from "./ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";

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

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentPopulation(prev => prev * (1 + populationGrowthRate / (365 * 24 * 60 * 60)));
			setCurrentObesity(prev => prev * (1 + obesityGrowthRate / (365 * 24 * 60 * 60)));
		}, 50); // Smoother updates every 50ms
		return () => clearInterval(interval);
	}, []);

	return (
		<Card className="">
			<div className="flex justify-between items-center p-4">
				<div className="flex flex-col space-y-2">
					<div className="flex">
						<p className="text-2xl font-semibold">{flag} {country}</p>
					</div>
					<div className="justify-center">
						<Badge className="select-none w-20">Population</Badge>
						<p className="text-red-500 text-2xl font-bold">{currentPopulation.toLocaleString('en-US')}</p>
					</div>
					<Badge className="select-none w-20">Obesity</Badge>
					<p className="text-red-500 text-2xl font-bold">{currentObesity.toLocaleString('en-US')}</p>
				</div>
			</div>
		</Card>
	);
};

export default ObesityCounter;
