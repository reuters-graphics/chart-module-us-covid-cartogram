import 'd3-appendselect';

import * as d3 from 'd3';

import ChartComponent from './base/ChartComponent';

class USStateCartogram extends ChartComponent {
  defaultProps = {
    stroke: '#eec331',
    strokeWidth: 1,
    fill: 'rgba(255, 255, 255, 0.3)',
    height: 500,
    avg_days: 7,
    bars: true,
    uniformScale: false,
    margin: {
      left: 0, right: 0, top: 10, bottom: 0,
    },
    locale: 'en',
    parameter: 'cases',
    chart_formats: {
      // Format number for axis
      number: '~s',

      // Format number for tooltip
      number_tooltip: ', ',

      // Date on tooltip
      date_tooltip: '%B %e',

      // Date format for the x axis
      date: '%b %e',
    },
    stAbbr: [
      'AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY',
    ],

    stateGridLookup: { '7-1': 'AK', '6-6': 'AL', '5-4': 'AR', '5-1': 'AZ', '4-0': 'CA', '4-2': 'CO', '3-9': 'CT', '5-10': 'DC', '4-9': 'DE', '7-8': 'FL', '6-7': 'GA', '7-0': 'HI', '3-4': 'IA', '2-1': 'ID', '2-5': 'IL', '3-5': 'IN', '5-3': 'KS', '4-5': 'KY', '6-4': 'LA', '2-9': 'MA', '4-8': 'MD', '0-10': 'ME', '2-6': 'MI', '2-4': 'MN', '4-4': 'MO', '6-5': 'MS', '2-2': 'MT', '5-6': 'NC', '2-3': 'ND', '4-3': 'NE', '1-10': 'NH', '3-8': 'NJ', '5-2': 'NM', '3-1': 'NV', '2-8': 'NY', '3-6': 'OH', '6-3': 'OK', '3-0': 'OR', '3-7': 'PA', '3-10': 'RI', '5-7': 'SC', '3-3': 'SD', '5-5': 'TN', '7-3': 'TX', '4-1': 'UT', '4-7': 'VA', '1-9': 'VT', '2-0': 'WA', '1-5': 'WI', '4-6': 'WV', '3-2': 'WY', '7-10': 'PR', },
  };

  draw() {
    const data = this.data()[0];
    const props = this.props();
    const node = this.selection().node();
    let max = 0;
    const timeParse = d3.utcParse('%Y-%m-%dT%H:%M:%S.%LZ');
    for (var key of Object.keys(data.states)) {
      data.states[key].max = d3.max(data.states[key][props.parameter])
      if (data.states[key].max > max) {
        max = data.states[key].max;
      }
      data.states[key].avg = [];
      data.states[key][props.parameter].reverse().forEach(function(d,i) {
        data.states[key].avg.push(d3.mean(data.states[key][props.parameter].slice(i, (i + props.avg_days)), d => d < 0 ? 0 : d))
      });
      data.states[key].avg = data.states[key].avg.reverse()
      data.states[key][props.parameter] = data.states[key][props.parameter].reverse()
    }

    if (!data.series[0].getMonth) {
      for (var i = 0; i < data.series.length; i++) {
        data.series[i] = timeParse(data.series[i]);
      }
    }

    const { width } = node.getBoundingClientRect();

    const transition = d3.transition()
      .duration(750);

    const divisor = width < 600 ? 6 : 11;
    const smallW = width / divisor;
    const statePosition = {};
    const grid = createGrid();
    const rows = Math.floor(grid.length / divisor) + 1;
    const smallH = (props.height-props.margin.top) / (rows - 1)

    const scaleXTime = d3.scaleTime()
      .domain(d3.extent(data.series))
      .range([0, smallW-8]);

    const scaleYAbs = d3.scaleLinear()
      .domain([0, max])
      .range([smallH, -smallH]);

    const line = d3.line()
      .x((d, i) => scaleXTime(data.series[i]))
      .y((d, i) => scaleYAbs(d ? d : 0))
      .curve(d3.curveMonotoneX);

    const area = d3.area()
      .x((d, i) => scaleXTime(data.series[i]))
      .y1((d, i) => scaleYAbs(d))
      .y0(scaleYAbs(0))
      .curve(d3.curveStep);

    const g = this.selection()
      .appendSelect('svg') // see docs in ./utils/d3.js
      .attr('width', width)
      .attr('height', props.height)
      .appendSelect('g')
      .attr('transform', `translate(${props.margin.left}, ${props.margin.top})`);

    const statesG = g.appendSelect('g.states-g')
      .selectAll('.state')
      .data(props.stAbbr)
      .enter()
      .appendSelect('g')
      .attr('class', (st) => {
        return `state ${st}`;
      });

    statesG.attr('transform', (st) => {
      const left = statePosition[st].column * smallW;
      const top = statePosition[st].row * smallH;

      return `translate(${left},${top})`;
    });

    statesG.appendSelect('path.area')
      .style('fill', props.fill)
      .attr('d', (d) => {
        return area(data.states[d][props.parameter])
      });

    statesG.appendSelect('path.line')
      .style('stroke', props.stroke)
      .style('stroke-width', props.strokeWidth)
      .style('fill', 'none')
      .attr('d', (d) => {
        return line(data.states[d].avg);
      });

    statesG.appendSelect('text.state-name')
      .attr('transform', 'translate(0,20)')
      .text(d => (data.states[d].stateAP));

    function createGrid() {
      const gridArr = [];
      let row = -1;
      for (let i = 0; i < 88; i++) {
        const column = i % 11;
        row = column === 0 ? row + 1 : row;

        const obj = {
          row: row,
          column: column,
          st: props.stateGridLookup[`${row}-${column}`]
            ? props.stateGridLookup[`${row}-${column}`]
            : null,
        };

        gridArr.push(obj);

        const st = props.stateGridLookup[`${row}-${column}`]
          ? props.stateGridLookup[`${row}-${column}`]
          : null;

        if (st) {
          statePosition[st] = obj;
        }
      }
      return gridArr;
    }
    return this;
  }
}

export default USStateCartogram;
