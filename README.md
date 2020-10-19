![](./badge.svg)

# USStateCartogram

### Install

```
$ yarn add https://github.com/reuters-graphics/chart-module-usstatecartogram.git
```

### Use

```javascript
import USStateCartogram from '@reuters-graphics/chart-module-us-covid-cartogram';

const myChart = new USStateCartogram();

// To create your chart, pass a selector string to the chart's selection method,
// as well as any props or data to their respective methods. Then call draw.
myChart
  .selection('#chart')
  .data([data])
  // same as format on 

  // https://graphics.thomsonreuters.com/data/2020/covid-us-states/data.json

  // wrap the whole data in an array [{series: .... , states: ....}]
  .props({
    // line stroke
    stroke: '#eec331', 
    // line stroke width
    strokeWidth: 1,
    // bar fill
    fill: 'rgba(255, 255, 255, 0.3)',
    // height
    height: 600,
    // avg days
    avg_days: 7,
    // padding x in grid
    paddingX: 5,
    // padding y in grid
    paddingY: 5,
    // set to true if you want a uniform scale across states
    uniformScale: false,
    // margins
    margin: {
      left: 0, right: 0, top: 10, bottom: 0,
    },
    // locale
    locale: 'en',
    // cases or deaths
    parameter: 'cases',
    // break point for mobile chart
    mobileWidth: 650,
    // array of states
    stAbbr: [
      'AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY',
    ],
    // cartogram position for states
    stateGridLookup: { '7-1': 'AK', '6-6': 'AL', '5-4': 'AR', '5-1': 'AZ', '4-0': 'CA', '4-2': 'CO', '3-9': 'CT', '5-10': 'DC', '4-9': 'DE', '7-8': 'FL', '6-7': 'GA', '7-0': 'HI', '3-4': 'IA', '2-1': 'ID', '2-5': 'IL', '3-5': 'IN', '5-3': 'KS', '4-5': 'KY', '6-4': 'LA', '2-9': 'MA', '4-8': 'MD', '0-10': 'ME', '2-6': 'MI', '2-4': 'MN', '4-4': 'MO', '6-5': 'MS', '2-2': 'MT', '5-6': 'NC', '2-3': 'ND', '4-3': 'NE', '1-10': 'NH', '3-8': 'NJ', '5-2': 'NM', '3-1': 'NV', '2-8': 'NY', '3-6': 'OH', '6-3': 'OK', '3-0': 'OR', '3-7': 'PA', '3-10': 'RI', '5-7': 'SC', '3-3': 'SD', '5-5': 'TN', '7-3': 'TX', '4-1': 'UT', '4-7': 'VA', '1-9': 'VT', '2-0': 'WA', '1-5': 'WI', '4-6': 'WV', '3-2': 'WY', '7-10': 'PR', },})
  .draw();

// You can call any method again to update the chart.
myChart
  .data([3, 4, 5])
  .draw();

// Or just call the draw function alone, which is useful for resizing the chart.
myChart.draw();
```

To apply this chart's default styles when using SCSS, simply define the variable `$USStateCartogram-container` to represent the ID or class of the chart's container(s) and import the `_chart.scss` partial.

```CSS
$USStateCartogram-container: '#chart';

@import '~@reuters-graphics/chart-module-us-covid-cartogram/scss/main';
```

## Developing chart modules

Read more in the [DEVELOPING docs](./DEVELOPING.md) about how to write your chart module.
