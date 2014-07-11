'use strict';

var path = require('path');

/**
 * A module resource loader
 *
 * Environment variable:
 * RESOURCE_BASE_PATH is used to override the base lookup path
 */

module.exports = {
  _isOnce: false,

  resolve: function($path) {
    var root = (!!process.env.RESOURCE_BASE_PATH) ? process.env.RESOURCE_BASE_PATH : process.cwd();
    var relative = path.sep + $path;
    return root+relative;
  },

  load: function($module) {
    return require(this.resolve($module));
  }
};
