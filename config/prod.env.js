'use strict'
var argv;
try { 
    argv = JSON.parse(process.env.npm_config_argv).original;
} catch(ex) {
    argv = process.argv;
}
var API_ROOT = '';
if (argv[2]) {
	if (argv[2].indexOf('p')>0) {
    	API_ROOT = '"http://app.shuaibomall.net/web"';
	}else{
	    API_ROOT = '"http://shuaibo.zertone1.com/web"';
	}
}else{
	API_ROOT = '"http://shuaibo.zertone1.com/web"';
}
module.exports = {
  NODE_ENV: '"production"',
  API_ROOT: API_ROOT
}