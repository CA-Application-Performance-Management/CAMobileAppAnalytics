/*
 *
 * Copyright (c) 2013-2019 CA Technologies ( A Broadcom Company)
 * All rights reserved.
 *
 */

#ifndef CAMDOReporter_h
#define CAMDOReporter_h

#import <Foundation/Foundation.h>
#import <CoreLocation/CoreLocation.h>
#import <UIKit/UIKit.h>

extern CGFloat CAMAA_SCREENSHOT_QUALITY_HIGH;
extern CGFloat CAMAA_SCREENSHOT_QUALITY_MEDIUM;
extern CGFloat CAMAA_SCREENSHOT_QUALITY_LOW;
extern CGFloat CAMAA_SCREENSHOT_QUALITY_DEFAULT;

extern NSString *const CAMAA_CRASH_OCCURRED;

// For custom application version string to be read from bundle (info.plist) use "AXAAppShortVersionString"  as key in info.plist.

/*
 Custom Keys to override AXA SDK behavior , placed in App's Info.plist.
 Key : "AXAAppShortVersionString";   ex : 7.7.2
 Key : "AXACLLocationLevel";   String - one of the values :     "BestForNavigation" ,"NearestTenMeters" , "HundredMeters" ,"Kilometer" ,"ThreeKilometers"
 Key : "AXACollectIp";  Boolean : True/False
 Key : "AXAMaxUploadNetworkCallsLimit";  String  : 1 - 10
 Key : "AXADisabledInterceptors";  Array : NSURLConnection ,NSURLSession ,UIActivityIndicatorView ,UIApplication ,UIWebView , WKWebView , Gestures , Touch ; Note : Including UIApplication disables SDK.
 Key : "AXANavigationThrottle" ; String - 1000 , time in milliseconds to throttle navigation collection;
 */

//Register for SDK data upload notification. The receiver is notified when SDK uploads the data to the Collector.
extern NSString *const CAMAA_UPLOAD_INITIATED;

typedef NS_OPTIONS(NSInteger, SDKOptions) {
    SDKDefault                      = 0,
    SDKLogLevelSilent               = (1 << 0),
    SDKLogLevelVerbose              = (1 << 1),
    SDKCheckProfileOnRestartOnly    = (1 << 2),
    SDKUseNetworkProtocolSwizzling  = (1 << 3), // By default we use NSURLConnection and NSURLSession delegates
                                                // to observe Network traffic.  This option adds the protocol
                                                // support if our delegates miss anything
    SDKNoNetworkSwizzling           = (1 << 4),
    SDKNoWorkLightSwizzling         = (1 << 5),
    SDKNoGeoLocationCapturing       = (1 << 6),
    SDKCollectDeviceName            = (1 << 7), // It is App developer's responsibility to provide a disclaimer to
                                                // the consumer that they are collecting this data.
                                                // By default CA SDK will NOT collect the device name
    SDKUIWebViewDelegate            = (1 << 8), // requires SDK build with private APIs
    SDKFixedViewTitles              = (1 << 9),
    SDKNoCrashReporting             = (1 << 10)
};

typedef NS_ENUM(NSInteger, SDKError) {
    ErrorNone,
    ErrorNoTransactionName,
    ErrorTransactionInProgress,
    ErrorFailedToTakeScreenshot,
    ErrorInvalidValuesPassed
};

//Enums to be specified for the pinningMode during the SSL handshake
typedef NS_ENUM(NSUInteger, CAMDOSSLPinningMode) {
    CAMDOSSLPinningModeNone,    // default
    CAMDOSSLPinningModePublicKey,
    CAMDOSSLPinningModeCertificate,
    CAMDOSSLPinningModeFingerPrintSHA1Signature,
    CAMDOSSLPinningModePublicKeyHash
};

@interface CAMDOReporter : NSObject {

}

/* Initializes the SDK.  This call should be made as early as possible in the application life cycle
 * Typically, it is made at the beginning of didFinishLaunchingWithOptions in Application delegate class
 * @param options of the type SDKOptions
 * @param configDetails This should be of the type NSDictionary. This should be the content of the CAMAA plist
 * @param completionBlock which is a standard (BOOL completed, NSError *error)block
 * Successful exceution of the method will have completed as YES and error object is nil
 * In case of failure the completed is set to NO and error will have NSError object with domain,
 * code and localizedDescription.
 */
+ (void) initializeSDKWithOptions:(SDKOptions) options configDetails:(NSDictionary *)configDetails completionHandler:(void(^)(BOOL completed, NSError *error)) completionBlock;

/* Initializes the SDK.  This call should be made as early as possible in the application life cycle.
 * Typically, it is made at the beginning of didFinishLaunchingWithOptions in Application delegate class
 * @param options of the type SDKOptions.
 * @param completionBlock which is a standard (BOOL completed, NSError *error)block.
 * Successful exceution of the method will have completed as YES and error object is nil
 * In case of failure the completed is set to NO and error will have NSError object with domain,
 * code and localizedDescription.
 */
+ (void) initializeSDKWithOptions:(SDKOptions) options completionHandler:(void(^)(BOOL completed, NSError *error)) completionBlock;

/* Use this API to enable SDK.  SDK is enabled by default
 * You need to call this API only if you called disableSDK earlier
 */
+ (void) enableSDK;

/* Use this API to disable the SDK.  When disabled, SDK is completely out of the process
 */
+ (void) disableSDK;

/* Returns if the SDK is currently enabled or not
 */
+ (BOOL) isSDKEnabled;

/* Use this API to get the unique device ID generated by the SDK
 */
+ (NSString *) deviceId;

/* Get the customer ID.  If it not set, this API returns nil
 */
+ (NSString *) customerId;

/* Use this API to set the customer ID.  If nil is passed, customer id us reset
 */
+ (SDKError) setCustomerId:(NSString *) customerId;

/* Use this API to set custom session attribute.  Name and Value cannot be nil
 */
+ (SDKError) setSessionAttribute:(NSString *) name withValue:(NSString *)value;

/* Stops collecting potentially sensitive data.
 * The following data is not collected when the app enters private zone
 *    - Screenshots
 *    - Location information including GPS and IP addresses
 *    - Value in the text entry fields
 */
+ (void) enterPrivateZone;

/* Starts collecting all data again
 */
+ (void) exitPrivateZone;

/* Returns if CA MAA SDK is in private zone or not
 */
+ (BOOL) isInPrivateZone;

/* Returns the SDK computed APM header in key value format.  Returns nil if apm header cannot be computed
 */
+ (NSDictionary *) apmHeader;

/* Adds data to SDK computed APM header with a semicolon (;) separation
 */
+ (void) addToApmHeader:(NSString *)data;

/* Set your delegate instance to handle auth challenges.  Use it when using SDKUseNetworkProtocolSwizzling option
 */
+ (void) setNSURLSessionDelegate:(id)delegate;

/* Use this method to set the ssl pinning mode and array of pinned values. Supported pinning modes:
 *
 * This method expects array of values depending on the pinningMode
 *
 * CAMDOSSLPinningModePublicKey OR CAMDOSSLPinningModeCertificate
 *          - array of certificate data (NSData from SeccertificateRef)
 *          - or, certificate files(.cer) to be present in the resource bundle
 *
 * CAMDOSSLPinningModeFingerPrintSHA1Signature
 *          - array of SHA1 fingerprint values
 *
 * CAMDOSSLPinningModePublicKeyHash
 *          - array of PublicKeyHashValues
 */
+ (void) setSSLPinningMode:(CAMDOSSLPinningMode) pinningMode withValues:(NSArray*)pinnedValues;

/* Use this method to stop the current session.  No data will be logged until startSession API is called again
 */
+ (void) stopCurrentSession;

/* Use this methid to start a new session.  If a session is already in progress, 
 * it will be ended and new session is started
 */
+ (void) startNewSession;

/* Convenient method to stop the current session in progress and start a new session
 */
+ (void) stopCurrentAndStartNewSession;

/* This method can be used to start a transaction with name
 * Completion block can be used to verify whether transaction is started successfully or not
 * @param transactionName which is NSString
 * @param completionBlock which is a standard (BOOL completed, NSError *error) completionBlock
 * Successful exceution of the method will have completed as YES and error object is nil
 * In case of failure the completed is set to NO and error will have NSError object with domain, 
 * code and localizedDescription.
 */
+ (void) startApplicationTransactionWithName:(NSString *) transactionName completionHandler:(void(^)(BOOL completed, NSError *error)) completionBlock;

/* This method can be used to start a transaction with serviceName
 * Completion block can be used to verify whether transaction is started successfully or not
 * @param transactionName which is NSString.
 * @param serviceName which is NSString.
 * @param completionBlock which is a standard (BOOL completed, NSError *error) completionBlock.
 * Successful exceution of the method will have completed as YES and error object is nil
 * In case of failure the completed is set to NO and error will have NSError object with domain,
 * code and localizedDescription.
 */
+ (void) startApplicationTransactionWithName:(NSString *) transactionName service:(NSString *)serviceName completionHandler:(void(^)(BOOL completed, NSError *error)) completionBlock;

/* This method can be used to stop a transaction with name
 * Completion block can be used to verify whether transaction is stopped successfully or not
 * @param transactionName which is NSString
 * @param completionBlock which is a standard (BOOL completed, NSError *error) completionBlock
 * Successful exceution of the method will have completed as YES and error object is nil
 * In case of failure the completed is set to NO and error will have NSError object with domain,
 * code and localizedDescription.
 */
+ (void) stopApplicationTransactionWithName:(NSString *) transactionName completionHandler:(void(^)(BOOL completed,NSError *error))completionBlock;

/* This method can be used to stop a transaction with serviceName
 * Completion block can be used to verify whether transaction is stopped successfully or not
 * @param transactionName which is NSString.
 * @param serviceName which is NSString.
 * @param completionBlock which is a standard (BOOL completed, NSError *error) completionBlock.
 * Successful exceution of the method will have completed as YES and error object is nil
 * In case of failure the completed is set to NO and error will have NSError object with domain,
 * code and localizedDescription.
 */
+ (void) stopApplicationTransactionWithName:(NSString *) transactionName failure:(NSString *) failure completionHandler:(void(^)(BOOL completed,NSError *error)) completionBlock;

/* Call this method to provide feedback from the user after a crash
 * App has to register for CAMAA_CRASH_OCCURRED notification and collect the feedback from the use
 * while handling the notification
 */
+ (void) setCustomerFeedback:(NSString *) feedback;

/* Set Location of the Customer/User by passing zip code and country.
 */
+ (void) setCustomerLocation:(NSString *) zip andCountry:(NSString *) country;

#if TARGET_OS_TV == 0
/* Set Location of the Customer/User by passing CLLocation (latitude & longitude).
 */
+ (void) setCustomerLocation:(CLLocation *) location;
#endif

/* This method can be used to send the screen shot of the current screen
 * @param name for the screen name, cannot be nil.
 * @param quality of the image. The value should be between 0.0 to 1.0. By default it is set to low quality. 
 * @param completionBlock which is a standard (BOOL completed, NSError *error) completionBlock
 * Successful exceution of the method will have completed as YES and error object is nil
 * In case of failure the completed is set to NO and error will have NSError object with domain, 
 * code and localizedDescription.
 */
+ (void) sendScreenShot:(NSString *) name withQuality:(CGFloat) quality completionHandler:(void(^)(BOOL completed, NSError *error)) completionBlock;


+ (void) enableScreenShots:(BOOL) captureScreen;

/* This method is to create custom app flow with dynamic views
 * @param name
 * @param loadTime
 * @param completionBlock which is a standard (BOOL completed, NSError *error) completionBlock
 * Successful exceution of the method will have completed as YES and error object is nil 
 * In case of failure the completed is set to NO and error will have NSError object with domain,
 * code and localizedDescription.
 */
+(void) viewLoaded:(NSString *) name loadTime:(CGFloat) loadTime completionHandler:(void(^)(BOOL completed, NSError *error)) completionBlock;


+(void) viewLoaded:(NSString *) name loadTime:(CGFloat) loadTime screenShot:(BOOL) screenCapture completionHandler:(void(^)(BOOL completed, NSError *error)) completionBlock;

/* Name of the view to be ignored
 * Screenshots and transitions of the views that are in ignore list are not captured
 */
+(void) ignoreView:(NSString *) viewName;


/* List of names of the views to be ignored.  Screenshots and transitions of the views that are in ignore list
 * are not captured
 */
+(void) ignoreViews:(NSSet *) viewNames;

/* Returns YES if screenshots are enabled by policy.  Otherwise returns NO
 */
+ (BOOL) isScreenshotPolicyEnabled;

/*
 * This method can be used to add custom network event in the current session
 * @param url, string reprentation of the network URL
 * @param status, any NSInteger value
 * @param responseTime, any integer value
 * @param inBytes, any integer value
 * @param outBytes, any integer value
 * @param completionBlock which is a standard (BOOL completed, NSError *error) completionBlock
 * Successful exceution of the method will have completed as YES and error object is nil
 * In case of failure the completed is set to NO and error will have NSError object with domain,
 * code and localizedDescription.
 */
+ (void) logNetworkEvent:(NSString *) url withStatus:(NSInteger) status withResponseTime:(int64_t) responseTime withInBytes:(int64_t) inBytes withOutBytes:(int64_t) outBytes completionHandler:(void(^)(BOOL completed, NSError *error)) completionBlock;

/* This method can be used to add custom text event of type NSString in the current session
 * @param name, which is an event name
 * @param value, which is an event value
 * @param attributes which is of the type NSMutableDictionary which can be used to send any extra parameters
 * @param completionBlock which is a standard (BOOL completed, NSError *error) completionBlock
 * Successful exceution of the method will have completed as YES and error object is nil
 * In case of failure the completed is set to NO and error will have NSError object with domain,
 * code and localizedDescription.
 */
+ (void) logTextMetric:(NSString *) name withValue:(NSString *) value withAttributes:(NSMutableDictionary *) attributes completionHandler:(void(^)(BOOL completed, NSError *error)) completionBlock;

/*
 * This method can be used to add custom numeric event of type double in the current session
 * @param name, which is an event name
 * @param value, which is an event value
 * @param attributes which is of the type NSMutableDictionary which can be used to send any extra parameters
 * @param completionBlock which is a standard (BOOL completed, NSError *error) completionBlock.
 * Successful exceution of the method will have completed as YES and error object is nil
 * In case of failure the completed is set to NO and error will have NSError object with domain,
 * code and localizedDescription.
 */
+ (void) logNumericMetric:(NSString *) name withValue:(double) value withAttributes:(NSMutableDictionary *) attributes completionHandler:(void(^)(BOOL completed, NSError *error)) completionBlock;

/* Force upload event(s). This is bulk/resource consuming operation and should be used with caution
 * This method takes a completion block as the parameter
 * @param completionBlock with response as NSDictionary and error object
 * Response dictionary conatins the Key 'CAMDOResponseKey' which holds the URLResponse details 
 * and the key 'CAMDOTotalUploadedEvents' which holds the total number of events uploaded
 */
+ (void) uploadEventsWithCompletionHandler:(void (^)(NSDictionary *response, NSError *error)) completionBlock;

#pragma mark deprecated

/* Returns the default session configuration to use when constructing NSURLSession with your own delegate
 */
+ (NSURLSessionConfiguration *) getDefaultNSURLSessionConfiguration __attribute((deprecated("No longer required")));



//Auxiliary TroubleShooting Methods :

- (BOOL) startApplicationTransactionAuto:(NSString *) transactionName withServiceName:(NSString *)  serviceName;
- (BOOL) stopApplicationTransactionAuto:(NSString *) transactionName;
@end

#endif /* CAMDOReporter_h */
