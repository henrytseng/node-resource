node-resource
=============

Absolute folder structure to access components.  

Use the environment variable ```RESOURCE_BASE_PATH``` to set the base path, otherwise, the default uses ```process.cwd()```.  

## Install

To install: 

	npm install node-resource --save

## Use

To build an absolute path:

	var Resource = require('node-resource');
	var absolutePath = Resource.resolve('relative/path');

To load a module:

	var Resource = require('node-resource');
	var MyModule = Resource.load('relative/path');

