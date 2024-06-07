
"use client"

import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, ResponsiveContainer } from 'recharts';
import React from "react";

interface ChartData {
	year: number;
	[key: string]: number | boolean | undefined;
}

interface AreaChartHeroProps {
	data: ChartData[];
	areas: { key: string; color: string; isPrediction?: boolean }[];
	legend: boolean;
	xAxisLabel: string;
	yAxisLabel?: string | null;
	title?: string; // Optional title prop
}

export default function AreaChartHero({
	data, areas, legend, xAxisLabel, yAxisLabel, title
}: AreaChartHeroProps) {
	const tooltipFormatter = (value: number) => `${Math.round(value)}%`;

	return (
		<div className="w-full h-96 p-4 dark:bg-gray-800 shadow-md rounded-lg dark:text-white">
			{title && <h2 className="text-lg font-semibold mb-2">{title}</h2>}
			<ResponsiveContainer width="100%" height="100%">
				<AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
					<defs>
						{areas.map((area, index) => (
							<linearGradient key={index} id={`colorArea${index}`} x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor={area.color} stopOpacity={0.8} />
								<stop offset="95%" stopColor={area.color} stopOpacity={0} />
							</linearGradient>
						))}
					</defs>
					<CartesianGrid strokeDasharray="3 3" className="stroke-gray-600" />
					<XAxis dataKey="year" name={xAxisLabel} className="text-gray-400" />
					{yAxisLabel && <YAxis className="text-gray-400" />}
					<Tooltip formatter={tooltipFormatter} />
					{legend && <Legend className="text-gray-400" />}
					{areas.map((area, index) => (
						<Area
							key={index}
							type="monotone"
							dataKey={area.key}
							stroke={area.color}
							fillOpacity={1}
							fill={`url(#colorArea${index})`}
							isAnimationActive={false}
						/>
					))}
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
}
