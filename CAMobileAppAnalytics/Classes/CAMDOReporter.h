/*
 *
 * Copyright (c) 2013-2021 CA Technologies (A Broadcom Company)
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
 Key : "AXADisabledInterceptors";  Array : NSURLConnection ,NSURLSession ,UIActivityIndicatorView ,UIApplication , WKWebView , Gestures , Touch ; Note : Including UIApplication disables SDK.
 Key : "AXANavigationThrottle" ; String - 1000 , time in milliseconds to throttle navigation collection;
 Key : "AXAActiveSessionTimeOut" ; String, time in milliseconds to stop and start the new session when your app is a continuously active state
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

/**
 * Initializes the SDK.
 * This call should be made as early as possible in the application life cycle
 * Typically, it is made at the beginning of didFinishLaunchingWithOptions in
 * the Application delegate class
 *
 * @param options of the type SDKOptions
 * @param configDetails This should be of the type NSDictionary. This should be the content of the CAMAA plist
 * @param completionBlock is a standard (BOOL completed, NSError *error)block
 *
 * Successful exceution of the method will have completed as YES and error object is nil
 * In case of failure, completed is set to NO and error will have an NSError object with
 * domain, code and localizedDescription.
 *
 */
+ (void) initializeSDKWithOptions:(SDKOptions) options configDetails:(NSDictionary *)configDetails completionHandler:(void(^)(BOOL completed, NSError *error)) completionBlock;

/**
 * Initializes the SDK.
 * This call should be made as early as possible in the application life cycle.
 * Typically, it is made at the beginning of didFinishLaunchingWithOptions in
 * the Application delegate class
 *
 * @param options of the type SDKOptions.
 * @param completionBlock is a standard (BOOL completed, NSError *error)block.
 *
 * Successful exceution of the method will have completed as YES and error object is nil
 * In case of failure, completed is set to NO and error will have an NSError object with
 *  domain, code and localizedDescription.
 *
 */
+ (void) initializeSDKWithOptions:(SDKOptions) options completionHandler:(void(^)(BOOL completed, NSError *error)) completionBlock;

/**
 * Use this API to enable the SDK.
 * The SDK is enabled by default You need to call this API
 * only if you called disableSDK earlier
 *
 */
+ (void) enableSDK;

/**
 * Use this API to disable the SDK.
 * When disabled, the SDK no longer does any tracking of the application,
 * or user interaction.
 *
 */
+ (void) disableSDK;

/**
 * Use this API to determine if the SDK is enabled or not.
 *
 */
+ (BOOL) isSDKEnabled;

/**
 * Use this API to get the unique device ID generated by the SDK
 *
 */
+ (NSString *) deviceId;

/**
 * Use this API to get the customer ID for this session.
 * If the customer ID is not set, this API returns a null value.
 *
 */
+ (NSString *) customerId;

/**
 * Use this API to set the customer ID for this session.
 *
 * @param customerId is a string containing the customer ID
 *
 * If nil is passed, the customer iD is reset.
 *
 */
+ (SDKError) setCustomerId:(NSString *) customerId;

/**
 * Use this API to set a custom session attribute.
 *
 * @param name is a string containing the attribute name
 * @param value is string containing the attribute value
 *
 * Name and Value cannot be nil.
 * An SDKError value is returned.
 *
 */
+ (SDKError) setSessionAttribute:(NSString *) name withValue:(NSString *)value;

/**
 * Use this API to stop collecting potentially sensitive data.
 *
 *    - Screenshots
 *    - Location information including GPS and IP addresses
 *    - Value in the text entry fields
 *
 */
+ (void) enterPrivateZone;

/**
 * Use this API to start collecting all data again
 */
+ (void) exitPrivateZone;

/**
 * Use this API to determine if the SDK is in a private zone.
 *
 */
+ (BOOL) isInPrivateZone;

/**
 * Use this API to get the SDK computed APM header in key value format.
 * Returns nil if apm header cannot be computed.
 *
 */
+ (NSDictionary *) apmHeader;

/**
 * Use this API to add custom data to the SDK computed APM header.
 * @param data is a non-empty string in the form of "key=value".
 * data will be appended to the APM header separated by a semicolon (;).
 *
 */
+ (void) addToApmHeader:(NSString *)data;

/**
 * Use this API to set your delegate instance to handle auth challenges.
 * Use it when using the SDKUseNetworkProtocolSwizzling option.
 *
 * @param delegate is an iOS native object or module which responds to
 * the NSURLSessionDelegate protocols.
 *
 */
+ (void) setNSURLSessionDelegate:(id)delegate;

/**
 * Use this API to set the ssl pinning mode and array of pinned values.
 * This method expects an array of values depending on the pinningMode.
 *
 * Supported pinning modes:
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
 *
 */
+ (void) setSSLPinningMode:(CAMDOSSLPinningMode) pinningMode withValues:(NSArray*)pinnedValues;

/**
 * Use this API to stop the current session.
 * No data will be logged until the startSession API is called
 *
 */
+ (void) stopCurrentSession;

/**
 * Use this API to start a new session.
 * If a session is already in progress, it will be stopped
 * and new session will be started.
 *
 */
+ (void) startNewSession;

/**
 * Convenience API to stop the current session in progress and start a new session.
 * Equivalent to calling stopCurrentSession and startNewSession.
 *
 */
+ (void) stopCurrentAndStartNewSession;

/**
 * Use this API to start a transaction with a specific name
 *
 * @param transactionName is a string to indicate the transaction being processed
 * @param completionBlock is a standard (BOOL completed, NSError *error) block
 *
 * If successful, completed = YES and error is nil.
 * In case of failure, completed = NO and error will have NSError object with
 * domain, code and localizedDescription.
 *
 */
+ (void) startApplicationTransactionWithName:(NSString *) transactionName completionHandler:(void(^)(BOOL completed, NSError *error)) completionBlock;

/**
 * Use this API to start a transaction with a specific transactionName and serviceName
 * Completion block can be used to verify whether the transaction is started successfully
 *
 * @param transactionName is a string to indicate the transaction being processed
 * @param serviceName is a string to indicate the service or application being applied
 * @param completionBlock is a standard (BOOL completed, NSError *error) block
 *
 * If successful, completed = YES and error is nil.
 * In case of failure, completed = NO and error will have NSError object with
 * domain, code and localizedDescription.
 *
 */
+ (void) startApplicationTransactionWithName:(NSString *) transactionName service:(NSString *)serviceName completionHandler:(void(^)(BOOL completed, NSError *error)) completionBlock;

/**
 * Use this API to stop a transaction with a specific name
 * Completion block can be used to verify whether transaction is stopped successfully or not
 *
 * @param transactionName is a string to indicate the transaction being processed
 * @param completionBlock is a standard (BOOL completed, NSError *error) completionBlock
 *
 * If successful, completed = YES and error is nil.
 * In case of failure, completed = NO and error will have NSError object with
 * domain, code and localizedDescription.
 *
 */
+ (void) stopApplicationTransactionWithName:(NSString *) transactionName completionHandler:(void(^)(BOOL completed,NSError *error))completionBlock;

/**
 * Use this API to stop a transaction with a specific name and an optional failure string
 * Completion block can be used to verify whether transaction is stopped successfully or not
 *
 * @param transactionName is a string to indicate the transaction being processed
 * @param failure is a string to indicate the failure name, message or type
 * @param completionBlock is a standard (BOOL completed, NSError *error) completionBlock
 *
 * If successful, completed = YES and error is nil.
 * In case of failure, completed = NO and error will have NSError object with
 * domain, code and localizedDescription.
 *
 */

+ (void) stopApplicationTransactionWithName:(NSString *) transactionName failure:(NSString *) failure completionHandler:(void(^)(BOOL completed,NSError *error)) completionBlock;

/**
 * Use this API to provide feedback from the user after a crash
 *
 * @param feedback is a string containing any customer feedback for the crash
 *
 * The App has to register for CAMAA_CRASH_OCCURRED notification
 * and collect the feedback from the user while handling the notification
 *
 */
+ (void) setCustomerFeedback:(NSString *) feedback;

/**
 * Use this API to set Location of the Customer/User
 * using postalCode and countryCode.
 *
 * @param zip is the country's postal code, e.g. zip code in the US
 * @param country is the two letter international code for the country
 *
 */
+ (void) setCustomerLocation:(NSString *) zip andCountry:(NSString *) country;

#if TARGET_OS_TV == 0
/**
 * Use this API to set Location of the Customer/User
 * using a CLLocation with latitude and longitude
 *
 * @param location is a CLLocation object with latitude & longitude
 *
 */
+ (void) setCustomerLocation:(CLLocation *) location;
#endif

/**
 * Use this API to send a screen shot of the current screen
 *
 * @param name is a string to indicate the desired name for the screen, cannot be nil.
 * @param quality is number indicating the quality of the image between 0.0 and 1.0
 * @param completionBlock is a standard (BOOL completed, NSError *error) completionBlock
 *
 * The following values for imageQuality are defined:
 * - CAMAA_SCREENSHOT_QUALITY_HIGH
 * - CAMAA_SCREENSHOT_QUALITY_MEDIUM
 * - CAMAA_SCREENSHOT_QUALITY_LOW
 * - CAMAA_SCREENSHOT_QUALITY_DEFAULT
 *
 * The default value is CAMAA_SCREENSHOT_QUALITY_LOW.
 *
 * If successful, completed = YES and error is nil.
 * In case of failure, completed = NO and error will have NSError object with
 * domain, code and localizedDescription.
 *
 */
+ (void) sendScreenShot:(NSString *) name withQuality:(CGFloat) quality completionHandler:(void(^)(BOOL completed, NSError *error)) completionBlock;


+ (void) enableScreenShots:(BOOL) captureScreen;

/**
 * Use this API to create a custom app flow with dynamic views
 *
 * @param name is the name of the view that was loaded
 * @param loadTime is the time it took to load the view
 * @param completionBlock is a standard (BOOL completed, NSError *error) completionBlock
 *
 * If successful, completed = YES and error is nil.
 * In case of failure, completed = NO and error will have NSError object with
 * domain, code and localizedDescription.
 *
 */
+(void) viewLoaded:(NSString *) name loadTime:(CGFloat) loadTime completionHandler:(void(^)(BOOL completed, NSError *error)) completionBlock;


/**
 * Use this API to create a custom app flow with dynamic views and optionally capture the screen
 *
 * @param name is the name of the view that was loaded
 * @param loadTime is the time it took to load the view
 * @param screenCapture is a flag to indicate whether to capture the curren screen
 * @param completionBlock is a standard (BOOL completed, NSError *error) completionBlock
 *
 * If successful, completed = YES and error is nil.
 * In case of failure, completed = NO and error will have NSError object with
 * domain, code and localizedDescription.
 *
 */
+(void) viewLoaded:(NSString *) name loadTime:(CGFloat) loadTime screenShot:(BOOL) screenCapture completionHandler:(void(^)(BOOL completed, NSError *error)) completionBlock;

/**
 * Use this API to set the name of a view to be ignored
 *
 * @param viewName is the name of the view to be ignored
 *
 * Screenshots and transitions of the views that are in the
 * ignore list are not captured
 *
 */
+(void) ignoreView:(NSString *) viewName;


/**
 * Use this API to provide a list of view names to be ignored.
 *
 * @param viewNames is a list (an array) of names of the views to be ignored.
 *
 * Screenshots and transitions of the views that are in the
 * ignore list are not captured
 *
 */
+(void) ignoreViews:(NSSet *) viewNames;

/**
 * Use this API to determine if automatic screenshots are enabled by policy.
 * Returns YES if screenshots are enabled by policy.  Otherwise returns NO.
 *
 */
+ (BOOL) isScreenshotPolicyEnabled;

/**
 * Use this API to add a custom network event in the current session
 *
 * @param url is a string reprentation of the network URL to be logged
 * @param status is an integer value indicating the status, e.g. 200, 404, etc.
 * @param responseTime is an integer value representing the response time
 * @param inBytes is an integer value representing the number of bytes input
 * @param outBytes is an integer value representing the number of bytes output
 * @param completionBlock is a standard (BOOL completed, NSError *error) completionBlock
 *
 * If successful, completed = YES and error is nil.
 * In case of failure, completed = NO and error will have NSError object with
 * domain, code and localizedDescription.
 *
 */
+ (void) logNetworkEvent:(NSString *) url withStatus:(NSInteger) status withResponseTime:(int64_t) responseTime withInBytes:(int64_t) inBytes withOutBytes:(int64_t) outBytes completionHandler:(void(^)(BOOL completed, NSError *error)) completionBlock;

/**
 * Use this API to add a custom text metric in the current session
 *
 * @param name is a string to indicate a text metric name
 * @param value is a string to indicate a text metric value
 * @param attributes is a Map or Dictionary used to send any extra parameters
 * @param completionBlock is a standard (BOOL completed, NSError *error) completionBlock
 *
 * If successful, completed = YES and error is nil.
 * In case of failure, completed = NO and error will have NSError object with
 * domain, code and localizedDescription.
 *
 */
+ (void) logTextMetric:(NSString *) name withValue:(NSString *) value withAttributes:(NSMutableDictionary *) attributes completionHandler:(void(^)(BOOL completed, NSError *error)) completionBlock;

/**
 * Use this API to add a custom numeric metric value in the current session
 *
 * @param name is a string to indicate a numeric metric name
 * @param value is a numeric (double) value, e.g. 3.14159, 2048.95, or 42, etc.
 * @param attributes is a Map or Dictionary used to send any extra parameters
 * @param completionBlock is a standard (BOOL completed, NSError *error) completionBlock.
 *
 * If successful, completed = YES and error is nil.
 * In case of failure, completed = NO and error will have NSError object with
 * domain, code and localizedDescription.
 *
 */
+ (void) logNumericMetric:(NSString *) name withValue:(double) value withAttributes:(NSMutableDictionary *) attributes completionHandler:(void(^)(BOOL completed, NSError *error)) completionBlock;

/**
 * Use this API to force an upload event.
 * This is bulk/resource consuming operation and should be used with caution
 *
 * @param completionBlock with response as a Dictionary and an error object
 *
 * Returns:
 * - response is a key,value paired dictionary object with two keys:
 *   the Key 'CAMDOResponseKey' holds any URLResponse information
 *   the key 'CAMDOTotalUploadedEvents' holds the total number of events uploaded
 * - error is nil if the API call is successful, otherwise is an NSError object
 *   with domain, code and localizedDescription.
 *
 */
+ (void) uploadEventsWithCompletionHandler:(void (^)(NSDictionary *response, NSError *error)) completionBlock;


#pragma mark deprecated

/**
 * ** DEPRECATED **
 * Returns the default session configuration to use when constructing
 * NSURLSession with your own delegate
 */
+ (NSURLSessionConfiguration *) getDefaultNSURLSessionConfiguration __attribute((deprecated("No longer required")));



//Auxiliary TroubleShooting Methods :

- (BOOL) startApplicationTransactionAuto:(NSString *) transactionName withServiceName:(NSString *)  serviceName;
- (BOOL) stopApplicationTransactionAuto:(NSString *) transactionName;

#pragma mark UI Components event
+ (void) logUIEvent:(NSString *) eventType withValue:(NSString *) value;
@end

#endif /* CAMDOReporter_h */
