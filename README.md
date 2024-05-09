# Using AXA Bindings Library in Xamarin

### Installation

1. Open your project to add the `AXAiOSBindings.dll` package.
2. Right-click on **Dependencies**, select **Manage NuGet Packages**, and search the **AXAiOSBindings.dll** file from the list in the Nuget packages window under the **nuget.org** Package source and then click **Add Package**.
3. Add the `<app_name>_camdo.plist` file to your project under iOS(xxx.iOS) and right click on it and set the Build Action to BundleResource

### Initialising the SDK in your Source Code
1. Initialize the CAMobileAppAnalytics SDK in the **FinishedLaunching:** method in the **AppDelegate.cs** file.
```csharp
    #if IOS
        AXAiOSBindings.CAMDOReporter.InitializeSDKWithOptions(AXAiOSBindings.SDKOptions.LogLevelVerbose, (_, __) => { });
    #endif
``` 
    


### Usage

Use `AXAiOSBindings.CAMDOReporter` to call custom APIs in your project.

For example:
```csharp
AXAiOSBindings.CAMDOReporter.SetCustomerId("Test");
```

For more information, see https://techdocs.broadcom.com/us/en/ca-enterprise-software/it-operations-management/app-experience-analytics-saas/SaaS/configuring/collect-data-from-ios-applications/collect-data-from-supported-mobile-platforms.html#concept.dita_6c3ef640e7e0cc8549ce43c10731700185fbf76e_Xamarin
