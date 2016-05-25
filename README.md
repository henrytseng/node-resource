Resource
========

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/henrytseng/node-resource?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

[![Build Status](https://travis-ci.org/henrytseng/node-resource.svg?branch=master)](https://travis-ci.org/henrytseng/node-resource)

A module loading manager.  

The module subsystem API is will remain the same for some time to come in Node.  

`Resource` provides a way to manage modules in namespaces and invalidate module cache for testing.  

Remember that modules loaded using `require` are specific and register as different modules according to their location.  

> For example, require('./foo') and require('./FOO') return two different objects, irrespective of whether or not ./foo and ./FOO are the same file.

`Resource` simplifies loading modules by using `process.cwd()` and `require.resolve` to build absolute folder structure to access components.  

Use the environment variable ```RESOURCE_BASE_PATH``` to set the base path, otherwise, the default uses ```process.cwd()```.  

## Install

To install: 

	npm install node-resource --save

## Use

Load a module according to execution environment's current working directory

	var Resource = require('node-resource');
	var MyModule = Resource('relative/path/to/module');

Get the absolute path according to execution environment from the current working folder `process.cwd`

	var Resource = require('node-resource');
	var absolutePathModule = Resource.resolve('relative/path/to/module');


## Namespaces

The term `namespace` is used loosely.  

Here's where things get interesting.  Resource namespaces allow definition of sets of modules in a different heirarchy from the rest of the application.  

If you'd like to relocate a specific set of modules to a different folder:

	var Resource = require('node-resource');
	Resource.namespace('common', '/var/lib/common/components');

Now load them using:

	Resource.common('mycomponent');

If you'd like to resolve paths according to the namespace you can still use `Resource.resolve`:

	assert.ok(Resource.common.resolve('mycomponent') === '/var/lib/common/components/mycomponent');

This has been especially useful in larger projects with multiple teams where allocation of git repositories were necessary to divide and conquer. 


# Cache

Modules in Node.js are stored in memory and reside in `require.cache` after the first load.  Subsequent calls to access the module use the cached version.  

To remove the cached instance use 

	var Foo = Resource('path/to/my/module');
	Resource.reset('path/to/my/module');

Or reset only a collection of namespaced modules.  

	Resource.common.reset();

Remember that since `Resource` uses the absolute path with respect to the module a reference to the same module from outside the namespace affects the same module since namespaces are organized through the module's path.  


# Contribution

Contributions are welcome but only when the features lend to the direction of the project.  Please make sure to stick to current coding styles and conventions.  