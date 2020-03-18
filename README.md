# AXA iOS Cordova Plugin

AXA is App Experience Analytics that provides deep insights into the performance, user experience, crash, and log analytics of apps.


## Get Started
[DX App Experience Analytics](https://www.broadcom.com/info/aiops/app-analytics)

Check out our [documentation](https://techdocs.broadcom.com/content/broadcom/techdocs/us/en/ca-enterprise-software/it-operations-management/app-experience-analytics-saas/SaaS/reference/data-collected-by-ca-app-experience-analytics-sdk.html) for more information about the features that the App Experience Analytics SDK collects from your app.

## Supported platforms
* iOS

## Requirements
1. iOS 8.0 or higher

## Integration
Follow these steps to integrate the AXA cordova plugin in your project
1. Run the following command from your Cordova project directory
```
cordova plugin add cordova-plugin-axa
```
2. Download `xxx_camdo.plist` and rename it to `cordova_camdo.plist`. You should replace this with existing file in your project after you installed the axa cordova plugin.


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
 - Add android support
 - Make error reporting more descriptive


