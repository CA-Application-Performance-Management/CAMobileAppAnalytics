# CAMobileAppAnalytics

CAMobileAppAnalytics is an iOS SDK for App Experience Analytics that provides deep insights into the performance, user experience, crash, and log analytics of apps.


## Get Started

Check out our [documentation](https://techdocs.broadcom.com/content/broadcom/techdocs/us/en/ca-enterprise-software/it-operations-management/app-experience-analytics-saas/SaaS/reference/data-collected-by-ca-app-experience-analytics-sdk.html) for more information about the features that the App Experience Analytics SDK collects from your app.


## Requirements
1. Xcode 11 or higher
2. iOS 8.0 or higher

## Installation
Follow these steps to install the CAMobileAppAnalytics SDK in your Xcode project using CocoaPods
1. Specify `pod CAMobileAppAnalytics` on a single line inside your target block in a **Podfile**

example:

```
target 'YourApp' do
    pod 'CAMobileAppAnalytics'
end
```
Then, run the following command using the command prompt from the folder of your project

```
$ pod install
```
2. Drag & Drop `xxx_camdo.plist` file into the Supporting files

## Initialising the SDK in your Source code
### Objective C

1. Add the import header `#import "CAMDOReporter.h"` to your AppDelegate.m file

2. Initialize the CAMobileAppAnalytics sdk in `didFinishLaunchingWithOptions:` method 
```
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    [CAMDOReporter initializeSDKWithOptions:SDKLogLevelVerbose  completionHandler:nil];
    return YES;
}
```
3. Save and re-build your project

### Swift
1. Add a header file with the file name format as `<app_name>-Bridging-header.h`.
2. Add the import header `#import "CAMDOReporter.h"` to your `<app_name>-Bridging-header.h` file. 
3. Add the `<app_name>-Bridging-header.h` file to Swift Compiler - Code Generation section
in the Build Settings.
`<name of the project>/<app_name>-Bridging-header.h`
4. Initialize the CAMobileAppAnalytics sdk in `didFinishLaunchingWithOptions` method 
``` 
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    //Initialize CA App Experience Analytics SDK
    CAMDOReporter.initializeSDK(options: SDKOptions.SDKLogLevelVerbose) { (completed, error) in
        
    }
    return true
}
```
5. Save and re-build your project

##### Note
For more information about the SDK options, see the Initialize SDK Options section.
Single Option - Usage Example
```
CAMDOReporter.initializeSDK(options: SDKOptions.SDKLogLevelVerbose) { (completed, error) in
    
}
```
Multiple Options - Usage Example
```
CAMDOReporter.initializeSDK(options: SDKOptions.SDKLogLevelVerbose.union
(SDKOptions.SDKUIWebViewDelegate)) { (completed, error) in
    
}
```
## Documentation

For more documentation and API references, go to our [main website](https://techdocs.broadcom.com/content/broadcom/techdocs/us/en/ca-enterprise-software/it-operations-management/app-experience-analytics-saas/SaaS/configuring/collect-data-from-ios-applications.html)

## License

Copyright (c) 2019 Broadcom. All Rights Reserved.
The term "Broadcom" refers to Broadcom Inc. and/or its subsidiaries.

This software may be modified and distributed under the terms
of the MIT license. See the [LICENSE](/LICENSE) file for details.

