/**
 * @file Javascript Integration apis for CA-MAA-SDK.
 * @copyright Copyright (C) 2015, CA.  All rights reserved.
 *
 * @global
 * @name CaMDOIntegration
 */

/**
 * CaMDOIntegaration all apis call takes callback function as parameter.
 * Callback function will be inovked from Native SDK after finishing api call.
 * Callback function takes 3 parameters : function callback(action,returnValue,error);
 *
 * @callback callback
 * @param {string} action
 * @param {string} returnValue
 * @param {string} error
 *
 */
CaMDOIntegration = {}


CaMDOIntegration.quality = {high:"30",medium:"20",low:"15" ,default_:"-1"};


/**
 * @function isScreenshotPolicyEnabled
 * @description Returns TRUE if screenshots are enabled by policy.  Otherwise return FALSE
 *      @example
 *      CaMDOIntegration.isScreenshotPolicyEnabled(callback);
 */
CaMDOIntegration.isScreenshotPolicyEnabled = function(callback) {
    var dictionary = {};
    dictionary.action = "isScreenshotPolicyEnabled";
    dictionary.callback = callback;
    sendIntegrationEvent(dictionary);
};


/**
 * @function sendScreenshot
 * @description Takes screenshot of current screen and adds an event to analytics.
 * @param {string} screenName - name of the screen for which screenshot will be taken.
 * @param {CaMDOIntegration.quality} quality - Quality of the screenshot to be taken. You can use CaMDOIntegration.quality.high ,CaMDOIntegration.quality.medium , CaMDOIntegration.quality.low
 * @param {callback} callback - callback.
 *      @example
 *      CaMDOIntegration.sendScreenShot("Shopping",CaMDOIntegration.quality.medium,callback);
 */

CaMDOIntegration.sendScreenShot = function(screenName,quality,callback) {
    var dictionary = {};
    dictionary.action = "sendScreenShot";
    dictionary.screenname = screenName;
    dictionary.quality = quality;
    dictionary.callback = callback;
    sendIntegrationEvent(dictionary);
};

/**
 * @function    logTextMetrics
 * @description adds a text metrics to the current session.
 * @param {SessionEvent}  - Event object
 * @param {callback} - callback
 *
 *
 *
 *
 * Usage example :
 * @example
 *  CaMDOIntegration.logTextMetrics({
 *        "key" : "key",
 *        "value": "value"},callback);
 *
 *   With attributes :
 *   @example
 *  CaMDOIntegration.logTextMetrics({
 *        "key" : "key",
 *        "value": "value",
 *        "attributes" : { "k" : "v" }
 *       },callback);
 *
 *
 *
 */
CaMDOIntegration.logTextMetrics = function(eventObj, callback) {
    if (!eventObj) {
        return;
    }

    var key = eventObj.key;
    var value = eventObj.value;
    var attributes = eventObj.attributes;

    if (key && value) {
        var dictionary = {};
        dictionary.action = "logTextMetric";
        dictionary.key = key;
        dictionary.value = value;
        dictionary.callback = callback;
        if(attributes) {
            dictionary.attributes = attributes;
        }
        sendIntegrationEvent(dictionary);

    }
};

/**
 * @function    logNumericMetrics
 * @description adds a numeric metrics to the current session.
 * @param {SessionEvent}  - Event object
 * @param {callback} - callback
 *
 *
 *
 *
 * Usage example :
 * @example
 *  CaMDOIntegration.logNumericMetrics({
 *        "key" : "key",
 *        "value": "value"},callback);
 *
 *   With attributes :
 *   @example
 *  CaMDOIntegration.logNumericMetrics({
 *        "key" : "key",
 *        "value": value,
 *        "attributes" : { "k" : "v" }
 *       },callback);
 *
 *
 *
 */
CaMDOIntegration.logNumericMetrics = function(eventObj, callback) {
    if (!eventObj) {
        return;
    }

    var key = eventObj.key;
    var value = eventObj.value;
    var attributes = eventObj.attributes;

    if (key && value) {
        var dictionary = {};
        dictionary.action = "logNumericMetric";
        dictionary.key = key;
        dictionary.value = value;
        dictionary.callback = callback;
        if(attributes) {
            dictionary.attributes = attributes;
        }
        sendIntegrationEvent(dictionary);

    }
};


/**
 * @function    setCustomerLocation
 * @description Sets the location of the device
 * @param {Location}  - Location object
 * @param {callback} - callback
 *
 *    @example
 *    CaMDOIntegration.setCustomerLocation({
 *        "zipCode" : "94063",
 *       "countryCode" : "US",
 *     },callback);
 *
 *
 */

CaMDOIntegration.setCustomerLocation = function(locationObj, callback) {
    if (locationObj) {

        var dictionary = {};
        dictionary.action = "setCustomerLocation";
        dictionary.zipcode = locationObj.zipCode
        dictionary.countryCode = locationObj.countryCode;
        dictionary.latitude = locationObj.latitude;
        dictionary.longitude = locationObj.longitude;
        if (callback) {
            dictionary.callback = callback;
        }
        sendIntegrationEvent(dictionary);
    } else {
        //console.error("CaMDOIntegration:: Location is missing.")
    }

};


/**
 * @function    setCustomerId
 * @description Sets the Customer ID
 * @param {Location}  - Location object
 * @param {callback} - callback
 *
 *    @example
 *    CaMDOIntegration.setCustomerId("user1",callback);
 *
 *
 */

CaMDOIntegration.setCustomerId = function(customerId, callback) {
    if (customerId) {
        var dictionary = {};
        dictionary.action = "setSessionAttribute";
        dictionary.type = "customerId";
        dictionary.key = "customerId";
        dictionary.value = customerId;
        if (!dictionary.type) {
            return;
        }
        if (!dictionary.value) {
            return;
        }
        if (callback) {
            dictionary.callback = callback;
        }
        sendIntegrationEvent(dictionary);

    } else {
        //console.error("CaMDOIntegration:: sessionInfo is missing.");
    }

};


/**
 * @function    setSessionAttribute
 * @description Set session information with the value.  If type is customerId, deviceID is replaced
 * @param {SessionInfo}  - Location object
 * @param {callback} - callback
 *
 *  @example
 *  CaMDOIntegration.setSessionAttribute({
 *    "key"  : "exampleKey",
 *    "value": "exampleValue",
 *   },callback);
 *
 *
 */

CaMDOIntegration.setSessionAttribute = function(sessionInfo, callback) {

    if (sessionInfo) {
        var dictionary = {};
        dictionary.action = "setSessionAttribute";
        dictionary.type = "string";
        dictionary.key = sessionInfo.key;
        dictionary.value = sessionInfo.value;
        if (!dictionary.value) {
            //console.error("CaMDOIntegration:: value is required in sessionInfo");
            return;
        }
        if (callback) {
            dictionary.callback = callback;
        }
        sendIntegrationEvent(dictionary);

    } else {
        //console.error("CaMDOIntegration:: sessionInfo is missing.");
    }

};


/**
 * @function    startApplicationTransaction
 * @description Starts a new application transaction that bounds all the subsequent events.Application name is used as the service name
 *
 * @param {Transaction}  - Transaction Object
 * @param {callback} - callback
 * @example
 * CaMDOIntegration.startApplicationTransaction({
 * "transactionName" : "itemAddedToShoppingCart",
 * "serviceName" : "CheckoutScreen"
 *    },callback);
 *
 *
 */
CaMDOIntegration.startApplicationTransaction = function(transactionObj, callback) {

    if (transactionObj) {
        if (!transactionObj.transactionName) {
            //console.error("CaMDOIntegration:: transactionName is required in transactionObj");
            return;
        }
        var dictionary = {};
        var callback, serviceName;
        dictionary.action = "startApplicationTransaction";
        dictionary.transactionName = transactionObj.transactionName;

        if (callback) {
            dictionary.callback = callback;
        }
        if (transactionObj.serviceName) {
            dictionary.serviceName = transactionObj.serviceName;
        }
        sendIntegrationEvent(dictionary);
    } else {
        //console.error("CaMDOIntegration:: transactionObj is missing.");
    }

};


/**
 * @function    stopApplicationTransaction
 * @description Stops the application transaction.  Subsequent events will be part of the previous transaction
 * if there is one.
 *
 * @param {Transaction}  - Transaction Object
 * @param {callback} - callback
 *
 * @example
 * CaMDOIntegration.stopApplicationTransaction({
 * "transactionName" : "itemAddedToShoppingCart",
 * "serviceName" : "CheckoutScreen",
 * "failure" : "Cart was deleted."
 *    },callback);

 */

CaMDOIntegration.stopApplicationTransaction = function(transactionObj, callback) {
    if (transactionObj) {
        var dictionary = {};
        dictionary.action = "stopApplicationTransaction";
        dictionary.transactionName = transactionObj.transactionName;


        if (!dictionary.transactionName) {
            //console.error("CaMDOIntegration:: transactionName is required in transactionObj");
            return;
        }
        if (callback) {
            dictionary.callback = callback;
        }
        if (transactionObj.serviceName) {
            dictionary.serviceName = transactionObj.serviceName;
        }
        if (transactionObj.failure) {
            dictionary.failure = transactionObj.failure;
        }
        sendIntegrationEvent(dictionary);

    } else {
        //console.error("CaMDOIntegration:: transactionObj is missing.");
    }
    return true;
};


/**
 * @function setCustomerFeedback
 * @description sets the feedback from the user.
 * @param {string } feedback - Feedback to be sent
 * @param {callback} callback - callback
 *       @example
 *       CaMDOIntegration.setCustomerFeedback("Users feedback about app",callback);
 */
CaMDOIntegration.setCustomerFeedback = function(feedback, callback) {
    if (!feedback) {
        //console.error("feedback is missing.");
        return;
    }
    var dictionary = {};
    dictionary.feedback = feedback;
    dictionary.action = "setCustomerFeedback";
    if (callback) {
        dictionary.callback = callback;
    }
    sendIntegrationEvent(dictionary);
};


/**
 * @function isSDKEnabled
 * @description Checks if SDK is enabled or not
 * @param {callback} - callback (Required)
 * @example
 * CaMDOIntegration.isSDKEnabled(callback);
 */
CaMDOIntegration.isSDKEnabled = function(callback) {
    var dictionary = {};
    dictionary.action = "isSDKEnabled";
    if (callback) {
        dictionary.callback = callback;
        sendIntegrationEvent(dictionary);
    } else {
        //console.error("CaMDOIntegration:: callback is required to return value from isSDKEnabled() call. ");
    }

};


/**
 * @function isInPrivateZone
 * @description Checks if app is in private zone state.
 * @param {callback} - callback (Required)
 * @example
 * CaMDOIntegration.isInPrivateZone(callback);
 */
CaMDOIntegration.isInPrivateZone = function(callback) {
    var dictionary = {};
    dictionary.action = "isInPrivateZone";
    if (callback) {
        dictionary.callback = callback;
        sendIntegrationEvent(dictionary);
    } else {
        //console.error("CaMDOIntegration:: callback is required to return value from isInPrivateZone() call. ");
    }
};


/**
 * @function getAPMHeaders
 * @description Returns Headers for tracking Network calls in APM.
 * @param {callback} - callback (Required)
 * @example
 * CaMDOIntegration.getAPMHeaders(callback);
 */
CaMDOIntegration.getAPMHeaders = function(callback) {
    var dictionary = {};
    dictionary.action = "getAPMHeaders";
    if (callback) {
        dictionary.callback = callback;
        sendIntegrationEvent(dictionary);
    } else {
        //console.error("CaMDOIntegration:: callback is required to return value from isInPrivateZone() call. ");
    }
};


/**
 * @function enableSDK
 * @description Enable SDK if its not enabled.When SDK is enabled, sdk will collect data for analytics.
 * @param {callback} - callback
 * @example
 * CaMDOIntegration.enableSDK(callback);
 */
CaMDOIntegration.enableSDK = function(callback) {
    var dictionary = {};
    dictionary.action = "enableSDK";
    if (callback) {
        dictionary.callback = callback;
    }
    sendIntegrationEvent(dictionary);
};


/**
 * @function exitPrivateZone
 * @description  Exiting private zone.
 * @param {callback} - callback
 * @example
 * CaMDOIntegration.exitPrivateZone(callback);
 */
CaMDOIntegration.exitPrivateZone = function(callback) {
    var dictionary = {};
    dictionary.action = "exitPrivateZone";
    if (callback) {
        dictionary.callback = callback;
    }
    sendIntegrationEvent(dictionary);
};


/**
 * @function disableSDK
 * @description  Disables SDK if its enabled.
 * When SDK is disabled, SDK will not intercept any calls and wont collect any data from App.
 * @param {callback} - callback
 * @example
 * CaMDOIntegration.disableSDK(callback);
 *
 */
CaMDOIntegration.disableSDK = function(callback) {
    var dictionary = {};
    dictionary.action = "disableSDK";
    if (callback) {
        dictionary.callback = callback;
    }
    sendIntegrationEvent(dictionary);
};



/**
 * @function stopCurrentAndStartNewSession
 * @description  Stops Current session and starts a new session.
 * @param {callback} - callback
 * @example
 * CaMDOIntegration.stopCurrentAndStartNewSession(callback);
 *
 */
CaMDOIntegration.stopCurrentAndStartNewSession = function(callback) {
    var dictionary = {};
    dictionary.action = "stopCurrentAndStartNewSession";
    if (callback) {
        dictionary.callback = callback;
    }
    sendIntegrationEvent(dictionary);
};


/**
 * @function stopCurrentSession
 * @description  Stops Current session
 * @param {callback} - callback
 * @example
 * CaMDOIntegration.stopCurrentSession(callback);
 * Note : Always use this API followed by startNewSession API.
 */
CaMDOIntegration.stopCurrentSession = function(callback) {
    var dictionary = {};
    dictionary.action = "stopCurrentSession";
    if (callback) {
        dictionary.callback = callback;
    }
    sendIntegrationEvent(dictionary);
};

/**
 * @function startNewSession
 * @description  Starts a new session.
 * @param {callback} - callback
 * @example
 * CaMDOIntegration.startNewSession(callback);
 *
 */
CaMDOIntegration.startNewSession = function(callback) {
    var dictionary = {};
    dictionary.action = "startNewSession";
    if (callback) {
        dictionary.callback = callback;
    }
    sendIntegrationEvent(dictionary);
};


/**
 * @function uploadEvents
 * @description  Initiates an upload of the aggregated event(s). Don't expect a callback, on the
 * status of this operation.
 * @example
 * CaMDOIntegration.uploadEvents();
 *
 */
CaMDOIntegration.uploadEvents = function() {
    var dictionary = {};
    dictionary.action = "uploadEvents";
    sendIntegrationEvent(dictionary);
};


/**
 * @function logNetworkEvent
 * @description  Logs a network event.
 * @param {callback} - callback
 * @param {evt} - evt
 * @example
 * CaMDOIntegration.logNetworkEvent({
 * "url" : "http://httpbin.org/",
 * "status" : "200",
 * "inbytes" : "23"
 * "outbytes" : "23"
 * "time" : "45"   //time in ms
 *    },callback);
 *
 */
CaMDOIntegration.logNetworkEvent = function(evt,callback) {
    var dictionary = {};
    dictionary.action = "logNetworkEvent";
    dictionary.url = evt.url;
    dictionary.status = evt.status;
    dictionary.inbytes = evt.inbytes;
    dictionary.outbytes = evt.outbytes;
    dictionary.responsetime = evt.time;
    if (callback) {
        dictionary.callback = callback;
    }
    sendIntegrationEvent(dictionary);
};



/**
 * @function viewLoaded
 * @description Adds a lifecycle event that page or screen is loaded , Takes screenshot of current screen and adds an event to analytics.
 * @param {string} screenName - name of the screen for which screenshot will be taken.
 * @param {callback} callback - callback.
 *      @example
 *      CaMDOIntegration.viewLoaded("Shopping","222",callback);
 */

CaMDOIntegration.viewLoaded = function(screenName,screenloadtime,callback) {
    var dictionary = {};
    dictionary.action = "viewLoaded";
    dictionary.screenname = screenName;
    dictionary.screenloadtime=screenloadtime;
    dictionary.callback = callback;
    sendIntegrationEvent(dictionary);
};

/**
 * @function enterPrivateZone
 * @description  In Private Zone screenshots and other sensitive information will not be recorded.
 * @param {callback} - callback
 * @example
 * CaMDOIntegration.disableSDK(callback);
 */
CaMDOIntegration.enterPrivateZone = function(callback) {
    var dictionary = {};
    dictionary.action = "enterPrivateZone";
    if (callback) {
        dictionary.callback = callback;
    }
    sendIntegrationEvent(dictionary);
};


/**
 * @function customerId
 * @description returns customerId if available.
 * @param {callback} - callback (Required)
 * @example
 * CaMDOIntegration.customerId(callback);
 */
CaMDOIntegration.customerId = function(callback) {
    var dictionary = {};
    dictionary.action = "customerId";
    if (callback) {
        dictionary.callback = callback;
        sendIntegrationEvent(dictionary);
    } else {
        //console.error("CaMDOIntegration:: callback is required to return value from isInPrivateZone() call. ");
    }
};


/**
 * @function deviceId
 * @description Returns deviceId , if available.
 * @param {callback} - callback (Required)
 * @example
 * CaMDOIntegration.deviceId(callback);
 */
CaMDOIntegration.deviceId = function(callback) {
    var dictionary = {};
    dictionary.action = "deviceId";
    if (callback) {
        dictionary.callback = callback;
        sendIntegrationEvent(dictionary);
    } else {
        //console.error("CaMDOIntegration:: callback is required to return value from isInPrivateZone() call. ");
    }
};


/**
 * @function addToAPMHeader
 * @description Adds headers to apm header , to be sent along as request headers with subsequent network requests , after this call.
 * @param {hdr,callback} - hdr (Required)
 * @example
 * CaMDOIntegration.addToAPMHeader("pagename=index;firstLoad=true",callback);
 */
CaMDOIntegration.addToAPMHeader = function(hdr , callback) {
    var dictionary = {};
    dictionary.action = "addToAPMHeader";
    dictionary.header = hdr;
    if (callback) {
        dictionary.callback = callback;
        sendIntegrationEvent(dictionary);
    } else {
        //console.error("CaMDOIntegration:: callback is required to return value from isInPrivateZone() call. ");
    }
};



/**
 * @function ignoreViews
 * @description adds list of view names from this API , to ignore logging view events related to this view name.
 * @param {callback} - views - comma separated view names , callback (Required)
 * @example
 * CaMDOIntegration.ignoreViews("http://myweb.com/private, http://myweb.com/second",callback);
 */
CaMDOIntegration.ignoreViews = function(viewNames , callback) {
    var dictionary = {};
    dictionary.action = "ignoreViews";
    dictionary.views = viewNames;
    if (callback) {
        dictionary.callback = callback;
        sendIntegrationEvent(dictionary);
    } else {
        //console.error("CaMDOIntegration:: callback is required to return value from isInPrivateZone() call. ");
    }
};

/**
 * @function ignoreViews
 * @description - sends feedback from user
 * @param feedback - a string represeting user feedback
 */
CaMDOIntegration.setUserFeedback = function (feedback) {
    var dictionary = {};
    dictionary.action = "setUserFeedback";
    dictionary.feedback = feedback;
    sendIntegrationEvent(dictionary);
}
/**
 * @function setCrashFeedback
 * @description sends crash feedback from user
 * @param - a string representing the feedback
 */
CaMDOIntegration.setCrashFeedback = function (feedback) {
    var dictionary = {};
    dictionary.action = "setCrashFeedback";
    dictionary.feedback = feedback;
    sendIntegrationEvent(dictionary);
}


//************************ Integration functions ******************************* //

/*global HTMLFormElement window  CaMaaAndroidIntegration */
/* jshint strict: true */


/*
 Calls the UIWebView
 */
function SendMAAEventToUIWebView(dictionaryObj) {
    //just making sure action is present and not using it further.
    var action = dictionaryObj.action;
    if (action == null) {
        return;
    }
    window.maaurl = "camaa://" + JSON.stringify(dictionaryObj);
    window.location = "camaa://" + JSON.stringify(dictionaryObj);

}

/**

 * @private
 * Creates unique name global function and assign user passed callback function
 * to that.
 *
 */
var preProcess = function(nativeCallInfo,isIOS) {
    try {
        if (nativeCallInfo.callback && typeof nativeCallInfo.callback === "function") {
            var callbackfn_name = callback_uuid();
            window[callbackfn_name] = nativeCallInfo.callback;
            nativeCallInfo.callback = "";
            //iOS & SDK Code needs to remove this global object by calling delete window[callbackfn_name];
            //this is the name of callback function native SDK will use.
            nativeCallInfo.callbackfn_name = callbackfn_name;
        }

        if(isIOS && nativeCallInfo.quality) {
            var intQuality = parseInt(nativeCallInfo.quality);
            var iosQuality = (intQuality/100)+"";
            nativeCallInfo.quality = iosQuality;
        }

    } catch (e) {}
};


/**
 * @private
 */
var callback_uuid = function() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return "callback_" + s4() + s4() + '_' + s4() + '_' + s4() + '_' + s4() + '_' + s4() + s4() + s4();
};


window.addEventListener("load", resetPrevCall, false);

function resetPrevCall(){
    window.prevCall = 0;
}

//Will get called by the SDK after PageFinished event
function sendTiming(){
    try{
        if (performance === undefined) {
            console.log("sendTiming: performance NOT supported");
            return;
         }
        var performanceData = {};
        var entries = []
        performanceData.entries = entries;
        var navStart = performance.timing.navigationStart;
        var resources = performance.getEntriesByType("resource");
        if (resources === undefined || resources.length <= 0) {
            console.log("sendTiming: there are NO `resource` performance records");
            return;
         }
        var b;
        for (b = 0; b < resources.length; b++) {
            var resource = resources[b];
            //if(validateResource(resource)){
            if(true){
            var item = {
              "name":resource.name ? resource.name : "",
              "initiatortype":resource.initiatorType ? resource.initiatorType : "",
              "duration":resource.duration ? Math.ceil(resource.duration) : 0,
              "ts":navStart,
              "transfersize":resource.transferSize ? resource.transferSize : 0,
              "starttime":resource.startTime ? Math.ceil(resource.startTime) : 0
              }
              performanceData.entries.push(item);
            }else{
              console.log("sendTiming: some of the required timing parameter(s) are missing");
            }

        }
        var dictionary = {};
        dictionary.action = "performanceTiming";
        dictionary.type = "string";
        dictionary.key = "performanceData";
        dictionary.value = performanceData;
        sendIntegrationEvent(dictionary);
    } catch (e) {}
}

function validateResource(resource){
    var requiredProperties = ["name", "initiatorType", "duration", "transferSize", "startTime"];
    console.log("name: "+resource.name+", initiatorType: "+resource.initiatorType+", duration: "+resource.duration+", startTime: "+resource.startTime+", encodedBodySize: "+resource.encodedBodySize+", decodedBodySize: "+resource.decodedBodySize+", transferSize: "+resource.transferSize);
    for (var i=0; i < requiredProperties.length; i++) {
       if(requiredProperties[i] in resource){
       }else{
        console.log(requiredProperties[i]+" missing in performance.timing resource");
        return false;
       }
    }
    return true;
}

/***
TODO: Functions that are not used
*/

function isNonEmptyString(str) {
  return typeof str == 'string' && !!str.trim();
}

function parseString(apmCorrAttributes) {
  var decodedAttributes = decode_utf8(apmCorrAttributes);
  var allAttributes = decodedAttributes.split(",");
  allAttributes.forEach(function(attr) {
      var attrKeyVal = attr.split("=");
      var attrkey = attrKeyVal.shift().trimLeft();
      var attrvalue = attrKeyVal.join("=");
      if(attrkey == "CorBrowsGUID")  {
        result =  attrvalue;
      }

  });
  return result;
}


function parse(c_name) {
  var corCookie = "";
  var cookieMap = undefined;
    if (document.cookie.length > 0) {
        var cookie = readCookie(c_name);
        if(cookie) {
            var keyval = cookie.split("=");
            corCookie =  keyval[1];
        }
    }
    return parseString(corCookie);
}

function readCookie(name) {
//    name += '=';
    for (var ca = document.cookie.split(/;\s*/), i = ca.length - 1; i >= 0; i--) {
        if (ca[i].indexOf(name) !== -1) {
             return ca[i].replace(name, '');
        }
    }

}


function encode_utf8(s) {
  return unescape(encodeURIComponent(s));
}

function decode_utf8(s) {
  return decodeURIComponent(unescape(s));
}

function sendIntegrationEvent(dictionary) {
    sendMAASDKEvent(dictionary);
}

/**
 * @private
 *
 */

var sendMAASDKEvent = function(nativeCallInfo) {
    try{
        //Android Integration
        if (typeof CaMaaAndroidIntegration != 'undefined') {
            preProcess(nativeCallInfo,false);
            CaMaaAndroidIntegration.postMessage(JSON.stringify(nativeCallInfo));
        }
        //iOS WKWebview
        else if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.camaa) {
            preProcess(nativeCallInfo,true);
            try {
                window.webkit.messageHandlers.camaa.postMessage(nativeCallInfo);
            }
            catch (e) {
            }
        }
        //UI Webview
        else if (window.camaawebview) { // if in ios webview
            preProcess(nativeCallInfo,true);

            var executeAfter = 400;
            if(!window.prevCall){
                window.prevCall = 0;
            }
            // alert(window.prevCall)
            window.prevCall = window.prevCall + executeAfter;
            if(window.prevCall > 3000){
                window.prevCall = 0
            }

            window.setTimeout(function(){SendMAAEventToUIWebView(nativeCallInfo)},window.prevCall );

            //SendMAAEventToUIWebView(nativeCallInfo);
        }
        //Do not call , just call callback passed.
        else {
            // For any other mobiles as well as api got called without wrapping.t
            if (nativeCallInfo.callback) {
                nativeCallInfo.callback(nativeCallInfo.action, null, "NATIVE_CALL_NOT_EXECUTED");
            }
        }
    } catch (e) {}
};

