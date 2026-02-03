# CAMAA Cordova Plugin

CAMAA cordova plugin is for App Experience Analytics that provides deep insights into the performance, user experience, crash, and log analytics of apps.


## Get Started
[DX App Experience Analytics](https://www.broadcom.com/info/aiops/app-analytics)

Check out our [documentation](https://techdocs.broadcom.com/content/broadcom/techdocs/us/en/ca-enterprise-software/it-operations-management/app-experience-analytics-saas/SaaS/reference/data-collected-by-ca-app-experience-analytics-sdk.html) for more information about the features that the App Experience Analytics SDK collects from your app.

## Supported platforms
* iOS
* Android

## Requirements
1. iOS 9.0 or higher
2. Xcode 12.0 or higher
3. Add the following permissions to your application `Info.plist`, if not already present.
    ```
    <key>NSLocationWhenInUseUsageDescription</key>
        <string>This allows us to track and gather analytic data for improving the app experience.</string>
    <key>NSLocationAlwaysUsageDescription</key>
        <string>This allows us to track and gather analytic data for improving the app experience.</string>
    <key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
        <string>This allows us to track and gather analytic data for improving the app experience.</string>
    ```
    
## Integration (iOS)
Follow these steps to integrate the `camaa cordova plugin` in your project

1. **Download and extract the plugin**
   - Download the `cordova-plugin-camaa-xcframework` zip folder from the AXA Dashboard.
   - Extract the zip to a location on your machine (for example, `~/plugins/cordova-plugin-camaa-xcframework`).
   - Keep this extracted folder in a path you can reference (e.g., your project directory or a shared plugins folder).

2. **Add the plugin from the local path**
   - From your Cordova project directory, run:
   ```
   cordova plugin add <path-to-extracted-cordova-plugin-camaa-xcframework>
   ```
   - Example, if you extracted to `~/plugins/cordova-plugin-camaa-xcframework`:
   ```
   cordova plugin add ~/plugins/cordova-plugin-camaa-xcframework
   ```

3. **Configure the plist**
   - Download `xxx_camdo.plist` from the AXA Dashboard and rename it to `cordova_camdo.plist`. Replace the existing file in your project with this file after you have installed the `camaa cordova plugin`.

---
### Useful Tips (iOS)
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
### Todos

 - Write more Tests
 - Make error reporting more descriptive


