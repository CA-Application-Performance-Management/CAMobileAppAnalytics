#import <Cordova/CDVPlugin.h>
#import <Cordova/CDVInvokedUrlCommand.h>
#import "CAMDOReporter.h"
#import <Cordova/CDVPlugin.h>
#import <Cordova/CDVInvokedUrlCommand.h>
#import "CAMDOReporter.h"
@interface CAMAAInitializer: CDVPlugin



//+ (void) enableSDK;
-(void) enableSDK: (CDVInvokedUrlCommand*)command;
-(void) disableSDK : (CDVInvokedUrlCommand*) command;
-(void) isSDKEnabled : (CDVInvokedUrlCommand*) command;
-(void) deviceId :(CDVInvokedUrlCommand*) command;
-(void) customerId: (CDVInvokedUrlCommand*) command;
-(void) setCustomerId:(CDVInvokedUrlCommand*) command;
-(void) enterPrivateZone : (CDVInvokedUrlCommand*) command;
-(void) exitPrivateZone : (CDVInvokedUrlCommand*) command;
-(void) isInPrivateZone : (CDVInvokedUrlCommand*) command;
-(void) apmHeader : (CDVInvokedUrlCommand*) command;
-(void) stopCurrentSession : (CDVInvokedUrlCommand*) command;
-(void) startNewSession : (CDVInvokedUrlCommand*) command;
-(void) stopCurrentAndStartNewSession : (CDVInvokedUrlCommand*) command;
-(void) addToApmHeader : (CDVInvokedUrlCommand*) command;
//-(void) setNSURLSessionDelegate : (CDVInvokedUrlCommand*) command;
-(void) setCustomerFeedback : (CDVInvokedUrlCommand*) command;

-(void) setSessionAttribute: (CDVInvokedUrlCommand*) command;
//-(void) setSSLPinningMode: (CDVInvokedUrlCommand*) command;
-(void) setCustomerLocation: (CDVInvokedUrlCommand*) command;
-(void) startApplicationTransactionWithName: (CDVInvokedUrlCommand*) command;
-(void) stopApplicationTransactionWithName: (CDVInvokedUrlCommand*) command;
-(void) startApplicationTransactionWithNameWithServiceName: (CDVInvokedUrlCommand*) command;
-(void) stopApplicationTransactionWithNameAndFailure: (CDVInvokedUrlCommand*) command;

-(void) isScreenshotPolicyEnabled :(CDVInvokedUrlCommand*) command;
-(void) setCustomerLocationWithCountry:(CDVInvokedUrlCommand*) command;
-(void) ignoreView:(CDVInvokedUrlCommand*) command;
-(void) ignoreViews:(CDVInvokedUrlCommand*) command;
-(void) sendScreenShot:(CDVInvokedUrlCommand*) command;
-(void) viewLoaded:(CDVInvokedUrlCommand*) command;
-(void) logNetworkEvent:(CDVInvokedUrlCommand*) command;
-(void) logTextMetric:(CDVInvokedUrlCommand*) command;
-(void) logNumericMetric:(CDVInvokedUrlCommand*) command;
-(void) uploadEventsWithCompletionHandler:(CDVInvokedUrlCommand*) command;
#pragma mark deprecated

@end