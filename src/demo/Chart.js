import React, { useEffect, useState } from 'react';

import Chart from '../lib/chart.js';
import ChartContainer from './furniture/ChartContainer';
import { base } from '@reuters-graphics/style-color/dist/categorical';
import debounce from 'lodash/debounce';
import data from './defaultData.json';
const ChartComponent = () => {
  const [width, setWidth] = useState('');
  // Create some chart props you want to change

  const chartContainer = React.createRef();

  // Create a new instance of our chart
  const chart = new Chart();

  // This will run every time we change our chart props.
  useEffect(() => {
    // USE OUR CHART!
    chart
      .selection(chartContainer.current)
      .data([data])
      .draw();
  });

  // // Little showreel...
  // useEffect(() => {
  //   setTimeout(() => {
  //     setData([20, 34, 48, 60]);
  //   }, 1000);
  //   setTimeout(() => {
  //     setData([30, 50, 30]);
  //   }, 2000);
  // }, []);

  // Handle chart resize
  const resize = debounce(() => { chart.draw(); }, 250);

  useEffect(() => {
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [resize]);

  return (
    <ChartContainer width={width} setWidth={(width) => setWidth(width)}>
      {/* This is our chart container 👇 */}
      <div id='chart' ref={chartContainer} />
    </ChartContainer>
  );
};

export default ChartComponent;
