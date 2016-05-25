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

  describe('#reset', function() {
    
    it('Should instantiate module and remove it from module cache', function(done) {
      var Resource = require('../lib/resource');

      // Define namespaces
      Resource.namespace('foobar', 'tests/mocks/foobar');
      
      // Load
      var Foo = Resource.foobar('foo');

      // Modify
      Foo.value = 'set';

      assert.equal(Foo.value, 'set');

      // Clear
      Resource.reset('tests/mocks/foobar/foo');

      // Reload
      Foo = Resource.foobar('foo');

      assert.notEqual(Foo.value, 'set');

      done();
    });
    
    it('Should instantiate module and clear all cache in a namespace', function(done) {
      var Resource = require('../lib/resource');

      // Define namespaces
      Resource.namespace('foobar', 'tests/mocks/foobar');
      Resource.namespace('loremipsum', 'tests/mocks');
      
      // Load
      var Foo = Resource.foobar('foo');
      var Bar = Resource.foobar('bar');
      var Lorem = Resource.loremipsum('lorem');
      var Ipsum = Resource.loremipsum('ipsum');

      // Modify
      Foo.value = 'set';
      Lorem.value = 'dolor';
      Ipsum.value = 'quo';

      assert.equal(Foo.value, 'set');
      assert.equal(Lorem.value, 'dolor');
      assert.equal(Ipsum.value, 'quo');

      // Clear
      Resource.loremipsum.reset();

      // Reload
      Foo = Resource.foobar('foo');
      Bar = Resource.foobar('bar');
      Lorem = Resource.loremipsum('lorem');
      Ipsum = Resource.loremipsum('ipsum');

      assert.equal(Foo.value, 'set');
      assert.equal(Bar.value, null);
      assert.notEqual(Lorem.value, 'dolor');
      assert.notEqual(Ipsum.value, 'quo');

      done();
    });

  });
});
