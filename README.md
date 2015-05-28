node-resource
=============

[![Join the chat at https://gitter.im/henrytseng/node-resource](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/henrytseng/node-resource?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

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

