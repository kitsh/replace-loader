'use strict';
var loaderUtils = require('loader-utils');

module.exports = function(content) {
  if (this.cacheable) { this.cacheable(); }
  var reg1 = /<com(.*?)><\/com>/g

  function replaceFunc(item) {
    var key = item.match(/\[key\]\s?=\s?["\']\s?(["\'].*?["\'])/);
    if(key == null || key[1] == void 0) {
      // Strip the commute completely because its not correct
      return '';
    } else {
      key = key[1]
      var params = item.match(/\[params\]\s?=\s?["\']\s?({.*?})["\']/);
      if(params == null || params[1] == void 0) {
        return '{{ ' + key + ' | translate }}';
      } else {
        return '{{ ' + key + ' | translate:'+params[1]+' }}';
      }
    }
  }

  content = content.replace(reg1, replaceFunc);

  return content;
};
