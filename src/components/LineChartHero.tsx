
"use client"

import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, Line, ResponsiveContainer } from 'recharts';
import React from "react";

interface ChartData {
	year: number;
	obesity_percentage: number;
	isPrediction?: boolean; // Optional flag to indicate predictions
}

interface LineChartHeroProps {
	data: ChartData[];
	categories: string[];
	legend: boolean;
	xAxisLabel: string;
	yAxisLabel?: string | null;
	title?: string; // Optional title prop
}

export default function LineChartHero({
	data, categories, legend, xAxisLabel, yAxisLabel, title
}: LineChartHeroProps) {
	const tooltipFormatter = (value: number) => `${Math.round(value)}%`;

	return (
		<div className="w-full h-96 p-4 bg-white shadow-md rounded-lg">
			{title && <h2 className="text-lg font-semibold mb-2">{title}</h2>}
			<ResponsiveContainer width="100%" height="100%">
				<AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
					<defs>
						<linearGradient id="colorArea1" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#262C31" stopOpacity={0.8} />
							<stop offset="95%" stopColor="#262C31" stopOpacity={0} />
						</linearGradient>
					</defs>
					<CartesianGrid strokeDasharray="3 3" className="stroke-gray-300" />
					<XAxis dataKey="year" name={xAxisLabel} interval="preserveStartEnd" tickCount={data.length} className="text-gray-600" />
					<YAxis className="text-gray-600" />
					<Tooltip contentStyle={{ backgroundColor: '#f0f0f0', border: '1px solid #ccc' }} formatter={tooltipFormatter} />
					{legend && <Legend className="text-gray-600" />}
					<Area
						type="monotone"
						dataKey={categories[0]}
						stroke="#262C31"
						fillOpacity={1}
						fill="url(#colorArea1)"
						isAnimationActive={false}
					/>
					<Line
						type="monotone"
						dataKey={categories[0]}
						stroke="#262C31"
						strokeDasharray={(d: ChartData) => (d.isPrediction ? "5 5" : "")}
						dot={false}
						isAnimationActive={false}
						strokeOpacity={(d: ChartData) => (d.isPrediction ? 0.6 : 1)}
					/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
}

