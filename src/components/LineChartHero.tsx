

"use client"

import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, ResponsiveContainer } from 'recharts';
import React from "react";

interface ChartData {
	year: number;
	[key: string]: number;
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
						<linearGradient id="colorArea2" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
							<stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
						</linearGradient>
					</defs>
					<CartesianGrid strokeDasharray="3 3" className="stroke-gray-300" />
					<XAxis dataKey="year" name={xAxisLabel} interval="preserveStartEnd" tickCount={data.length} className="text-gray-600" />
					{yAxisLabel && (
						<YAxis label={{ value: yAxisLabel, angle: -90, position: 'insideLeft', className: 'text-gray-600' }} className="text-gray-600" />
					)}
					<Tooltip contentStyle={{ backgroundColor: '#f0f0f0', border: '1px solid #ccc' }} formatter={tooltipFormatter} />
					{legend && <Legend className="text-gray-600" />}
					{categories.map((category, index) => (
						<Area
							key={index}
							type="monotone"
							dataKey={category}
							stroke={index % 2 === 0 ? "#262C31" : "#82ca9d"}
							fillOpacity={1}
							fill={index % 2 === 0 ? "url(#colorArea1)" : "url(#colorArea2)"}
						/>
					))}
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
}

