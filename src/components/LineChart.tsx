
// components/linechartExample.tsx
"use client"
import { LineChart } from "./ui/linechart"
import { Card } from "./ui/card"
interface LineChartHeroProps {
	data: Array<{
		date: number;
		[key: string]: number;
	}>,
	categories: string[]
	legend: boolean
	yAxisLabel: string
	xAxisLabel: string
}



export default function LineChartHero({ data, categories, legend, yAxisLabel, xAxisLabel }: LineChartHeroProps) {
	return (
		<Card className="flex">
			<LineChart
				className="h-80 w-full p-5"
				data={data}
				index="date"
				categories={categories}
				valueFormatter={(number: number) => number.toLocaleString()}
				yAxisLabel={yAxisLabel}
				xAxisLabel={xAxisLabel}
				showLegend={legend}
				onValueChange={(v) => console.log(v)}

			/>
		</Card>
	);
}
