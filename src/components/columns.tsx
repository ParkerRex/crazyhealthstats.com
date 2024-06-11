"use client";

import { useState, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { cn } from "@/lib/utils";
import rawData from "../../public/data/combined-data.json"
const countryData: CountryData[] = rawData as CountryData[];


export type CountryData = {
  country: string;
  population: number;
  populationGrowthRate: number;
  obesity?: number;
  obesityGrowthRate?: number;
  directCosts?: number;
}



export const columns: ColumnDef<CountryData>[] = [
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "population",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Population
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "populationGrowthRate",
    header: "Population Growth Rate",
    cell: ({ getValue }) => {
      const value = getValue() as number;
      const colorClass = value >= 0 ? 'text-green-500' : 'text-red-500';
      const formattedValue = new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 2 }).format(value / 100);
      return <span className={cn(colorClass)}>{formattedValue}</span>;
    }
  },
]

