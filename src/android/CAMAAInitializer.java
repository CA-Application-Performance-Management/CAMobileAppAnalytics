package com.ca.cordova.integration;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.os.Bundle;
import android.os.Handler;

import com.ca.integration.CaMDOCallback;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import static com.ca.android.app.CaMDOIntegration.logTextMetric;
import static com.ca.android.app.CaMDOIntegration.setCustomerId;
import static com.ca.android.app.CaMDOIntegration.isSDKEnabled;

public class CAMAAInitializer extends CordovaPlugin {

    /**
     * Executes the request and returns PluginResult
     *
     * @param  action          
     * @param  args            
     * @param  callbackContext 
     * @return boolean                
     * @throws JSONException   
     */
    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {

        if (action.equals("setCustomerId")) {
            try {            
                setCustomerId(args.getString(0));
                callbackContext.success();
            } catch (Exception e) {
                callbackContext.error("Exception thrown: "+e.toString());
            }
            return true;
        } else if (action.equals("logTextMetric")) {
            try {
                JSONObject jsonObject = args.getJSONObject(2);
                Map<String, String> attributes = new HashMap<String, String>();
                Iterator<?> keys = jsonObject.keys();
                while (keys.hasNext()) {
                    String key = (String) keys.next();
                    String value = jsonObject.getString(key);
                    attributes.put(key, value);
                }
                logTextMetric(args.getString(0), args.getString(1), attributes, getCallBack(callbackContext));
            } catch (Exception e) {
                callbackContext.error("Exception thrown: "+e.toString());
            }
            return true;
        } else if (action.equals("isSDKEnabled")) {
            try {
                if(isSDKEnabled()) {
                    callbackContext.success("true");
                } else {
                    callbackContext.success("false");
                }
            } catch (Exception e) {
                callbackContext.error("Exception thrown: "+e.toString());
            }
            return true;
        }
        
        // Default response to say the action hasn't been handled
        return false;
    }

    private CaMDOCallback getCallBack (CallbackContext callbackContext) {
        return new CaMDOCallback(new Handler()) {
            @Override
            public void onError(int errorCode, Exception exception) {
                callbackContext.error(errorCode + " exception: "+ exception.toString());
            }
            @Override
            public void onSuccess(Bundle data) {
                callbackContext.success();
            }
        };
    }

}
