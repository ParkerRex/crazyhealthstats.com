import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
	{
		year: '1990', percentage: 0.7797952489135934
	},
	{
		year: '1991', percentage: 1.1610505428612135
	},
	{
		year: '1992', percentage: 1.7252082982054624
	},
	{
		year: '1993', percentage: 2.280067276022449
	},
	{
		year: '1994', percentage: 4.898731065529485
	},
	{
		year: '1995', percentage: 9.342219854162335
	},
	{
		year: '1996', percentage: 16.652153430708314
	},
	{
		year: '1997', percentage: 21.989209708040087
	},
	{
		year: '1998', percentage: 30.712614006927643
	},
	{
		year: '1999', percentage: 36.699130944012964
	},
	{
		year: '2000', percentage: 43.12998747404417
	},
	{
		year: '2001', percentage: 49.1576990201571
	},
	{
		year: '2002', percentage: 58.95210737339345
	},
	{
		year: '2003', percentage: 61.895118028481205
	},
	{
		year: '2004', percentage: 65.0076181556186
	},
	{
		year: '2005', percentage: 68.25917862262528
	},
	{
		year: '2006', percentage: 69.24679208092446
	},
	{
		year: '2007', percentage: 75.3643297898217
	},
	{
		year: '2008', percentage: 74.39782592214367
	},
	{
		year: '2009', percentage: 71.39681948426748
	},
	{
		year: '2010', percentage: 72.10127265065177
	},
	{
		year: '2011', percentage: 70.22292470744744
	},
	{
		year: '2012', percentage: 75.33207646754621
	},
	{
		year: '2013', percentage: 72.07347328244275
	},
	{
		year: '2014', percentage: 73.70506137394706
	},
	{
		year: '2015', percentage: 75.30706293849373
	},
	{
		year: '2016', percentage: 86.38322204975723
	},
	{
		year: '2017', percentage: 88.16732862521295
	},
	{
		year: '2018', percentage: 89.28769590722917
	},
	{
		year: '2019', percentage: 90.09858211827411
	},
	{
		year: '2020', percentage: 92.10823822168167
	},
	{
		year: '2021', percentage: 93.26963696369637
	},
	{
		year: '2022', percentage: 96.0960960960961
	},
	{
		year: '2023', percentage: 98.80239520958084
	}
];


export default function InternetAdoption() {
	return (
		<ResponsiveContainer width="100%" height="100%">
			<AreaChart
				width={500}
				height={400}
				data={data}
				margin={{
					top: 10,
					right: 30,
					left: 0,
					bottom: 0,
				}}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey=":G" />
				<YAxis />
				<Tooltip />
				<Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
			</AreaChart>
		</ResponsiveContainer>

	)

}
