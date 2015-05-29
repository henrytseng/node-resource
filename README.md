node-resource
=============

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/henrytseng/node-resource?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

[![Build Status](https://travis-ci.org/henrytseng/node-resource.svg?branch=master)](https://travis-ci.org/henrytseng/node-resource)

Absolute folder structure to access components.  

Use the environment variable ```RESOURCE_BASE_PATH``` to set the base path, otherwise, the default uses ```process.cwd()```.  

## Install

To install: 

	npm install node-resource --save

## Use

Load a module according to execution environment's current working directory

	var Resource = require('node-resource');
	var MyModule = Resource('relative/path');

Get the absolute path according to execution environment

	var Resource = require('node-resource');
	var absolutePathModule = Resource.resolve('relative/path');


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


## LICENSE

MIT