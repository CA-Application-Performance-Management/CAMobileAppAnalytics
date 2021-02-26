const lineReader = require('line-reader');
const fs = require('fs')

let outputFile = "platforms/android/build.gradle"
let data = '';
let dependencyAdded = false;
let repositoryAdded = false;

lineReader.eachLine('platforms/android/build.gradle', (line, last) => {
    data+='\n'+line;
    if(!dependencyAdded && line.toString().includes("dependencies {")) {
        data+='\n\t\t'+"classpath 'com.ca.dxapm:sdk-gradle-plugin:20.11.1'";
        dependencyAdded = true;
    }
    if(!repositoryAdded && line.toString().includes("repositories {")) {
        data+='\n\t\t'+"maven {url 'https://packages.ca.com/apm-agents'}";
        repositoryAdded = true;
    }
    if(last) {
        fs.writeFile(outputFile, data, function(err) {
            if (err) {
                return console.error(err);
            }
        });
    }
});