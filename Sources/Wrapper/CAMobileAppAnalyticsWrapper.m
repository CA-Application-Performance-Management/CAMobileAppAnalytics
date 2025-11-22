//
//  CAMobileAppAnalyticsWrapper.m
//  CAMobileAppAnalytics
//
//  Created by Aruna Kumari Yarra on 22/11/25.
//

#import "CAMobileAppAnalyticsWrapper.h"

@implementation CAMobileAppAnalyticsWrapper

+ (NSString *)getDeviceId {
    return [CAMDOReporter deviceId];
}

@end
