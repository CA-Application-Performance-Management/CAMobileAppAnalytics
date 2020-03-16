# CAMAA iOS Cordova Plugin

[![N|Solid](https://media.licdn.com/mpr/mpr/shrink_200_200/AAEAAQAAAAAAAA1MAAAAJDZjMmEzZWY3LTI2MGUtNDM3Zi1hMmM2LWU3NWMwNDllZTI1NQ.png)](https://www.ca.com/us/products/ca-app-experience-analytics.html)


---
---
### Installation

$MyCordovaApp is a shell variable to the cordova application you want to install the plugin to

$Plugin is the location of the CAMAA iOS plugin source

Now **copy your iOS plist file** from http://cloud.ca.com **into the $Plugin repo and rename it to  cordova_camdo.plist**. You should overwrite the existing file.

Delete the previous installation


```sh
$ cp /my/project_camdo.plist $Plugin/cordova_camdo.plist
$ cd $MyCordovaApp
$ cordova plugin remove $Plugin
$ cordova plugin add $Plugin --nofetch
```




---
---
### Useful Tips
  ##### SDK API


- AXALoader.js contains all of the javascript API calls which trigger the corresponding method in CAMDOReporter.h(however it goes through CAMAAInitializer.m)
- AXALoader.js has a tiny interface which tells you the expected types for the parameters
- For a full description of the function and what it does see CAMDOReporter.h and search for the function name
-  access API via **window.camaa**  Ex :
  ```js
window.camaa.isSDKEnabled((didSucceed)=>{
    var result = didSucceed ? "is enabled!" : "is disabled!";
    console.log("The SDK " + result); // is enabled or disabled
},(didFail)=>{
    // Note for functions there is type checking which should send descriptive error messages on failure
    // but for other cases there will not always be a description of the error
    console.log("The function failed with description : " + didFail);
});
// If confused It is always best to consult CAMAAInitializer.m
  // to see the actual implementation
  ```

---
---
### Todos

 - Write more Tests
 - Create private repo
 - Add android support
 - Make error reporting more descriptive


