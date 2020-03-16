#!/usr/bin/env node


var exec = require('child_process').exec;
/*

Look @https://cordova.apache.org/docs/en/latest/guide/appdev/hooks/ for more details
 */
module.exports = function(context) {
    var projectRoot = context.opts.projectRoot;
    // could just use a regex
    var scriptLocation = context.scriptLocation.split("/").slice(0,context.scriptLocation.split("/").length - 1).join("/") + "/";
    // remove previous version
    // exec("cordova plugin remove CAMAA",function(e,s,std){
    //  this is causing errors
    // });
    //cd to the plugin, run the script and come back
    new Promise(function(resolve, reject) {
        console.log("Running : ./addPlugin.sh " + projectRoot);
         exec("cd " + scriptLocation +";"
            +"./addPlugin.sh " + projectRoot + ";"
            +"cd " + projectRoot,function(error,stdout,stderr){

            if(error){console.log("Error : " + error); resolve();};
            if(stdout){console.log("stdout: " + stdout); resolve();};
            if(stderr){console.log("stderr : " + stderr); resolve();};
        });
    }).then (function() {
        configFileUpdate();
    });

    function configFileUpdate() {
        console.log("Running : ./addPluginConfig.sh " + projectRoot);
        exec("cd " + scriptLocation +";"
                +"./addPluginConfig.sh " + projectRoot + ";"
                +"cd " + projectRoot,function(error,stdout,stderr){
    
            if(error){console.log("Error : " + error)};
            if(stdout){console.log("stdout: " + stdout)};
            if(stderr){console.log("stderr : " + stderr)};
        });
    }
};
