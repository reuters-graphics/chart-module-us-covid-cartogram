import React, { useEffect, useState } from 'react';

import Chart from '../lib/chart.js';
import ChartContainer from './furniture/ChartContainer';
import { base } from '@reuters-graphics/style-color/dist/categorical';
import debounce from 'lodash/debounce';

// import data from './defaultData.json';

const ChartComponent = () => {
  const [width, setWidth] = useState('');
  const [parameter, setParameter] = useState('cases');
  const [uniformScale, setUniformScale] = useState(true);
  const [data, setData] = useState(null);
  // Create some chart props you want to change

  const chartContainer = React.createRef();

  // Create a new instance of our chart
  const chart = new Chart();

  useEffect(() => {
    fetch('https://graphics.thomsonreuters.com/data/2020/covid-us-states/data.json')
      .then(r => r.json())
      .then(data => setData(data));
  }, []);

  // This will run every time we change our chart props.
  useEffect(() => {
    if (!data) return;
    // USE OUR CHART!
    chart
      .selection(chartContainer.current)
      .data([data])
      .props({
        parameter,
        uniformScale,
      })
      .draw();

    // setTimeout(() => {
    //   console.log('running');
    //   chart
    //     .props({ uniformScale: true })
    //     .draw();
    // }, 1000);
  }, [chart, chartContainer, data, parameter, uniformScale]);

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
      <div className='options'>
        <button
          onClick={() => setParameter('cases')}
        >Cases
        </button>
        <button
          onClick={() => setParameter('deaths')}
        >Deaths
        </button>
        <button
          onClick={() => setUniformScale(false)}
        >Adjusted Scale
        </button>
        <button
          onClick={() => setUniformScale(true)}
        >Uniform Scale
        </button>
      </div>
    </ChartContainer>
  );
};

export default ChartComponent;
