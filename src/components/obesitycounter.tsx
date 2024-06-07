"use client"
import { useState, useEffect } from "react";
import { Card, CardHeader } from "./ui/card";

const ObesityCounter = () => {
	const startYear = 2024;
	const initialPopulation = 335190101; // Starting population
	const startObesityCount = 880000000; // Starting obesity count
	const annualGrowthRate = 0.03; // 3% growth rate for obesity
	const populationGrowthRate = 0.01; // 1% growth rate for population

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

	const [currentPopulation, setCurrentPopulation] = useState(() => calculateCurrentValues(initialPopulation, populationGrowthRate));
	const [currentObesity, setCurrentObesity] = useState(() => calculateCurrentValues(startObesityCount, annualGrowthRate));

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentPopulation((prev) => prev + (populationGrowthRate / (365 * 24 * 60 * 60)) * prev);
			setCurrentObesity((prev) => prev + (annualGrowthRate / (365 * 24 * 60 * 60)) * prev);
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<Card className="bg-white p-4 shadow-md rounded-lg max-w-4xl mx-auto">
			<CardHeader className="text-center text-xl font-semibold">
				US Population & Obesity Tracker
			</CardHeader>
			<div className="flex justify-between items-center p-4">
				<div className="flex flex-col space-y-2">
					<span className="text-sm font-semibold">USA</span>
					<span className="text-xs text-gray-500">Population: {currentPopulation.toLocaleString()}</span>
					<span className="text-xs text-gray-500">Obesity: {currentObesity.toLocaleString()}</span>
				</div>
				<div className="flex items-center space-x-4">
					<span className="text-green-600">🌎</span>
					<span className="text-red-600">🍔</span>
				</div>
			</div>
		</Card>
	);
};

export default ObesityCounter;
