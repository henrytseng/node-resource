'use strict';

var assert = require('assert');

describe('Resource', function() {
  describe('#resolve', function() {
    it('Should resolve path according to cwd', function(done) {
      var Resource = require('../lib/resource');

      assert.equal(Resource.resolve('app'), process.cwd()+'/app');
      assert.equal(Resource.resolve('components/module'), process.cwd()+'/components/module');

      done();
    });

  });

  describe('#namespace', function() {
    it('Should not allow namespace reserved names', function(done) {
      var Resource = require('../lib/resource');

      assert.throws(function() {
        Resource.namespace('load', 'components/load');
      }, Error);

      assert.throws(function() {
        Resource.namespace('resolve', 'components/resolve');
      }, Error);

      done();
    });

    it('Should create a new namespaces', function(done) {
      var Resource = require('../lib/resource');

      Resource.namespace('lorem', 'components/lorem');

      assert.ok(Resource.namespace('lorem'));
      assert.ok(Resource.lorem);

      done();
    });

    it('Should resolve namespace according to src path correctly', function(done) {
      var Resource = require('../lib/resource');

      Resource.namespace('sed', '/var/lib/components/dolor/ut/sed');

      assert.equal(Resource.sed.resolve('ipsum'), '/var/lib/components/dolor/ut/sed/ipsum');

      done();
    });

  });
});
