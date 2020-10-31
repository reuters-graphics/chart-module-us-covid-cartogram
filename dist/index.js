'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var d3 = require('d3');
var merge = _interopDefault(require('lodash/merge'));
var D3Locale = _interopDefault(require('@reuters-graphics/d3-locale'));

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

var ChartError = /*#__PURE__*/function (_Error) {
  _inherits(ChartError, _Error);

  var _super = _createSuper(ChartError);

  function ChartError() {
    var _this;

    var constructorName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Chart component';

    _classCallCheck(this, ChartError);

    _this = _super.call(this, constructorName);
    _this.constructorName = constructorName;
    _this.name = 'ChartComponentError';
    return _this;
  }

  return ChartError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
var ErrorDrawMethodUndefined = /*#__PURE__*/function (_ChartError) {
  _inherits(ErrorDrawMethodUndefined, _ChartError);

  var _super2 = _createSuper(ErrorDrawMethodUndefined);

  function ErrorDrawMethodUndefined() {
    var _this2;

    _classCallCheck(this, ErrorDrawMethodUndefined);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this2 = _super2.call.apply(_super2, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this2), "message", "".concat(_this2.constructorName, " should have a draw method"));

    return _this2;
  }

  return ErrorDrawMethodUndefined;
}(ChartError);
var ErrorSelectorType = /*#__PURE__*/function (_ChartError2) {
  _inherits(ErrorSelectorType, _ChartError2);

  var _super3 = _createSuper(ErrorSelectorType);

  function ErrorSelectorType() {
    var _this3;

    _classCallCheck(this, ErrorSelectorType);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this3 = _super3.call.apply(_super3, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this3), "message", "".concat(_this3.constructorName, " selector should be a DOM Element or selector string"));

    return _this3;
  }

  return ErrorSelectorType;
}(ChartError);
var ErrorPropsType = /*#__PURE__*/function (_ChartError3) {
  _inherits(ErrorPropsType, _ChartError3);

  var _super4 = _createSuper(ErrorPropsType);

  function ErrorPropsType() {
    var _this4;

    _classCallCheck(this, ErrorPropsType);

    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    _this4 = _super4.call.apply(_super4, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this4), "message", "".concat(_this4.constructorName, " props should be an Object"));

    return _this4;
  }

  return ErrorPropsType;
}(ChartError);
var ErrorDataType = /*#__PURE__*/function (_ChartError4) {
  _inherits(ErrorDataType, _ChartError4);

  var _super5 = _createSuper(ErrorDataType);

  function ErrorDataType() {
    var _this5;

    _classCallCheck(this, ErrorDataType);

    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    _this5 = _super5.call.apply(_super5, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this5), "message", "".concat(_this5.constructorName, " data should be an Array"));

    return _this5;
  }

  return ErrorDataType;
}(ChartError);

d3.selection.prototype.appendSelect = function (querySelector) {
  // Test querySlector w/ classes
  if (!/^[a-zA-Z]+[0-9]?\.-?[_a-zA-Z][_a-zA-Z0-9.-]*[a-zA-Z0-9]*$/.test(querySelector)) {
    // Test querySelector just an element
    if (!/^[a-zA-Z]+[0-9]?$/.test(querySelector)) {
      throw new Error("Invalid query selector passed to appendSelect. Must be an element with zero or more classes: \"div.myClass.another\". Got \"".concat(querySelector, "\"."));
    }
  }

  var element = querySelector.split('.')[0];
  var classes = querySelector.split('.').slice(1);
  var selection = this.select(querySelector);
  if (!selection.empty()) return selection;
  selection = this.append(element);
  classes.forEach(function (cls) {
    return selection.classed(cls, true);
  });
  return selection;
};

var ChartComponent = /*#__PURE__*/function () {
  function ChartComponent(selector, props, data) {
    _classCallCheck(this, ChartComponent);

    _defineProperty(this, "defaultProps", {});

    _defineProperty(this, "defaultData", []);

    this.selection(selector);
    this.props(props);
    this.data(data);
  }
  /**
   * Getter/setter for DOM node chart is drawn into
   * @param  {String or Element} selector
   */


  _createClass(ChartComponent, [{
    key: "selection",
    value: function selection(selector) {
      if (!selector) return this._selection;

      if (!(selector instanceof Element) && typeof selector !== 'string') {
        throw new ErrorSelectorType(this.constructor.name);
      }

      this._selection = d3.select(selector);
      return this;
    }
    /**
     * Default props
     * @type {Object}
     */

  }, {
    key: "props",

    /**
     * Getter/setter for props object
     * @param  {Object} obj props
     */
    value: function props(obj) {
      if (!obj) return this._props || this.defaultProps;

      if (!(obj instanceof Object)) {
        throw new ErrorPropsType(this.constructor.name);
      }

      this._props = merge(this._props || this.defaultProps, obj);
      return this;
    }
    /**
     * Default data
     * @type {Array}
     */

  }, {
    key: "data",

    /**
     * Getter/setter for chart data
     * @param  {Array} arr data
     */
    value: function data(arr) {
      if (!arr) return this._data || this.defaultData;

      if (!(arr instanceof Array)) {
        throw new ErrorDataType(this.constructor.name);
      }

      this._data = arr;
      return this;
    }
  }, {
    key: "draw",
    value: function draw() {
      throw new ErrorDrawMethodUndefined(this.constructor.name);
    }
  }]);

  return ChartComponent;
}();

var USStateCartogram = /*#__PURE__*/function (_ChartComponent) {
  _inherits(USStateCartogram, _ChartComponent);

  var _super = _createSuper(USStateCartogram);

  function USStateCartogram() {
    var _this;

    _classCallCheck(this, USStateCartogram);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "defaultProps", {
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
        left: 0,
        right: 0,
        top: 10,
        bottom: 0
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
        date: '%b %e'
      },
      stAbbr: ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY'],
      stateGridLookup: {
        '7-1': 'AK',
        '6-6': 'AL',
        '5-4': 'AR',
        '5-1': 'AZ',
        '4-0': 'CA',
        '4-2': 'CO',
        '3-9': 'CT',
        '5-10': 'DC',
        '4-9': 'DE',
        '7-8': 'FL',
        '6-7': 'GA',
        '7-0': 'HI',
        '3-4': 'IA',
        '2-1': 'ID',
        '2-5': 'IL',
        '3-5': 'IN',
        '5-3': 'KS',
        '4-5': 'KY',
        '6-4': 'LA',
        '2-9': 'MA',
        '4-8': 'MD',
        '0-10': 'ME',
        '2-6': 'MI',
        '2-4': 'MN',
        '4-4': 'MO',
        '6-5': 'MS',
        '2-2': 'MT',
        '5-6': 'NC',
        '2-3': 'ND',
        '4-3': 'NE',
        '1-10': 'NH',
        '3-8': 'NJ',
        '5-2': 'NM',
        '3-1': 'NV',
        '2-8': 'NY',
        '3-6': 'OH',
        '6-3': 'OK',
        '3-0': 'OR',
        '3-7': 'PA',
        '3-10': 'RI',
        '5-7': 'SC',
        '3-3': 'SD',
        '5-5': 'TN',
        '7-3': 'TX',
        '4-1': 'UT',
        '4-7': 'VA',
        '1-9': 'VT',
        '2-0': 'WA',
        '1-5': 'WI',
        '4-6': 'WV',
        '3-2': 'WY',
        '7-10': 'PR'
      }
    });

    return _this;
  }

  _createClass(USStateCartogram, [{
    key: "draw",
    value: function draw() {
      var _this2 = this;

      var downArrow = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-down" class="svg-inline--fa fa-caret-down fa-w-10 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path></svg>';
      var upArrow = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-up" class="svg-inline--fa fa-caret-up fa-w-10 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M288.662 352H31.338c-17.818 0-26.741-21.543-14.142-34.142l128.662-128.662c7.81-7.81 20.474-7.81 28.284 0l128.662 128.662c12.6 12.599 3.676 34.142-14.142 34.142z"></path></svg>';
      var props = this.props();
      var locale = new D3Locale(props.locale);
      var dateFormat = locale.formatTime('%b. %d');
      var numberFormat = locale.format(',');

      if (props.parameter === 'cases' || props.parameter === 'deaths') {
        var key;
        var i;

        var _ret = function () {
          var getArrow = function getArrow(numbers) {
            var latest = numbers[numbers.length - 1];
            var previousWeek = numbers[numbers.length - 8];
            var weekBefore = numbers[numbers.length - 15];

            if (latest > previousWeek && previousWeek > weekBefore) {
              return upArrow;
            } else if (latest < previousWeek && previousWeek < weekBefore) {
              return downArrow;
            } else {
              return '';
            }
          };

          var createGrid = function createGrid() {
            var gridArr = [];
            var row = -1;

            if (width >= props.mobileWidth) {
              for (var _i2 = 0; _i2 < 88; _i2++) {
                var column = _i2 % 11;
                row = column === 0 ? row + 1 : row;
                var obj = {
                  row: row,
                  column: column,
                  st: props.stateGridLookup["".concat(row, "-").concat(column)] ? props.stateGridLookup["".concat(row, "-").concat(column)] : null
                };
                gridArr.push(obj);
                var st = props.stateGridLookup["".concat(row, "-").concat(column)] ? props.stateGridLookup["".concat(row, "-").concat(column)] : null;

                if (st) {
                  statePosition[st] = obj;
                }
              }
            } else {
              for (var i = 0; i < props.stAbbr.length; i++) {
                var _column = i % divisor;

                row = _column == 0 ? row + 1 : row;
                var _obj = {
                  row: row,
                  column: _column,
                  st: props.stAbbr[i]
                };
                gridArr.push(_obj);
                statePosition[props.stAbbr[i]] = _obj;
              }
            }

            return gridArr;
          };

          var data = _this2.data()[0];

          var node = _this2.selection().node();

          var max = 0;
          var timeParse = d3.utcParse('%Y-%m-%dT%H:%M:%S.%LZ');

          for (var _i = 0, _Object$keys = Object.keys(data.states); _i < _Object$keys.length; _i++) {
            key = _Object$keys[_i];
            data.states[key].max = d3.max(data.states[key][props.parameter]); // if (data.states[key].max > max) {
            //   max = data.states[key].max;
            // }

            data.states[key].avg = [];
            data.states[key][props.parameter].reverse().forEach(function (d, i) {
              data.states[key].avg.push(d3.mean(data.states[key][props.parameter].slice(i, i + props.avg_days), function (d) {
                return d < 0 ? 0 : d;
              }));
            });
            data.states[key].avg.reverse();
            data.states[key][props.parameter].reverse(); // Use max of average

            var maxAvg = d3.max(data.states[key].avg);
            if (maxAvg > max) max = maxAvg;
            data.states[key].sortOrder = data.states[key].percentOfPeak[props.parameter];
          }

          props.stAbbr.sort(function (a, b) {
            if (data.states[a].sortOrder < data.states[b].sortOrder) {
              return 1;
            }

            if (data.states[a].sortOrder > data.states[b].sortOrder) {
              return -1;
            }

            return 0;
          });

          if (!data.series[0].getMonth) {
            for (i = 0; i < data.series.length; i++) {
              data.series[i] = timeParse(data.series[i]);
            }
          }

          var _node$getBoundingClie = node.getBoundingClientRect(),
              width = _node$getBoundingClie.width;

          var transition = d3.transition().duration(250);
          var divisor = width < props.mobileWidth ? 5 : 11;
          divisor = width < 300 ? 4 : divisor;
          var smallW = width / divisor;
          var statePosition = {};
          var grid = createGrid();
          var rows = Math.floor(grid.length / divisor) + 1;

          if (width < props.mobileWidth) {
            rows = rows + 1;
          }

          var smallH = (props.height - props.margin.top) / (rows - 1);
          var scaleXTime = d3.scaleTime().domain(d3.extent(data.series)).range([0, smallW - props.paddingX]);
          var inverseX = d3.scaleLinear().domain([0, smallW]);
          var scaleY = d3.scaleLinear();

          if (props.uniformScale) {
            scaleY.domain([0, max]).range([smallH * 0.90 - 5, smallH * 0.25 + props.paddingTitle]);
          } else {
            scaleY.domain([0, 1]).range([smallH * 0.90 - 5, smallH * 0.25 + props.paddingTitle]);
          }

          var line = d3.line().x(function (d, i) {
            return scaleXTime(data.series[i]);
          }).y(function (d, i) {
            return scaleY(d || 0);
          }).curve(d3.curveMonotoneX); // const area = d3.area()
          //   .x((d, i) => scaleXTime(data.series[i]))
          //   .y1((d, i) => scaleY(d))
          //   .y0(scaleY(0))
          //   .curve(d3.curveStep);

          var g = _this2.selection().appendSelect('svg') // see docs in ./utils/d3.js
          .attr('width', width).attr('height', props.height).appendSelect('g').attr('transform', "translate(".concat(props.margin.left, ", ").concat(props.margin.top, ")"));

          var statesG = g.selectAll('.state').data(props.stAbbr, function (d) {
            return d;
          });
          statesG.enter().appendSelect('g').attr('class', function (st) {
            return "state ".concat(st);
          }).merge(statesG).attr('transform', function (st) {
            var left = statePosition[st].column * smallW;
            var top = statePosition[st].row * smallH;
            return "translate(".concat(left, ", ").concat(top, ")");
          }); // stateGCon.appendSelect('path.area')
          //   .style('fill', props.fill)
          //   .attr('d', (d) => {
          //     if (props.uniformScale) {
          //       return area(data.states[d][props.parameter]);
          //     } else {
          //       return area(data.states[d][props.parameter].map(e => e / data.states[d].max));
          //     }
          //   });

          statesG.appendSelect('path.line').style('stroke', props.stroke).style('stroke-width', props.strokeWidth).style('fill', 'none').transition(transition).attr('d', function (d) {
            if (props.uniformScale) {
              return line(data.states[d].avg);
            } else {
              return line(data.states[d].avg.map(function (e) {
                return e / d3.max(data.states[d].avg);
              }));
            }
          });
          statesG.exit().transition(transition).remove();
          var touchBox = statesG.appendSelect('g.dummy-container').appendSelect('rect').attr('height', smallH).attr('width', smallW).style('cursor', 'crosshair').style('opacity', 0);
          touchBox.on('mouseover mousemove touchenter touchstart touchmove', function (d, i, nodes) {
            if (!d3.event) return;

            _this2.selection().selectAll('.tooltip').remove();

            var parent = nodes[i].parentNode;
            var mx = d3.mouse(parent)[0];
            inverseX.range([0, data.states[d].avg.length + props.avg_days]);
            var index = Math.round(inverseX(mx));
            index = index < 0 ? 0 : index >= data.states[d].avg.length ? data.states[d].avg.length - 1 : index;
            var datum = data.states[d].avg[index];
            var datumY = props.uniformScale ? datum : datum / d3.max(data.states[d].avg);
            var date = new Date(data.series[index]); // Hacky way to ensure date stays in US timezones

            date.setHours(date.getHours() + 6);
            var x = scaleXTime(date);
            var y = scaleY(datumY);
            d3.select(parent).appendSelect('circle.tooltip').attr('r', 3).attr('cx', x).attr('cy', y).style('fill', 'white').style('stroke', 'white').style('stroke-width', 1);
            d3.select(parent).appendSelect('text.tooltip.datum').attr('x', x).attr('y', y < scaleY.range()[1] / 2 ? y + 20 : y - 7).style('text-align', 'center').style('text-anchor', x > smallW / 2 ? 'end' : 'start').text(numberFormat(Math.round(datum)));
            d3.select(parent).appendSelect('text.tooltip.date').attr('x', x).attr('y', scaleY.range()[0] + 13).text(dateFormat(date)).style('text-anchor', x > smallW / 2 ? 'end' : 'start');
          });
          touchBox.on('mouseout touchleave touchcancel', function (d, i, nodes) {
            var parent = nodes[i].parentNode;
            d3.select(parent).selectAll('.tooltip').remove();
          });

          var stateNamesContainer = _this2.selection().appendSelect('div.name-container');

          var stateNames = stateNamesContainer.selectAll('.state-name').data(props.stAbbr);
          stateNames.enter().append('div').attr('class', 'state-name').merge(stateNames).classed('bold', function (d) {
            return data.states[d].percentOfPeak[props.parameter] >= 0.9;
          }).style('top', function (d) {
            var top = statePosition[d].row * smallH;
            return "".concat(top + props.paddingY, "px");
          }).style('left', function (d) {
            var left = statePosition[d].column * smallW;
            return "".concat(left, "px");
          }).html(function (d) {
            return "".concat(getArrow(data.states[d].avg), " <p>").concat(data.states[d].stateAP, "</p>");
          });
          return {
            v: _this2
          };
        }();

        if (_typeof(_ret) === "object") return _ret.v;
      }
    }
  }]);

  return USStateCartogram;
}(ChartComponent);

module.exports = USStateCartogram;
