
"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import React from 'react';

interface BarChartHeroProps {
	data: { name: string; percentage: number }[];
	barKey: string;
	barColor: string;
	xAxisLabel: string;
	yAxisLabel?: string | null;
	title?: string; // Optional title prop
}

export default function BarChartHero({
	data,
	barKey,
	barColor,
	xAxisLabel,
	yAxisLabel,
	title
}: BarChartHeroProps) {
	return (
		<div className="w-full h-96 p-4 dark:bg-gray-800 shadow-md rounded-lg dark:text-white">
			{title && <h2 className="text-lg font-semibold mb-2">{title}</h2>}
			<ResponsiveContainer width="100%" height="100%">
				<BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
					<CartesianGrid strokeDasharray="3 3" className="stroke-gray-600" />
					<XAxis dataKey="name" name={xAxisLabel} className="text-gray-400" />
					{yAxisLabel && <YAxis className="text-gray-400" />}
					<Tooltip />
					<Legend className="text-gray-400" />
					<Bar dataKey={barKey} fill={barColor} barSize={40} />
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
}
