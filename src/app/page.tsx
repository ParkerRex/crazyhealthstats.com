
"use client"
import React, { useEffect, useState } from "react";
import LineChartHero from "@/components/LineChart";
import { parseCSV } from "@/lib/csvParser";

const filePath = '/data/internet_adoption.csv';

export default function Home() {
  const [chartData, setChartData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await parseCSV(filePath);
        const transformedData = {};

        data.forEach((item) => {
          const { Entity: country, Year: year, 'Number of Internet users': users } = item;
          if (!transformedData[year]) {
            transformedData[year] = { date: parseInt(year) };
          }
          transformedData[year][country] = parseFloat(users);
        });

        const formattedData = Object.values(transformedData);
        const countries = Array.from(new Set(data.map(item => item.Entity)));

        setChartData(formattedData);
        setCategories(countries);
      } catch (error) {
        console.error("Error parsing CSV data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="container flex flex-col w-screen h-screen">
      <p>
        We're going to make a simple data visualization in TypeScript using Tremor so that we can maintain our brand consistency across our investor deck and our product.
      </p>
      <LineChartHero data={chartData} categories={categories} legend={false} xAxisLabel="Year" yAxisLabel="Number of Users" />
    </main>
  );
}
