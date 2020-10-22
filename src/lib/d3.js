import * as d3 from 'd3';

d3.selection.prototype.appendSelect = function(querySelector) {
  // Test querySlector w/ classes
  if (!/^[a-zA-Z]+[0-9]?\.-?[_a-zA-Z][_a-zA-Z0-9.-]*[a-zA-Z0-9]*$/.test(querySelector)) {
    // Test querySelector just an element
    if (!/^[a-zA-Z]+[0-9]?$/.test(querySelector)) {
      throw new Error(`Invalid query selector passed to appendSelect. Must be an element with zero or more classes: "div.myClass.another". Got "${querySelector}".`);
    }
  }
  const element = querySelector.split('.')[0];
  const classes = querySelector.split('.').slice(1);

  let selection = this.select(querySelector);
  if (!selection.empty()) return selection;

  selection = this.append(element);
  classes.forEach(cls => selection.classed(cls, true));

  return selection;
};

export default d3;
