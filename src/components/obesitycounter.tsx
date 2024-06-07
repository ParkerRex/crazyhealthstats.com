
"use client"
import { useState, useEffect } from "react";
import { Card, CardHeader } from "./ui/card";

const countryData = {
	country: "USA",
	population: 330000000,
	populationGrowthRate: 0.01,
	obesity: 160000000,
	obesityGrowthRate: 0.02
};

const ObesityCounter = () => {
	const { country, population, populationGrowthRate, obesity, obesityGrowthRate } = countryData;
	const startYear = new Date().getFullYear(); // Initialize the start year dynamically

	// Function to calculate the current time percentage of the year passed
	const getYearFraction = () => {
		const now = new Date();
		const start = new Date(now.getFullYear(), 0, 1);
		const end = new Date(now.getFullYear() + 1, 0, 1);
		return (now - start) / (end - start);
	};

	// Calculates current values based on the start values and growth rates
	const calculateCurrentValues = (startValue, growthRate) => {
		const yearsSinceStart = new Date().getFullYear() - startYear + getYearFraction();
		return startValue * Math.pow(1 + growthRate, yearsSinceStart);
	};

	const [currentPopulation, setCurrentPopulation] = useState(() => calculateCurrentValues(population, populationGrowthRate));
	const [currentObesity, setCurrentObesity] = useState(() => calculateCurrentValues(obesity, obesityGrowthRate));

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentPopulation((prev) => prev + (populationGrowthRate / (365 * 24 * 60 * 60)) * prev);
			setCurrentObesity((prev) => prev + (obesityGrowthRate / (365 * 24 * 60 * 60)) * prev);
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<Card className="bg-white p-4 shadow-md rounded-lg max-w-4xl mx-auto">
			<CardHeader className="text-center text-xl font-semibold">
				{country} Population & Obesity Tracker
			</CardHeader>
			<div className="flex justify-between items-center p-4">
				<div className="flex flex-col space-y-2">
					<p className="text-2xl font-semibold">🇺🇸{country}</p>
					<span className="text-xs text-gray-500">🌎 Population: {currentPopulation.toLocaleString()}</span>
					<span className="text-xs text-gray-500">🍔 Obesity: {currentObesity.toLocaleString()}</span>
				</div>
			</div>
		</Card>
	);
};

export default ObesityCounter;
