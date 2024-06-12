"use client"
import React, { useEffect, useState } from "react";
import { Progress } from "./Progress";
import { Earth } from "lucide-react";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "./ui/tooltip"

export default function Minibar() {
	const totalPopulation = 8_000_000_000; // 8 billion
	const initialObesityPercentage = 12.5; // Initial obesity percentage

	const [value, setValue] = useState(initialObesityPercentage);

	useEffect(() => {
		const updateInterval = 1000; // Update every second
		const annualGrowthRate = 2.3 / 100; // 2.3% annual growth rate

		const updateProgress = () => {
			const newValue = value + (annualGrowthRate / (365 * 24 * 60 * 60)) * updateInterval;
			setValue(newValue > 100 ? 100 : newValue);
		};

		const interval = setInterval(updateProgress, updateInterval);
		return () => clearInterval(interval);
	}, [value]);

	return (
		<div className="select-none flex h-[24px] min-w-full items-center justify-between dark:text-white text-slate-400 bg-white dark:bg-black border-t border-slate-100 dark:border-slate-800">
			<p className="text-xs text-slate-400 dark:text-slate-100">
				Created by {" "}
				<span className="font-bold"><a href="https://x.com/parkerrex">Parker {" "}</a></span>
				as research for {" "}
				<span className="font-bold"><a href="https://mapthemap.com">Map</a></span>
			</p>
			<div className="flex items-center pr-2 space-x-2">
				<Earth className="w-4 h-4 text-slate-400 dark:text-slate-100" />
				<p className="text-xs text-slate-400 dark:text-slate-100">
					Global obesity
				</p>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>
							<div className="w-64">
								<Progress value={value} />
							</div>
						</TooltipTrigger>
						<TooltipContent>
							<p>{value.toFixed(2)}%</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>
		</div>
	);
}
