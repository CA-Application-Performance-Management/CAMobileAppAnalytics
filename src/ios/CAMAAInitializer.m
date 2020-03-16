#include "CAMAAInitializer.h"


@implementation CAMAAInitializer

#define isArgValidString(command,location) \
    if(command.arguments.count <= location || !([[command.arguments objectAtIndex:location] isKindOfClass:[NSString class]])){ \
CDVPluginResult * pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[NSString stringWithFormat:@"Argument[%d] was not a valid string",location]];\
[self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId]; \
        return; \
    }
#define isArgValidNumber(command,location)\
    if(command.arguments.count <= location || !([[command.arguments objectAtIndex:location] isKindOfClass:[NSNumber class]])){\
        CDVPluginResult * pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[NSString stringWithFormat:@"Argument[%d] was not a valid number",location]];\
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];\
        return;\
    }
#define isArgValidDictionary(command,location)\
    if(command.arguments.count <= location || !([[command.arguments objectAtIndex:location] isKindOfClass:[NSMutableDictionary class]])){\
        CDVPluginResult * pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[NSString stringWithFormat:@"Argument[%d] was not a valid dictionary",location] ] ;\
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];\
        return;\
    }
#define successfulCall() \
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];\
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId]

#define successfulCallWithBool(res) \
    CDVPluginResult *pluginResult =  [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:res];\
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId]

#define successfulCallWithString(res) \
    CDVPluginResult *pluginResult =  [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:res];\
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId]

#define SDKErrorCall(e) \
    CDVPluginResult *pluginResult;\
    if (e != ErrorNone) {\
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];\
    } else {\
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];\
    }\
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId]

#define handleCompletionWith(completed,error)\
    CDVPluginResult *pluginResult;\
        if (error) {\
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:error.description];\
        } else {\
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:completed];\
        }\
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId]
// helper methods


// - (void)pluginInitialize {
//               [CAMDOReporter initializeSDKWithOptions:SDKUseNetworkProtocolSwizzling completionHandler:nil];
//                NSLog(@"SDK Initialized from CAMAAInitalizer");
//
//}

- (void)enableSDK:(CDVInvokedUrlCommand *)command {
        [self.commandDelegate runInBackground:^{
            [CAMDOReporter enableSDK];
            successfulCall();
        }];

}

- (void)disableSDK:(CDVInvokedUrlCommand *)command {
    [CAMDOReporter disableSDK];
    successfulCall();
}

- (void)isSDKEnabled:(CDVInvokedUrlCommand *)command {
    BOOL res = [CAMDOReporter isSDKEnabled];
    successfulCallWithBool(res);
}

- (void)deviceId:(CDVInvokedUrlCommand *)command {
    NSString *res = [CAMDOReporter deviceId];
    successfulCallWithString(res);
}

- (void)customerId:(CDVInvokedUrlCommand *)command {
    NSString *res = [CAMDOReporter customerId];
    successfulCallWithString(res);
}

- (void)setCustomerId:(CDVInvokedUrlCommand *)command {
    isArgValidString(command, 0);
    NSString *res = [command.arguments objectAtIndex:0];
    SDKError e = [CAMDOReporter setCustomerId:res];
    SDKErrorCall(e);
}






- (void)enterPrivateZone:(CDVInvokedUrlCommand *)command {
    [CAMDOReporter enterPrivateZone];
    successfulCall();
}



- (void)exitPrivateZone:(CDVInvokedUrlCommand *)command {


    [CAMDOReporter exitPrivateZone];
    successfulCall();
}

- (void)isInPrivateZone:(CDVInvokedUrlCommand *)command {
    BOOL res = [CAMDOReporter isInPrivateZone];
    successfulCallWithBool(res);
}

- (void)apmHeader:(CDVInvokedUrlCommand *)command {
    NSDictionary *res = [CAMDOReporter apmHeader];
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:res];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)stopCurrentSession:(CDVInvokedUrlCommand *)command {
    [CAMDOReporter stopCurrentSession];
    successfulCall();
}

- (void)startNewSession:(CDVInvokedUrlCommand *)command {
    [CAMDOReporter startNewSession];
    successfulCall();

}

- (void)stopCurrentAndStartNewSession:(CDVInvokedUrlCommand *)command {
    [CAMDOReporter stopCurrentAndStartNewSession];
    successfulCall();
}

- (void)addToApmHeader:(CDVInvokedUrlCommand *)command {
    isArgValidString(command, 0);
    NSString *res = [command.arguments objectAtIndex:0];
    [CAMDOReporter addToApmHeader:res];
    successfulCall();
}

//-(void) setNSURLSessionDelegate : (CDVInvokedUrlCommand*) command{}
- (void)setCustomerFeedback:(CDVInvokedUrlCommand *)command {
    isArgValidString(command, 0);
    NSString *res = [command.arguments objectAtIndex:0];
    [CAMDOReporter setCustomerFeedback:res];
    successfulCall();
}

- (void)setSessionAttribute:(CDVInvokedUrlCommand *)command {
    isArgValidString(command, 0);
    isArgValidString(command, 1);
    NSString *res = [command.arguments objectAtIndex:0];
    NSString *res2 = [command.arguments objectAtIndex:1];
    SDKError e = [CAMDOReporter setSessionAttribute:res withValue:res2];
    SDKErrorCall(e);

}
//-(void) setSSLPinningMode: (CDVInvokedUrlCommand*) command{}

- (void)setCustomerLocationWithCountry:(CDVInvokedUrlCommand *)command {
    isArgValidString(command, 0);
    isArgValidString(command, 1);
    NSString *res = [command.arguments objectAtIndex:0];
    NSString *res2 = [command.arguments objectAtIndex:1];
    [CAMDOReporter setCustomerLocation:res andCountry:res2];
    successfulCall();
}

- (void)startApplicationTransactionWithName:(CDVInvokedUrlCommand *)command {
    isArgValidString(command, 0);
    NSString *res = [command.arguments objectAtIndex:0];
    [self.commandDelegate runInBackground:^{
        [CAMDOReporter startApplicationTransactionWithName:res completionHandler:^(BOOL completed, NSError *error) {
            handleCompletionWith(completed,error);

        }];
    }];
}

- (void)stopApplicationTransactionWithName:(CDVInvokedUrlCommand *)command {
    isArgValidString(command, 0);
    NSString *res = [command.arguments objectAtIndex:0];
    [self.commandDelegate runInBackground:^{
        [CAMDOReporter stopApplicationTransactionWithName:res completionHandler:^(BOOL completed, NSError *error) {
            handleCompletionWith(completed,error);
        }];
    }];
}

- (void)startApplicationTransactionWithNameWithServiceName:(CDVInvokedUrlCommand *)command {
    isArgValidString(command, 0);
    isArgValidString(command, 1);
    NSString *res = [command.arguments objectAtIndex:0];
    NSString *res2 = [command.arguments objectAtIndex:1];
    [self.commandDelegate runInBackground:^{
        [CAMDOReporter startApplicationTransactionWithName:res service:res2 completionHandler:^(BOOL completed, NSError *error) {
            handleCompletionWith(completed,error);
        }];
    }];
}

- (void)stopApplicationTransactionWithNameAndFailure:(CDVInvokedUrlCommand *)command {
    isArgValidString(command, 0);
    isArgValidString(command, 1);
    NSString *res = [command.arguments objectAtIndex:0];
    NSString *res2 = [command.arguments objectAtIndex:1];
    [self.commandDelegate runInBackground:^{
        [CAMDOReporter stopApplicationTransactionWithName:res failure:res2 completionHandler:^(BOOL completed, NSError *error) {
            handleCompletionWith(completed,error);
        }];
    }];
}

- (void)isScreenshotPolicyEnabled:(CDVInvokedUrlCommand *)command {
    BOOL res = [CAMDOReporter isScreenshotPolicyEnabled];
    successfulCallWithBool(res);
}
-(void) setCustomerLocation:(CDVInvokedUrlCommand*) command{
    isArgValidNumber(command, 0);
    isArgValidNumber(command, 1);
    CLLocationDegrees lat = [[command.arguments objectAtIndex:0] doubleValue];
    CLLocationDegrees lon = [[command.arguments objectAtIndex:1] doubleValue];
    CLLocation * loc = [[CLLocation alloc]initWithLatitude:lat longitude:lon];
    [CAMDOReporter setCustomerLocation:loc];
    successfulCall();
}
- (void)ignoreView:(CDVInvokedUrlCommand *)command {
    isArgValidString(command, 0);
    NSString *res = [command.arguments objectAtIndex:0];
    [CAMDOReporter ignoreView:res];
    successfulCall();

}

- (void)ignoreViews:(CDVInvokedUrlCommand *)command {
    NSArray *res = command.arguments;
    NSSet * theSet = [NSSet setWithArray:res];
    if(theSet == nil){
        [CAMDOReporter ignoreViews:theSet];
        CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"argument was not an array"];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }else{
        [CAMDOReporter ignoreViews:theSet];
        CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }

}

- (void)sendScreenShot:(CDVInvokedUrlCommand *)command {
    isArgValidString(command, 0);
    isArgValidNumber(command, 1);
    NSString *res = [command.arguments objectAtIndex:0];
    NSNumber *res2 = [command.arguments objectAtIndex:1];
    [CAMDOReporter sendScreenShot:res withQuality:[res2 floatValue] completionHandler:^(BOOL completed, NSError *error) {
        handleCompletionWith(completed,error);
    }];

}

- (void)viewLoaded:(CDVInvokedUrlCommand *)command {
    isArgValidString(command, 0);
    isArgValidNumber(command, 1);
    NSString *res = [command.arguments objectAtIndex:0];
    NSNumber *res2 = [command.arguments objectAtIndex:1];

    [CAMDOReporter viewLoaded:res loadTime:[res2 floatValue] completionHandler:^(BOOL completed, NSError *error) {
        handleCompletionWith(completed,error);
    }];
}

- (void)logNetworkEvent:(CDVInvokedUrlCommand *)command {
    isArgValidString(command, 0);
    isArgValidNumber(command, 1);
    isArgValidNumber(command, 2);
    isArgValidNumber(command, 3);
    isArgValidNumber(command, 4);
    NSString *res = [command.arguments objectAtIndex:0];
    NSNumber *res2 = [command.arguments objectAtIndex:1];
    NSNumber *res3 = [command.arguments objectAtIndex:2];
    NSNumber *res4 = [command.arguments objectAtIndex:3];
    NSNumber *res5 = [command.arguments objectAtIndex:4];
    [self.commandDelegate runInBackground:^{

        [CAMDOReporter logNetworkEvent:res withStatus:[res2 integerValue] withResponseTime:[res3 integerValue] withInBytes:[res4 integerValue] withOutBytes:[res5 integerValue] completionHandler:^(BOOL completed, NSError *error) {
            handleCompletionWith(completed,error);
        }];
    }];
}

- (void)logTextMetric:(CDVInvokedUrlCommand *)command {
    NSString *res = [command.arguments objectAtIndex:0];
    NSString *res2 = [command.arguments objectAtIndex:1];
    NSMutableDictionary *res3 = [command.arguments objectAtIndex:2];
    [self.commandDelegate runInBackground:^{
        [CAMDOReporter logTextMetric:res withValue:res2 withAttributes:res3 completionHandler:^(BOOL completed, NSError *error) {
            handleCompletionWith(completed,error);
        }];
    }];

}

- (void)logNumericMetric:(CDVInvokedUrlCommand *)command {
    NSString *res = [command.arguments objectAtIndex:0];
    NSNumber *res2 = [command.arguments objectAtIndex:1];
    NSMutableDictionary *res3 = [command.arguments objectAtIndex:2];
    [self.commandDelegate runInBackground:^{
        [CAMDOReporter logNumericMetric:res withValue:[res2 floatValue] withAttributes:res3 completionHandler:^(BOOL completed, NSError *error) {
            handleCompletionWith(completed,error);
        }];
    }];
}

- (void)uploadEventsWithCompletionHandler:(CDVInvokedUrlCommand *)command {

    [self.commandDelegate runInBackground:^{
        [CAMDOReporter uploadEventsWithCompletionHandler:^(NSDictionary *response, NSError *error) {

            CDVPluginResult *pluginResult;//=[CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
            if (error) {
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:error.description];
            } else {
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:response];
            }
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];

        }];
    }];
}





@end
