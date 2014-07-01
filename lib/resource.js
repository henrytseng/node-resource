'use strict';

var path = require('path');

/**
 * A module resource loader
 */

module.exports = {
  resolve: function($path) {
    return process.cwd() + path.sep + $path;
  },

  load: function($module) {
    return require(this.resolve($module));
  }
};
