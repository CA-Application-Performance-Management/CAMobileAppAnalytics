/*global HTMLFormElement window  CaMaaAndroidIntegration */
/* jshint strict: true */


registerSubmitListener();

if (!XMLHttpRequest.prototype.reallyOpen) {


    XMLHttpRequest.prototype.reallyOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
        this.camaa_start = new Date().getTime();
        this.camaa_req_url = url;
        this.reallyOpen.apply(this, Array.prototype.slice.call(arguments));

    };


    XMLHttpRequest.prototype.reallySend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function(body) {
        try {
            if (body) {
                this.camaa_body_outBytes = body.length;
            } else {
                this.camaa_body_outBytes = 0;
            }
            this.addEventListener("readystatechange", function() {

                if (this.readyState === 4) {
                    this.camaa_end = new Date().getTime();
                    window.logEvent(this);
                }
            }, false);
            if(typeof CaMaaAndroidIntegration != 'undefined') {
                var apmHeaderString = "" + CaMaaAndroidIntegration.getAPMHeader();
                var apmHeader = apmHeaderString.split("||");
                
                if (apmHeader.length === 2) {
                    this.setRequestHeader(apmHeader[0], apmHeader[1]);
                }
            }

        } catch (exception) {

        } finally {
            this.reallySend.apply(this, Array.prototype.slice.call(arguments));
        }
    };
}

function registerSubmitListener() {
    window.addEventListener('submit', function(e) {
        interceptor(e);
    }, true);

}

function interceptor(e) {
    var frm = e ? e.target : this;
    interceptor_onsubmit(frm);
}


function interceptor_onsubmit(f) {
    try {
        var jsonArr = [],i,parName,parValue,parType,obj;
        for (i = 0; i < f.elements.length; i+=1) {
            parName = f.elements[i].name;
            parValue = f.elements[i].value;
            parType = f.elements[i].type;
            obj = {
                name: parName,
                value: parValue
            };
            jsonArr.push(obj);
        }
        var enctype = null;
        var http_method =null;
        var action_url=null;

        if(f.attributes['enctype']){
            if (f.attributes['enctype'].value){
                enctype=f.attributes['enctype'].value;
            }else if(f.attributes['enctype'].nodeValue){
                enctype=f.attributes['enctype'].nodeValue;
             }
        }
        if(f.attributes['method']){
            if(f.attributes['method'].value){
                http_method=f.attributes['method'].value;
            }else if (f.attributes['method'].nodeValue){
                http_method=f.attributes['method'].nodeValue;
            }
        }
        if( f.attributes['action'] ){
            if( f.attributes['action'].value){
                action_url=f.attributes['action'].value
            }else if ( f.attributes['action'].nodeValue){
                action_url=f.attributes['action'].nodeValue;
            }
        }
        if(typeof CaMaaAndroidIntegration != 'undefined') {
            CaMaaAndroidIntegration.logFormRequest(action_url, f.action, http_method, enctype, JSON.stringify(jsonArr));
        }
    } catch (exception) {

    }
}

function logEvent(req) {
    log_event_android(req);
}

function log_event_android(req){
try {
    if(!req){
        return;
    }
    var inBytes = 0;
    var outBytes = 0;
    var urlString='';
    //TODO: revisit the logic to fetch the correlation id.
    var corrId = parse("x-apm-brtm-response-bt");
    
    if (req.responseURL) {
        urlString = req.responseURL;
    } else if(req.camaa_req_url) {
        urlString = req.camaa_req_url;
    }else{
        return;
    }
    
    
    if (urlString) {
        outBytes = outBytes + urlString.length;
    }
    
    if (req.camaa_body_outBytes) {
        outBytes = outBytes + req.camaa_body_outBytes;
    }
    
    if (req.responseText) {
        var strContentLength = req.getResponseHeader("Content-Length");
        if (strContentLength) {
            inBytes = parseInt(strContentLength);
            
        } else {
            /***
             * When content length not available falling back on response text length.
             * Most likely not the case so commenting it will change if we see any issue.
             ***/
            //inBytes = req.responseText.length;
        }
    }
    var timeSpent = req.camaa_end - req.camaa_start;
    var dictionary = {};
    dictionary.action = "logNetworkEvent";
    dictionary.url = urlString;
    dictionary.status = req.status;
    dictionary.inbytes = inBytes;
    dictionary.outbytes = outBytes;
    dictionary.responsetime = timeSpent;
    dictionary.corrId = corrId;
    sendIntegrationEvent(dictionary);
    
} catch (exception) {
    
}
}


function sendIntegrationEvent(dictionary) {
    sendMAASDKEvent(dictionary);
}
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
 *
 */

var sendMAASDKEvent = function(nativeCallInfo) {
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
};

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


/**
 * @function : winow.onError : A Call back method that detects js related errors/ crashes.
 * @param : {message} : Error message obtained after crash
 * @param : {url} : url on which the error has occured.
 * @param : {lineNumber} : line on which the error has occured.
 * @param : {columnNumber} : column on which the error has occured.
 * @param : {errorObj} : Error object received after error has occured.
 */


window.onerror = function(message, url, lineNumber,columnNumber,errorObj) {
    var dictionary = {};
    dictionary.action = "logTextMetric";
    dictionary.type = "string";
    dictionary.key = "jserror";
    dictionary.value = message;
    var stacktrace = undefined;
    if(errorObj){
        stacktrace = errorObj["stack"].toString();
    }
    var loc = window.location;
    if(loc) {
        loc = loc.pathname;
    }
    else {
        loc ="undefined";
    }
    if(stacktrace) {
        dictionary.attributes = {"l":lineNumber,"u":url , "s": stacktrace,"p": loc};
    }
    else {
        dictionary.attributes = {"l":lineNumber,"u":url ,"p": loc};
    }
    sendIntegrationEvent(dictionary);

    return true;
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
  var result = "";
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








