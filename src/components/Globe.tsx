   import React, { useEffect, useRef } from 'react';
   import * as d3 from 'd3';
   import { geoOrthographic, geoPath } from 'd3-geo';
   import { feature } from 'topojson-client';
   import worldData from './world-110m.json'; // Ensure you have a TopoJSON file for world map

   interface CountryData {
     name: string;
     percentage: number;
   }

   interface GlobeProps {
     data: CountryData[];
   }

   const Globe: React.FC<GlobeProps> = ({ data }) => {
     const svgRef = useRef<SVGSVGElement | null>(null);

     useEffect(() => {
       const svg = d3.select(svgRef.current);
       const width = 800;
       const height = 800;
       const projection = geoOrthographic().scale(300).translate([width / 2, height / 2]);
       const path = geoPath().projection(projection);

       const colorScale = d3.scaleLinear<string>()
         .domain([0, 70])
         .range(['yellow', 'red']);

       const countries = feature(worldData, worldData.objects.countries).features;

       svg.selectAll('path')
         .data(countries)
         .enter()
         .append('path')
         .attr('d', path)
         .attr('fill', (d: any) => {
           const country = data.find(country => country.name === d.properties.name);
           return country ? colorScale(country.percentage) : '#ccc';
         })
         .attr('stroke', '#000');

       // Add rotation or other interactions as needed
     }, [data]);

     return <svg ref={svgRef} width={800} height={800}></svg>;
   };

   export default Globe;