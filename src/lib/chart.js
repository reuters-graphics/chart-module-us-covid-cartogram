import ChartComponent from './base/ChartComponent';
import D3Locale from '@reuters-graphics/d3-locale';
import d3 from './d3';

class USStateCartogram extends ChartComponent {
  defaultProps = {
    stroke: '#888',
    strokeWidth: 1.5,
    fill: 'rgba(255, 255, 255, 0.3)',
    height: 600,
    avg_days: 7,
    bars: true,
    paddingX: 5,
    paddingY: 5,
    paddingTitle: 2,
    mobileWidth: 650,

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

    stateGridLookup: { '7-1': 'AK', '6-6': 'AL', '5-4': 'AR', '5-1': 'AZ', '4-0': 'CA', '4-2': 'CO', '3-9': 'CT', '5-10': 'DC', '4-9': 'DE', '7-8': 'FL', '6-7': 'GA', '7-0': 'HI', '3-4': 'IA', '2-1': 'ID', '2-5': 'IL', '3-5': 'IN', '5-3': 'KS', '4-5': 'KY', '6-4': 'LA', '2-9': 'MA', '4-8': 'MD', '0-10': 'ME', '2-6': 'MI', '2-4': 'MN', '4-4': 'MO', '6-5': 'MS', '2-2': 'MT', '5-6': 'NC', '2-3': 'ND', '4-3': 'NE', '1-10': 'NH', '3-8': 'NJ', '5-2': 'NM', '3-1': 'NV', '2-8': 'NY', '3-6': 'OH', '6-3': 'OK', '3-0': 'OR', '3-7': 'PA', '3-10': 'RI', '5-7': 'SC', '3-3': 'SD', '5-5': 'TN', '7-3': 'TX', '4-1': 'UT', '4-7': 'VA', '1-9': 'VT', '2-0': 'WA', '1-5': 'WI', '4-6': 'WV', '3-2': 'WY', '7-10': 'PR' },
  };

  draw() {
    const downArrow = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-down" class="svg-inline--fa fa-caret-down fa-w-10 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path></svg>';
    const upArrow = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-up" class="svg-inline--fa fa-caret-up fa-w-10 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M288.662 352H31.338c-17.818 0-26.741-21.543-14.142-34.142l128.662-128.662c7.81-7.81 20.474-7.81 28.284 0l128.662 128.662c12.6 12.599 3.676 34.142-14.142 34.142z"></path></svg>';

    const props = this.props();
    const locale = new D3Locale(props.locale);
    const dateFormat = locale.formatTime('%b. %d');
    const numberFormat = locale.format(',');
    if (props.parameter === 'cases' || props.parameter === 'deaths') {
      const data = this.data()[0];
      const node = this.selection().node();
      let max = 0;
      const timeParse = d3.utcParse('%Y-%m-%dT%H:%M:%S.%LZ');
      for (var key of Object.keys(data.states)) {
        data.states[key].max = d3.max(data.states[key][props.parameter]);
        // if (data.states[key].max > max) {
        //   max = data.states[key].max;
        // }
        data.states[key].avg = [];
        data.states[key][props.parameter].reverse().forEach(function(d, i) {
          data.states[key].avg.push(d3.mean(data.states[key][props.parameter].slice(i, (i + props.avg_days)), d => d < 0 ? 0 : d));
        });
        data.states[key].avg.reverse();
        data.states[key][props.parameter].reverse();

        // Use max of average
        const maxAvg = d3.max(data.states[key].avg);
        if (maxAvg > max) max = maxAvg;

        data.states[key].sortOrder = data.states[key].percentOfPeak[props.parameter];
      }

      props.stAbbr.sort(function(a, b) {
        if (data.states[a].sortOrder < data.states[b].sortOrder) {
          return 1;
        }
        if (data.states[a].sortOrder > data.states[b].sortOrder) {
          return -1;
        }
        return 0;
      });

      if (!data.series[0].getMonth) {
        for (var i = 0; i < data.series.length; i++) {
          data.series[i] = timeParse(data.series[i]);
        }
      }

      const { width } = node.getBoundingClientRect();

      const transition = d3.transition()
        .duration(250);

      let divisor = width < props.mobileWidth ? 5 : 11;
      divisor = width < 300 ? 4 : divisor;
      const smallW = width / divisor;
      const statePosition = {};
      const grid = createGrid();
      let rows = Math.floor(grid.length / divisor) + 1;
      if (width < props.mobileWidth) {
        rows = rows + 1;
      }
      const smallH = (props.height - props.margin.top) / (rows - 1);

      const scaleXTime = d3.scaleTime()
        .domain(d3.extent(data.series))
        .range([0, smallW - props.paddingX]);

      const inverseX = d3.scaleLinear()
        .domain([0, smallW]);

      const scaleY = d3.scaleLinear();
      if (props.uniformScale) {
        scaleY.domain([0, max])
          .range([smallH * 0.90 - 5, (smallH * 0.25) + props.paddingTitle]);
      } else {
        scaleY.domain([0, 1])
          .range([smallH * 0.90 - 5, (smallH * 0.25) + props.paddingTitle]);
      }

      const line = d3.line()
        .x((d, i) => scaleXTime(data.series[i]))
        .y((d, i) => scaleY(d || 0))
        .curve(d3.curveMonotoneX);

      // const area = d3.area()
      //   .x((d, i) => scaleXTime(data.series[i]))
      //   .y1((d, i) => scaleY(d))
      //   .y0(scaleY(0))
      //   .curve(d3.curveStep);

      const g = this.selection()
        .appendSelect('svg') // see docs in ./utils/d3.js
        .attr('width', width)
        .attr('height', props.height)
        .appendSelect('g')
        .attr('transform', `translate(${props.margin.left}, ${props.margin.top})`);

      const statesG = g.selectAll('.state')
        .data(props.stAbbr, d => d);

      statesG
        .enter()
        .appendSelect('g')
        .attr('class', (st) => {
          return `state ${st}`;
        })
        .merge(statesG)
        .attr('transform', (st) => {
          const left = statePosition[st].column * smallW;
          const top = statePosition[st].row * smallH;
          return `translate(${left}, ${top})`;
        });

      // stateGCon.appendSelect('path.area')
      //   .style('fill', props.fill)
      //   .attr('d', (d) => {
      //     if (props.uniformScale) {
      //       return area(data.states[d][props.parameter]);
      //     } else {
      //       return area(data.states[d][props.parameter].map(e => e / data.states[d].max));
      //     }
      //   });

      statesG.appendSelect('path.line')
        .style('stroke', props.stroke)
        .style('stroke-width', props.strokeWidth)
        .style('fill', 'none')
        .transition(transition)
        .attr('d', (d) => {
          if (props.uniformScale) {
            return line(data.states[d].avg);
          } else {
            return line(data.states[d].avg.map(e => e / d3.max(data.states[d].avg)));
          }
        });

      statesG.exit()
        .transition(transition)
        .remove();

      const touchBox = statesG
        .appendSelect('g.dummy-container')
        .appendSelect('rect')
        .attr('height', smallH)
        .attr('width', smallW)
        .style('cursor', 'crosshair')
        .style('opacity', 0);

      touchBox.on('mouseover mousemove touchenter touchstart touchmove', (d, i, nodes) => {
        if (!d3.event) return;
        this.selection().selectAll('.tooltip').remove();
        const parent = nodes[i].parentNode;
        const mx = d3.mouse(parent)[0];
        inverseX.range([0, data.states[d].avg.length + props.avg_days]);
        let index = Math.round(inverseX(mx));
        index = index < 0 ? 0 : index >= data.states[d].avg.length ? data.states[d].avg.length - 1 : index;
        const datum = data.states[d].avg[index];
        const datumY = props.uniformScale ?
          datum : datum / d3.max(data.states[d].avg);
        const date = data.series[index];
        const x = scaleXTime(date);
        const y = scaleY(datumY);
        d3.select(parent).appendSelect('circle.tooltip')
          .attr('r', 3)
          .attr('cx', x)
          .attr('cy', y)
          .style('fill', 'white')
          .style('stroke', 'white')
          .style('stroke-width', 1);

        d3.select(parent).appendSelect('text.tooltip.datum')
          .attr('x', x)
          .attr('y', y < scaleY.range()[1] / 2 ? y + 20 : y - 7)
          .style('text-align', 'center')
          .style('text-anchor', x > smallW / 2 ? 'end' : 'start')
          .text(numberFormat(Math.round(datum)));

        d3.select(parent).appendSelect('text.tooltip.date')
          .attr('x', x)
          .attr('y', scaleY.range()[0] + 13)
          .text(dateFormat(date))
          .style('text-anchor', x > smallW / 2 ? 'end' : 'start');
      });

      touchBox.on('mouseout touchleave touchcancel', (d, i, nodes) => {
        const parent = nodes[i].parentNode;
        d3.select(parent).selectAll('.tooltip').remove();
      });

      const stateNamesContainer = this.selection()
        .appendSelect('div.name-container');

      const stateNames = stateNamesContainer.selectAll('.state-name')
        .data(props.stAbbr);

      stateNames.enter()
        .append('div')
        .attr('class', 'state-name')
        .merge(stateNames)
        .classed('bold', d => data.states[d].percentOfPeak[props.parameter] >= 0.9)
        .style('top', function(d) {
          const top = statePosition[d].row * smallH;
          return `${top + props.paddingY}px`;
        })
        .style('left', function(d) {
          const left = statePosition[d].column * smallW;
          return `${left}px`;
        })
        .html(d => `${getArrow(data.states[d].avg)} <p>${data.states[d].stateAP}</p>`);

      function getArrow(numbers) {
        const latest = numbers[numbers.length - 1];
        const previousWeek = numbers[numbers.length - 8];
        const weekBefore = numbers[numbers.length - 15];
        if (latest > previousWeek && previousWeek > weekBefore) {
          return upArrow;
        } else if (latest < previousWeek && previousWeek < weekBefore) {
          return downArrow;
        } else {
          return '';
        }
      }

      function createGrid() {
        const gridArr = [];
        let row = -1;
        if (width >= props.mobileWidth) {
          for (let i = 0; i < 88; i++) {
            const column = i % 11;
            row = column === 0 ? row + 1 : row;

            const obj = {
              row: row,
              column: column,
              st: props.stateGridLookup[`${row}-${column}`] ?
                props.stateGridLookup[`${row}-${column}`] :
                null,
            };

            gridArr.push(obj);

            const st = props.stateGridLookup[`${row}-${column}`] ?
              props.stateGridLookup[`${row}-${column}`] :
              null;

            if (st) {
              statePosition[st] = obj;
            }
          }
        } else {
          for (var i = 0; i < props.stAbbr.length; i++) {
            const column = i % divisor;
            row = column == 0 ? row + 1 : row;

            const obj = {
              row: row,
              column: column,
              st: props.stAbbr[i],
            };

            gridArr.push(obj);

            statePosition[props.stAbbr[i]] = obj;
          }
        }
        return gridArr;
      }
      return this;
    }
  }
}

export default USStateCartogram;
