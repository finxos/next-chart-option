/*!
 * name: next-chart-option
 * url: https://github.com/afeiship/next-chart-option
 * version: 1.0.0
 * date: 2019-09-05T04:27:38.165Z
 * license: MIT
 */

(function() {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('next-js-core2');
  var NxChartData2set = nx.ChartData2set || require('next-chart-data2set');

  // private package:
  var echartsAdapter = require('echarts-adapter').echartsAdapter;
  var toEcharts = echartsAdapter.toEcharts;
  var assembleData = echartsAdapter.assembleData;
  var adaptInst = echartsAdapter.adaptInst;

  nx.chartOption = function(inData) {
    var charts = inData.chart.charts;
    var chartStyle = JSON.parse(charts[0].style);
    var chartOption = chartStyle.chartOption;
    var dateRange = chartStyle.dateRange;
    var autoUpdate = chartStyle.autoUpdate;
    var isRaw = chartStyle.format === 'raw';
    if (isRaw) return chartStyle;
    var seriesInfoset = NxChartData2set.info(inData.infolist);
    var dataset = NxChartData2set.data(inData.datalist);
    var sids = chartOption.seriesList.reduce(function(filtered, item) {
      item.show && filtered.push(item.sid);
      return filtered;
    }, []);
    var dataTable = assembleData(dataset, sids, dateRange, autoUpdate, 'date', seriesInfoset);
    var option = toEcharts(chartStyle, dataTable, seriesInfoset);
    return adaptInst(option);
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.chartOption;
  }
})();

//# sourceMappingURL=next-chart-option.js.map
