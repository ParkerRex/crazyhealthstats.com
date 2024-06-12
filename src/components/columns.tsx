"use client";

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export type CountryData = {
  country: string;
  population: number;
  populationGrowthRate: number;
  obesityPercentage?: number;
  obesitypop?: number;
  obesityGrowthRate?: number;
  obesityCost?: number;
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
        const now = new Date();
        const startOfYear = new Date(now.getFullYear(), 0, 1);
        const elapsedMs = now.getTime() - startOfYear.getTime();
        const annualChange = row.original.population * row.original.populationGrowthRate;
        const initialPopulation = row.original.population + (annualChange * (elapsedMs / msPerYear));
        setPopulation(initialPopulation);

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
      const formattedValue = new Intl.NumberFormat('en-US', {
        style: 'percent',
        minimumFractionDigits: 2,
        maximumFractionDigits: 4
      }).format(value);
      return <span className={cn(colorClass)}>{formattedValue}</span>;
    }
  },
  {
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
    cell: ({ row }) => {
      const [obesity, setObesity] = useState<number>(row.original.obesitypop || 0);

      useEffect(() => {
        const msPerYear = 31536000000; // milliseconds in a year
        const updateInterval = 500; // update every 500ms
        const now = new Date();
        const startOfYear = new Date(now.getFullYear(), 0, 1);
        const elapsedMs = now.getTime() - startOfYear.getTime();
        const annualChange = (row.original.obesitypop || 0) * (row.original.obesityGrowthRate || 0) / 100;
        const initialObesity = (row.original.obesitypop || 0) + (annualChange * (elapsedMs / msPerYear));
        setObesity(initialObesity);

        const intervalChange = annualChange / (msPerYear / updateInterval);

        const timer = setInterval(() => {
          setObesity(prev => prev + intervalChange);
        }, updateInterval);

        return () => clearInterval(timer);
      }, [row.original.obesitypop, row.original.obesityGrowthRate]);

      return <div className="font-medium">{formatPopulation(obesity)}</div>;
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
        Economic impact
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ getValue }) => {
      const cost = getValue() as number;
      const formatted = cost ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(cost) : "$0";

      return <div className="font-medium">{formatted}</div>;
    },
  }
]
