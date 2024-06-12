"use client";

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
	{ year: 2019, cost: 705720000000, gdp: 3.30 },
	{ year: 2030, cost: 1005290000000, gdp: 3.78 },
	{ year: 2060, cost: 2622470000000, gdp: 4.62 },
];

const formatDollar = (value: number) => {
	return `$${(value / 1000000000).toFixed(2)}bn`;
};
const formatPercent = (value: number) => `${value}%`;

const CustomTooltip = ({ payload, label, active }: any) => {
	if (active && payload && payload.length) {
		return (
			<div className="custom-tooltip">
				<p className="label">{`Year: ${label}`}</p>
				<p className="intro">{`Cost: ${formatDollar(payload[0].value)}`}</p>
				<p className="intro">{`GDP: ${formatPercent(payload[1].value)}`}</p>
			</div>
		);
	}
	return null;
};

const CustomLineChart = () => {
	return (
		<div className="w-full h-96 p-4 dark:bg-gray-800 shadow-md rounded-lg dark:text-white">
			<h2 className="text-lg font-semibold mb-2">US GDP and Cost Impact</h2>
			<ResponsiveContainer width="100%" height="100%">
				<LineChart
					data={data}
					margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
				>
					<CartesianGrid strokeDasharray="3 3" className="stroke-gray-600" />
					<XAxis dataKey="year" className="text-gray-400" />
					<YAxis yAxisId="left" orientation="left" tickFormatter={formatDollar} className="text-gray-400" />
					<YAxis yAxisId="right" orientation="right" tickFormatter={formatPercent} className="text-gray-400" />
					<Tooltip content={<CustomTooltip />} />
					<Legend className="text-gray-400" />
					<Line yAxisId="left" type="monotone" dataKey="cost" stroke="#8884d8" />
					<Line yAxisId="right" type="monotone" dataKey="gdp" stroke="#82ca9d" />
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
}

export default CustomLineChart;
