const lineReader = require('line-reader');
const fs = require('fs')
let buildData = '';
let repoData = '';
let dependencyAdded = false;
let repositoryAdded = false;
let buildOutputFile = "platforms/android/build.gradle"
let repoOutputFile = "platforms/android/repositories.gradle"
lineReader.eachLine('platforms/android/build.gradle', (line, last) => {
    buildData+='\n'+line;
    if(!dependencyAdded && line.toString().includes("dependencies {")) {
        buildData+='\n\t\t'+"classpath 'com.ca.dxapm:sdk-gradle-plugin:20.11.1'";
        dependencyAdded = true;
    }
    if(last) {
        fs.writeFile(buildOutputFile, buildData, function(err) {
            if (err) {
                return console.error(err);
            }
        });
    }
});
lineReader.eachLine('platforms/android/repositories.gradle', (line, last) => {
    repoData+='\n'+line;
    if(!repositoryAdded && line.toString().includes("ext.repos = {")) {
        repoData+='\n\t\t'+"maven {url 'https://packages.ca.com/apm-agents'}";
        repositoryAdded = true;
    }
    if(last) {
        fs.writeFile(repoOutputFile, repoData, function(err) {
            if (err) {
                return console.error(err);
            }
        });
    }
});
