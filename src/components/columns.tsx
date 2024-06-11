"use client";

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
import { useEffect, useState } from "react";
const countryData: CountryData[] = rawData as CountryData[];


export type CountryData = {
  country: string;
  population: number;
  populationGrowthRate: number;
  obesity?: number;
  obesityGrowthRate?: number;
  directCosts?: number;
}


const formatPopulation = (population: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "decimal",
    maximumFractionDigits: 0,
  }).format(population);
};


export const columns: ColumnDef<CountryData>[] = [
  {
    accessorKey: "country",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Country
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
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
    cell: ({ row }) => {
      const [population, setPopulation] = useState<number>(row.original.population);

      useEffect(() => {
        const msPerYear = 31536000000; // milliseconds in a year
        const updateInterval = 500; // update every 500ms
        // Calculate the total annual change projected
        const annualChange = row.original.population * row.original.populationGrowthRate;
        // Calculate change per 500ms
        const intervalChange = annualChange / (msPerYear / updateInterval);

        const timer = setInterval(() => {
          setPopulation(prev => prev + intervalChange);
        }, updateInterval);

        return () => clearInterval(timer);
      }, [row.original.population, row.original.populationGrowthRate]);

      return <div className="font-medium">{formatPopulation(population)}</div>;
    },
  },
  {
    accessorKey: "populationGrowthRate",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Pop Growth %
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => {
      const value = getValue() as number;
      const colorClass = value >= 0 ? 'text-green-500' : 'text-red-500';
      // Update to format the number to show more decimal places
      const formattedValue = new Intl.NumberFormat('en-US', {
        style: 'decimal',  // Changed from 'percent' to 'decimal' for finer control
        minimumFractionDigits: 4,  // Ensuring four decimal places
        maximumFractionDigits: 6  // You can adjust this based on how fine you want the numbers
      }).format(value);
      return <span className={cn(colorClass)}>{formattedValue}</span>;
    }
  }, {
    accessorKey: "obesitypop",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Obese Population
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => {
      const population = getValue() as number; // Get the population value
      const formatted = new Intl.NumberFormat("en-US", {
        style: "decimal", // Format as decimal
        maximumFractionDigits: 0, // No decimal places
      }).format(population); // Format the population number with commas

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "obesityGrowthRate",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Obesity Growth %
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),

    cell: ({ getValue }) => {
      const value = getValue() as number;
      const colorClass = value >= 0 ? 'text-green-500' : 'text-red-500';
      const formattedValue = new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 2 }).format(value / 100);
      return <span className={cn(colorClass)}>{formattedValue}</span>;
    }
  },
  {
    accessorKey: "obesityCost",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Obesity Cost
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => {
      const cost = getValue() as number;
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0, // No decimal places
      }).format(cost); // Format the population number with commas

      return <div className="font-medium">{formatted}</div>;
    },
  }

]

