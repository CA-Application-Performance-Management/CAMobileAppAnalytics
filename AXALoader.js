var exec = require('cordova/exec');

function CAMAA() {}


/**
 *  This is the interface
 */
CAMAA.prototype.enableSDK = function(success,failure){};
CAMAA.prototype.disableSDK  = function(success,failure){};
CAMAA.prototype.isSDKEnabled  = function(success,failure){};
CAMAA.prototype.deviceId  = function(success,failure){};
CAMAA.prototype.setUserFeedback  = function(feedback,success,failure){};
CAMAA.prototype.setCrashFeedback  = function(feedback,success,failure){};
CAMAA.prototype.customerId = function(success,failure){};
CAMAA.prototype.setCustomerId = function(str,success,failure){};
CAMAA.prototype.enterPrivateZone  = function(success,failure){};
CAMAA.prototype.exitPrivateZone  = function(success,failure){};
CAMAA.prototype.isInPrivateZone  = function(success,failure){};
CAMAA.prototype.apmHeader  = function(success,failure){};
CAMAA.prototype.stopCurrentSession  = function(success,failure){};
CAMAA.prototype.startNewSession  = function(success,failure){};
CAMAA.prototype.stopCurrentAndStartNewSession  = function(success,failure){};
CAMAA.prototype.addToApmHeader  = function(strDate,success,failure){};
CAMAA.prototype.setCustomerFeedback  = function(strFeedback,success,failure){};
CAMAA.prototype.setSessionAttribute = function(strName,strVal,success,failure){};
CAMAA.prototype.setCustomerLocation = function(numLatitude,numLongitutde,success,failure){};
CAMAA.prototype.startApplicationTransactionWithName = function(strName,success,failure){};
CAMAA.prototype.stopApplicationTransactionWithName = function(strName,success,failure){};
CAMAA.prototype.startApplicationTransactionWithNameWithServiceName = function(strName,strService,success,failure){};
CAMAA.prototype.stopApplicationTransactionWithNameAndFailure = function(strName,strFailure,success,failure){};
CAMAA.prototype.isScreenshotPolicyEnabled  = function(success,failure){};
CAMAA.prototype.setCustomerLocationWithCountry = function(strLoc,strCountry,success,failure){};
CAMAA.prototype.ignoreView = function(strView,success,failure){};
CAMAA.prototype.ignoreViews = function(listOfStringNames,success,failure){};
CAMAA.prototype.sendScreenShot = function(strName,floatQuality,success,failure){};
CAMAA.prototype.viewLoaded = function(strName,floatTime,success,failure){};
CAMAA.prototype.logNetworkEvent = function(strURL,intStatus,intResponseTime,intIncomingBytes,intOutgoingBytes,success,failure){};
CAMAA.prototype.logTextMetric = function(strName,strVal,dictionaryAttributes,success,failure){};
CAMAA.prototype.logNumericMetric = function(strName,doubleVal,dictionaryAttributes,success,failure){};
CAMAA.prototype.uploadEventsWithCompletionHandler = function(success,failure){};


/**
 * This is the implementation
 */
CAMAA.prototype.enableSDK = function(success,failure){  cordova.exec(success, failure, 'CAMAAInitializer', 'enableSDK', []);};
CAMAA.prototype.disableSDK  = function(success,failure){  cordova.exec(success, failure, 'CAMAAInitializer', 'disableSDK', []);};
CAMAA.prototype.isSDKEnabled  = function(success,failure){  cordova.exec(success, failure, 'CAMAAInitializer', 'isSDKEnabled', []);};
CAMAA.prototype.deviceId  = function(success,failure){  cordova.exec(success, failure, 'CAMAAInitializer', 'deviceId', []);};
CAMAA.prototype.setUserFeedback  = function(p1,success,failure){cordova.exec(success, failure, 'CAMAAInitializer', 'setUserFeedback', [p1]);};
CAMAA.prototype.setCrashFeedback  = function(p1,success,failure){cordova.exec(success, failure, 'CAMAAInitializer', 'setCrashFeedback', [p1]);};
CAMAA.prototype.customerId = function(success,failure){  cordova.exec(success, failure, 'CAMAAInitializer', 'customerId', []);};
CAMAA.prototype.enterPrivateZone  = function(success,failure){  cordova.exec(success, failure, 'CAMAAInitializer', 'enterPrivateZone', []);};
CAMAA.prototype.exitPrivateZone  = function(success,failure){  cordova.exec(success, failure, 'CAMAAInitializer', 'exitPrivateZone', []);};
CAMAA.prototype.isInPrivateZone  = function(success,failure){  cordova.exec(success, failure, 'CAMAAInitializer', 'isInPrivateZone', []);};
CAMAA.prototype.apmHeader  = function(success,failure){  cordova.exec(success, failure, 'CAMAAInitializer', 'apmHeader', []);};
CAMAA.prototype.stopCurrentSession  = function(success,failure){  cordova.exec(success, failure, 'CAMAAInitializer', 'stopCurrentSession', []);};
CAMAA.prototype.startNewSession  = function(success,failure){  cordova.exec(success, failure, 'CAMAAInitializer', 'startNewSession', []);};
CAMAA.prototype.isScreenshotPolicyEnabled  = function(success,failure){  cordova.exec(success, failure, 'CAMAAInitializer', 'isScreenshotPolicyEnabled', []);};
CAMAA.prototype.uploadEventsWithCompletionHandler = function(success,failure){  cordova.exec(success, failure, 'CAMAAInitializer', 'uploadEventsWithCompletionHandler', []);};
CAMAA.prototype.stopCurrentAndStartNewSession  = function(success,failure){  cordova.exec(success, failure, 'CAMAAInitializer', 'stopCurrentAndStartNewSession', []);};

CAMAA.prototype.addToApmHeader  = function(p1,success,failure){cordova.exec(success, failure, 'CAMAAInitializer', 'addToApmHeader', [p1]);};
CAMAA.prototype.setCustomerId = function(p1,success,failure){cordova.exec(success, failure, 'CAMAAInitializer', 'setCustomerId', [p1]);};
CAMAA.prototype.setCustomerFeedback  = function(p1,success,failure){cordova.exec(success, failure, 'CAMAAInitializer', 'setCustomerFeedback', [p1]);};
CAMAA.prototype.startApplicationTransactionWithName = function(p1,success,failure){cordova.exec(success, failure, 'CAMAAInitializer', 'startApplicationTransactionWithName', [p1]);};
CAMAA.prototype.stopApplicationTransactionWithName = function(p1,success,failure){cordova.exec(success, failure, 'CAMAAInitializer', 'stopApplicationTransactionWithName', [p1]);};
CAMAA.prototype.ignoreView = function(p1,success,failure){cordova.exec(success, failure, 'CAMAAInitializer', 'ignoreView', [p1]);};
CAMAA.prototype.ignoreViews = function(p1,success,failure){cordova.exec(success, failure, 'CAMAAInitializer', 'ignoreViews', [p1]);};

CAMAA.prototype.setSessionAttribute = function(p1,p2,success,failure){cordova.exec(success, failure, 'CAMAAInitializer', 'setSessionAttribute', [p1,p2]);};
CAMAA.prototype.setCustomerLocation = function(p1,p2,success,failure){cordova.exec(success, failure, 'CAMAAInitializer', 'setCustomerLocation', [p1,p2]);};
CAMAA.prototype.startApplicationTransactionWithNameWithServiceName = function(p1,p2,success,failure){cordova.exec(success, failure, 'CAMAAInitializer', 'startApplicationTransactionWithNameWithServiceName', [p1,p2]);};
CAMAA.prototype.stopApplicationTransactionWithNameAndFailure = function(p1,p2,success,failure){cordova.exec(success, failure, 'CAMAAInitializer', 'stopApplicationTransactionWithNameAndFailure', [p1,p2]);};
CAMAA.prototype.setCustomerLocationWithCountry = function(p1,p2,success,failure){cordova.exec(success, failure, 'CAMAAInitializer', 'setCustomerLocationWithCountry', [p1,p2]);};
CAMAA.prototype.sendScreenShot = function(p1,p2,success,failure){cordova.exec(success, failure, 'CAMAAInitializer', 'sendScreenShot', [p1,p2]);};
CAMAA.prototype.viewLoaded = function(p1,p2,success,failure){cordova.exec(success, failure, 'CAMAAInitializer', 'viewLoaded', [p1,p2]);};

CAMAA.prototype.logTextMetric = function(p1,p2,p3,success,failure){cordova.exec(success, failure, 'CAMAAInitializer', 'logTextMetric', [p1,p2,p3]);};
CAMAA.prototype.logNumericMetric = function(p1,p2,p3,success,failure){cordova.exec(success, failure, 'CAMAAInitializer', 'logNumericMetric', [p1,p2,p3]);};
CAMAA.prototype.logNetworkEvent = function(p1,p2,p3,p4,p5,success,failure){cordova.exec(success, failure, 'CAMAAInitializer', 'logNetworkEvent', [p1,p2,p3,p4,p5]);};

module.exports = new CAMAA();