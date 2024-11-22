(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
      // AMD. Register as an anonymous module.
      define(['exports', 'echarts'], factory);
  } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
      // CommonJS
      factory(exports, require('echarts'));
  } else {
      // Browser globals
      factory({}, root.echarts);
  }
}(this, function (exports, echarts) {
  var log = function (msg) {
      if (typeof console !== 'undefined') {
          console && console.error && console.error(msg);
      }
  }
  if (!echarts) {
      log('ECharts is not Loaded');
      return;
  }
  if (!echarts.registerMap) {
      log('ECharts Map is not loaded')
      return;
  }
  // http://196.10.20.222:8081/prod-api/news/word/list?pageNum=1&pageSize=10
  var mydata = null;
  $.ajax({
    url: 'js/jqueryMap/map_area/china.geoJson',
    data: {age : 20, sex : 'man'},
    async: false,
    dataType: 'json',
    success: function (result) {
      mydata = result;
    }
  });
  echarts.registerMap('china', mydata);
}));