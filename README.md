# CAMobileAppAnalytics

CAMobileAppAnalytics is an iOS SDK for App Experience Analytics that provides deep insights into the performance, user experience, crash, and log analytics of apps.


## Get Started

Check out our [documentation](https://techdocs.broadcom.com/content/broadcom/techdocs/us/en/ca-enterprise-software/it-operations-management/app-experience-analytics-saas/SaaS/reference/data-collected-by-ca-app-experience-analytics-sdk.html) for more information about the features that the App Experience Analytics SDK collects from your app.

## Requirements

### Cocoapods

1. Xcode 12+ with the XCFramework, Xcode 11+ with the static library
2. iOS 9.0 or higher

```
Note: Update Cocoapods to latest version in your mac `sudo gem install cocoapods`
```

### Swift Package Manager

1. Xcode 12+
2. iOS 11.0 or later


## Integration

Follow these steps to integrate the CAMobileAppAnalytics SDK in your Xcode project using Cocoapods or Swift Package Manager

### Cocoapods

1. Specify `pod CAMobileAppAnalytics` on a single line inside your target block in a **Podfile** to use CAMobileAppAnalytics static library

```
target 'YourApp' do
    pod 'CAMobileAppAnalytics'
end
```

If you want to use the CAMobileAppAnalytics XCFramework, specify `pod CAMobileAppAnalytics/xcframework` in your **Podfile**
```
target 'YourApp' do
    pod 'CAMobileAppAnalytics/xcframework'
end
```

Then, run the following command using the command prompt from the folder of your project

```
$ pod install
```
2. Drag & Drop the downloaded `xxx_camdo.plist` file into the Supporting files

### Swift Package Manager

> If you've previously used CocoaPods, remove them from the project with `pod deintegrate`.

1. Add a package by selecting `File` → `Add Packages…` in Xcode’s menu bar
2. Search for the CAMobileAppAnalytics SDK using the repo's URL:
```swift
https://github.com/CA-Application-Performance-Management/CAMobileAppAnalytics
```
3. Set the **Dependency Rule** to be `Branch` and specify `master` and then select **Add Package**
4. Drag & Drop the downloaded `xxx_camdo.plist` file into the Supporting files


## Initialising the SDK in your Source code
### Objective C

1. Add the import header `#import "CAMDOReporter.h"` to your AppDelegate.m file

2. Initialize the CAMobileAppAnalytics sdk in `didFinishLaunchingWithOptions:` method 

```objc
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    [CAMDOReporter initializeSDKWithOptions:SDKLogLevelVerbose  completionHandler:nil];
    return YES;
}
```
3. Save and re-build your project

### Swift
1. Add a header file with the file name format as `<app_name>-Bridging-header.h`.
2. Add the import header `#import "CAMDOReporter.h"` to your `<app_name>-Bridging-header.h` file. 
3. Add the `<app_name>-Bridging-header.h` file to Swift Compiler - Code Generation section
in the Build Settings.
`<name of the project>/<app_name>-Bridging-header.h`
4. Initialize the CAMobileAppAnalytics sdk in `didFinishLaunchingWithOptions` method 
```swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    //Initialize CA App Experience Analytics SDK
    CAMDOReporter.initializeSDK(options: SDKOptions.SDKLogLevelVerbose) { (completed, error) in
        
    }
    return true
}
```
5. Save and re-build your project

> Note: 
> Single Option - Usage Example
>    
>    ```swift
>
>    CAMDOReporter.initializeSDK(options: SDKOptions.SDKLogLevelVerbose) { (completed, error) in
>        
>    }
>   ```
>
> Multiple Options - Usage Example
>
>   ```swift
>    CAMDOReporter.initializeSDK(options: SDKOptions.SDKLogLevelVerbose.union(SDKOptions.SDKUIWebViewDelegate)) { (completed, error) in
>        
>    }
>    ```

## Using Resources from Swift Package Manager

### Objective C
```objc
@import CAMobileAppAnalytics;

NSString *resourcePath = [[NSBundle CAMobileAppAnalytics_Bundle] pathForResource:@"CaMDOIntegration" ofType:@"js"];
```

### Swift
```swift
import CAMobileAppAnalytics

let path = Bundle.CAMobileAppAnalytics_Bundle.path(forResource: "CaMDOIntegration", ofType: "js")!
```


## Documentation

For more documentation and API references, go to our [main website](https://techdocs.broadcom.com/content/broadcom/techdocs/us/en/ca-enterprise-software/it-operations-management/app-experience-analytics-saas/SaaS/configuring/collect-data-from-ios-applications.html)

## License

Copyright (c) 2023 Broadcom. All Rights Reserved.
The term "Broadcom" refers to Broadcom Inc. and/or its subsidiaries.

This software may be modified and distributed under the terms
of the MIT license. See the [LICENSE](/LICENSE) file for details.

