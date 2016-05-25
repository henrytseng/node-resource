'use strict';

/**
 * Module dependencies.
 */
var path = require('path');

/**
 * A module resource loader
 *
 * Environment variable:
 * RESOURCE_BASE_PATH is used to override the base lookup path
 */

var _Resource;
var _basePath = function() {
  return (!!process.env.RESOURCE_BASE_PATH) ? process.env.RESOURCE_BASE_PATH : process.cwd();
};

/**
 * Create a relative module loader
 *
 * @param {String} namespace A namespace to load from; defaults to null
 */
var _createLoader = function(namespace) {
  /**
   * Get a resolved path as a string
   *
   * @param  {String} src A source path
   */
  var _resolve = function(src) {
    var base = namespace ? path.resolve(namespace) : _basePath();
    var relative = path.sep + src;
    return base + relative;
  };

  /**
   * Load module according to resolved path
   * 
   * @param  {String} src A source path
   */
  var instance = function(src) {
    return require(_resolve(src));
  };

  instance.resolve = _resolve;
  
  return instance;
};

/**
 * Load a module according to base path
 */
module.exports = _Resource = _createLoader(null);
module.exports.load = _Resource;

/**
 * Reset modules cache; or optionally remove a single module from cache
 * 
 * @param  {String} [src] A source path; optionally single module from cache
 */
module.exports.reset = function(src) {
  if(src) {
    var filePath = require.resolve(src);
    delete require.cache[filePath];

  } else {
    for(var n in require.cache) {
      if(require.cache.hasOwnProperty(n)) delete require.cache[n];
    }
  }

};

/**
 * Set/Get a mapping for a namespace to another path
 */
module.exports.namespace = function(name, base) {
  // Set
  if(arguments.length === 2) {
    if(name.match(/load|resolve/)) {
      throw new Error('Resource namespace conflict '+name);
    }

    return _Resource[name] = _createLoader(base);
  }

  // Get
  return _Resource[name];
};
