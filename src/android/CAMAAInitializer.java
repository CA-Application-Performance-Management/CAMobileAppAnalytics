import android.os.Bundle;
import android.os.Handler;
import android.util.Log;

import com.ca.android.app.CaMDOIntegration;
import com.ca.integration.CaMDOCallback;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;

/***
 *
 */
public class CAMAAInitializer extends CordovaPlugin {

  public static String TAG = "CAMAAInitializer_android";

  public static String ACTION_ENABLE_SDK = "enableSDK";
  public static String ACTION_DISABLE_SDK = "disableSDK";
  public static String ACTION_DEVICE_ID = "deviceId";
  public static String ACTION_GET_CUSTOMER_ID = "customerId";
  public static String ACTION_SET_CUSTOMER_ID = "setCustomerId";
  public static String ACTION_ENTER_PRIVATE_ZONE = "enterPrivateZone";
  public static String ACTION_EXIT_PRIVATE_ZONE = "exitPrivateZone";
  public static String ACTION_IN_PRIVATE_ZONE = "isInPrivateZone";
  public static String ACTION_GET_APM_HEADERS = "apmHeader";
  public static String ACTION_ADD_APM_HEADER = "addToApmHeader";
  public static String ACTION_STOP_SESSION = "stopCurrentSession";
  public static String ACTION_START_SESSION = "startNewSession";
  public static String ACTION_STOP_CURRENT_AND_START_NEW_SESSION = "stopCurrentAndStartNewSession";
  public static String ACTION_SET_USER_FEEDBACK = "setCustomerFeedback";
  public static String ACTION_SET_SESSION_ATTRIBUTE = "setSessionAttribute";
  public static String ACTION_SET_CUSTOMER_LOCATION = "setCustomerLocation";
  public static String ACTION_START_APP_TRANSACTION = "startApplicationTransactionWithName";
  public static String ACTION_STOP_APP_TRANSACTION = "stopApplicationTransactionWithName";
  public static String ACTION_STOP_APP_TRANSACTION_WITH_FAILURE = "stopApplicationTransactionWithNameAndFailure";
  public static String ACTION_START_APP_TRANSACTION_WITH_NAME_AND_SERVICE = "startApplicationTransactionWithNameWithServiceName";
  public static String ACTION_IS_SCREENSHOT_ENABLED_BY_POLICY = "isScreenshotPolicyEnabled";
  public static String ACTION_IGNORE_VIEW = "ignoreView";
  public static String ACTION_IGNORE_VIEWS = "ignoreViews";
  public static String ACTION_SEND_SCREENSHOT = "sendScreenShot";
  public static String ACTION_VIEW_LOADED = "viewLoaded";
  public static String ACTION_LOG_NETWORK_EVENT = "logNetworkEvent";
  public static String ACTION_LOG_TEXT_METRIC = "logTextMetric";
  public static String ACTION_LOG_NUMERIC_METRIC = "logNumericMetric";
  public static String ACTION_UPLOAD_EVENT = "uploadEventsWithCompletionHandler";

  @Override
  public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
    Log.i(TAG, "@ CAMAAInitializer -execute  " + action);
    if (action.equals(ACTION_ENABLE_SDK)) {
      enableSDK(args, callbackContext);
    } else if (action.equals(ACTION_DISABLE_SDK)) {
      disableSDK(args, callbackContext);
    } else if (action.equals(ACTION_DEVICE_ID)) {
      deviceId(args, callbackContext);
    } else if (action.equals(ACTION_GET_CUSTOMER_ID)) {
      customerId(args, callbackContext);
    } else if (action.equals(ACTION_SET_CUSTOMER_ID)) {
      setCustomerId(args, callbackContext);
    } else if (action.equals(ACTION_ENTER_PRIVATE_ZONE)) {
      enterPrivateZone(args, callbackContext);
    } else if (action.equals(ACTION_EXIT_PRIVATE_ZONE)) {
      exitPrivateZone(args, callbackContext);
    } else if (action.equals(ACTION_IN_PRIVATE_ZONE)) {
      isInPrivateZone(args, callbackContext);
    } else if (action.equals(ACTION_GET_APM_HEADERS)) {
      apmHeader(args, callbackContext);
    } else if (action.equals(ACTION_ADD_APM_HEADER)) {
      addToApmHeader(args, callbackContext);
    } else if (action.equals(ACTION_START_SESSION)) {
      startNewSession(args, callbackContext);
    } else if (action.equals(ACTION_STOP_SESSION)) {
      stopCurrentSession(args, callbackContext);
    } else if (action.equals(ACTION_STOP_CURRENT_AND_START_NEW_SESSION)) {
      stopCurrentAndStartNewSession(args, callbackContext);
    } else if (action.equals(ACTION_SET_USER_FEEDBACK)) {
      setCustomerFeedback(args, callbackContext);
    } else if (action.equals(ACTION_SET_SESSION_ATTRIBUTE)) {
      setSessionAttribute(args, callbackContext);
    } else if (action.equals(ACTION_SET_CUSTOMER_LOCATION)) {
      setCustomerLocation(args, callbackContext);
    } else if (action.equals(ACTION_START_APP_TRANSACTION)) {
      startApplicationTransactionWithName(args, callbackContext);
    } else if (action.equals(ACTION_STOP_APP_TRANSACTION)) {
      stopApplicationTransactionWithName(args, callbackContext);
    } else if (action.equals(ACTION_STOP_APP_TRANSACTION_WITH_FAILURE)) {
      stopApplicationTransactionWithNameAndFailure(args, callbackContext);
    } else if (action.equals(ACTION_START_APP_TRANSACTION_WITH_NAME_AND_SERVICE)) {
      startApplicationTransactionWithNameWithServiceName(args, callbackContext);
    } else if (action.equals(ACTION_IS_SCREENSHOT_ENABLED_BY_POLICY)) {
      isScreenshotPolicyEnabled(args, callbackContext);
    } else if (action.equals(ACTION_IGNORE_VIEW)) {
      ignoreView(args, callbackContext);
    } else if (action.equals(ACTION_IGNORE_VIEWS)) {
      ignoreViews(args, callbackContext);
    } else if (action.equals(ACTION_SEND_SCREENSHOT)) {
      sendScreenShot(args, callbackContext);
    } else if (action.equals(ACTION_VIEW_LOADED)) {
      viewLoaded(args, callbackContext);
    } else if (action.equals(ACTION_LOG_NETWORK_EVENT)) {
      logNetworkEvent(args, callbackContext);
    } else if (action.equals(ACTION_LOG_TEXT_METRIC)) {
      logTextMetric(args, callbackContext);
    } else if (action.equals(ACTION_LOG_NUMERIC_METRIC)) {
      logNumericMetric(args, callbackContext);
    } else if (action.equals(ACTION_UPLOAD_EVENT)) {
      uploadEventsWithCompletionHandler(args, callbackContext);
    } else {
      Log.i(TAG, "@execute unknown action/command: " + action);
    }
    return true;
  }


  public void enableSDK(JSONArray args, CallbackContext callbackContext) {
    Log.i(TAG, "@enableSDK  ");
    CaMDOIntegration.enableSDK();
    callbackContext.success();
  }

  public void disableSDK(JSONArray args, CallbackContext callbackContext) {
    Log.i(TAG, "@disableSDK  ");
    CaMDOIntegration.disableSDK();
    callbackContext.success();
  }

  public void deviceId(JSONArray args, CallbackContext callbackContext) {
    Log.i(TAG, "@deviceId  ");
    callbackContext.success(CaMDOIntegration.getDeviceId());
  }

  public void customerId(JSONArray args, CallbackContext callbackContext) {
    Log.i(TAG, "@customerId  ");
    callbackContext.success(CaMDOIntegration.getCustomerId());
  }

  public void setCustomerId(JSONArray args, CallbackContext callbackContext) {
    try {
      Log.i(TAG, "@setCustomerId  ");
      CaMDOIntegration.setCustomerId("" + args.get(0));
      callbackContext.success();
    } catch (JSONException e) {
      callbackContext.error("Failed to set CustomerID. Reason:  " + e);
    }
  }

  public void enterPrivateZone(JSONArray args, CallbackContext callbackContext) {
    Log.i(TAG, "@enterPrivateZone  ");
    CaMDOIntegration.enterPrivateZone();
    callbackContext.success();
  }

  public void exitPrivateZone(JSONArray args, CallbackContext callbackContext) {
    Log.i(TAG, "@exitPrivateZone  ");
    CaMDOIntegration.exitPrivateZone();
    callbackContext.success();
  }

  public void isInPrivateZone(JSONArray args, CallbackContext callbackContext) {
    Log.i(TAG, "@isInPrivateZone  ");
    callbackContext.success("" + CaMDOIntegration.isInPrivateZone());
  }

  public void apmHeader(JSONArray args, CallbackContext callbackContext) {
    Log.i(TAG, "@get apmHeader  ");
    callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, new JSONObject(CaMDOIntegration.getAPMHeaders())));
  }

  public void stopCurrentSession(JSONArray args, CallbackContext callbackContext) {
    Log.i(TAG, "@stopCurrentSession  ");
    CaMDOIntegration.stopCurrentSession();
    callbackContext.success();
  }

  public void startNewSession(JSONArray args, CallbackContext callbackContext) {
    Log.i(TAG, "@startNewSession  ");
    CaMDOIntegration.startNewSession();
    callbackContext.success();
  }

  public void stopCurrentAndStartNewSession(JSONArray args, CallbackContext callbackContext) {
    Log.i(TAG, "@stopCurrentAndStartNewSession  ");
    CaMDOIntegration.stopCurrentAndStartNewSession();
    callbackContext.success();
  }

  public void addToApmHeader(JSONArray args, CallbackContext callbackContext) {
    Log.i(TAG, "@addToApmHeader  ");
    try {
      CaMDOIntegration.addToApmHeader("" + args.get(0));
      callbackContext.success();
    } catch (Exception e) {
      callbackContext.error("Error in adding APM header. Reason: " + e);
    }
  }

  public void setCustomerFeedback(JSONArray args, CallbackContext callbackContext) {
    Log.i(TAG, "@setCustomerFeedback  ");
    try {
      CaMDOIntegration.setUserFeedback("" + args.get(0));
      callbackContext.success();
    } catch (Exception e) {
      callbackContext.error("Error in setting UserFeedback. Reason: " + e);
    }
  }

  public void setSessionAttribute(JSONArray args, CallbackContext callbackContext) {
    Log.i(TAG, "@setSessionAttribute  ");
    try {
      CaMDOIntegration.setSessionAttribute("" + args.get(0), "" + args.get(1));
      callbackContext.success();
    } catch (Exception e) {
      callbackContext.error("Error in setting Session Attribute. Reason: " + e);
    }
  }

  public void setCustomerLocation(JSONArray args, CallbackContext callbackContext) {
    Log.i(TAG, "@setCustomerLocation  ");
    try {
      CaMDOIntegration.setCustomerLocation("" + args.get(0), "" + args.get(1));
      callbackContext.success();
    } catch (Exception e) {
      callbackContext.error("Error in setting Customer Location. Reason: " + e);
    }
  }

  public void startApplicationTransactionWithName(JSONArray args, CallbackContext callbackContext) {
    Log.i(TAG, "@startApplicationTransactionWithName  ");
    try {
      CaMDOIntegration.startApplicationTransaction("" + args.get(0), new CaMDOCallback(new Handler()) {
        @Override
        public void onError(int i, Exception e) {
          callbackContext.error("Error starting transaction. Reason " + e);
        }

        @Override
        public void onSuccess(Bundle bundle) {
          callbackContext.success();
        }
      });

    } catch (Exception e) {
      callbackContext.error("Error starting transaction. Reason " + e);
    }
  }

  public void stopApplicationTransactionWithName(JSONArray args, CallbackContext callbackContext) {
    Log.i(TAG, "@stopApplicationTransactionWithName  ");
    try {
      CaMDOIntegration.stopApplicationTransaction("" + args.get(0), new CaMDOCallback(new Handler()) {
        @Override
        public void onError(int i, Exception e) {
          callbackContext.error("Error stopping transaction. Reason " + e);
        }

        @Override
        public void onSuccess(Bundle bundle) {
          callbackContext.success();
        }
      });

    } catch (Exception e) {
      callbackContext.error("Error stopping transaction. Reason " + e);
    }
  }

  public void startApplicationTransactionWithNameWithServiceName(JSONArray args, CallbackContext callbackContext) {
    Log.i(TAG, "@startApplicationTransactionWithNameWithServiceName  ");
    try {
      CaMDOIntegration.startApplicationTransaction("" + args.get(0), "" + args.get(1), new CaMDOCallback(new Handler()) {
        @Override
        public void onError(int i, Exception e) {
          callbackContext.error("Error starting transaction. Reason " + e);
        }

        @Override
        public void onSuccess(Bundle bundle) {
          callbackContext.success();
        }
      });

    } catch (Exception e) {
      callbackContext.error("Error starting transaction. Reason " + e);
    }
  }

  public void stopApplicationTransactionWithNameAndFailure(JSONArray args, CallbackContext callbackContext) {
    Log.i(TAG, "@stopApplicationTransactionWithNameAndFailure  ");
    try {
      CaMDOIntegration.stopApplicationTransaction("" + args.get(0), "" + args.get(1), new CaMDOCallback(new Handler()) {
        @Override
        public void onError(int i, Exception e) {
          callbackContext.error("Error stopping transaction. Reason " + e);
        }

        @Override
        public void onSuccess(Bundle bundle) {
          callbackContext.success();
        }
      });

    } catch (Exception e) {
      callbackContext.error("Error stopping transaction with failure. Reason " + e);
    }
  }

  public void isScreenshotPolicyEnabled(JSONArray args, CallbackContext callbackContext) {
    Log.i(TAG, "@isScreenshotPolicyEnabled  ");
    callbackContext.success("" + CaMDOIntegration.isScreenshotPolicyEnabled());
  }

  public void ignoreView(JSONArray args, CallbackContext callbackContext) {
    Log.i(TAG, "@ignoreView  ");
    try {
      CaMDOIntegration.ignoreView("" + args.get(0));
      callbackContext.success();
    } catch (Exception e) {
      callbackContext.error("Error stopping transaction. Reason " + e);
    }
  }

  public void ignoreViews(JSONArray args, CallbackContext callbackContext) {
    Log.i(TAG, "@ignoreViews  ");
    try {
      HashSet<String> views = new HashSet<>(args.length());
      for (int i = 0; i < args.length(); i++) {
        views.add("" + args.get(i));
      }
      CaMDOIntegration.ignoreViews(views);
      callbackContext.success();
    } catch (Exception e) {
      callbackContext.error("Error ignoring views. Reason " + e);
    }
  }

  public void sendScreenShot(JSONArray args, CallbackContext callbackContext) {
    Log.i(TAG, "@sendScreenShot  ");
    try {

      CaMDOIntegration.sendScreenShot("" + args.get(0), (int) args.get(1), new CaMDOCallback(new Handler()) {
        @Override
        public void onError(int i, Exception e) {
          callbackContext.error("Error sending ScreenShot: Reason " + e);
        }

        @Override
        public void onSuccess(Bundle bundle) {
          callbackContext.success();
        }
      });

    } catch (Exception e) {
      callbackContext.error("Error sending ScreenShot: Reason " + e);
    }
  }

  public void viewLoaded(JSONArray args, CallbackContext callbackContext) {
    Log.i(TAG, "@viewLoaded  ");
    try {

      CaMDOIntegration.viewLoaded("" + args.get(0), (int) args.get(1), new CaMDOCallback(new Handler()) {
        @Override
        public void onError(int i, Exception e) {
          callbackContext.error("Error sending viewLoaded event: Reason " + e);
        }

        @Override
        public void onSuccess(Bundle bundle) {
          callbackContext.success();
        }
      });

    } catch (Exception e) {
      callbackContext.error("Error sending viewLoaded event: Reason " + e);
    }
  }

  public void logNetworkEvent(JSONArray args, CallbackContext callbackContext) {
    Log.i(TAG, "@logNetworkEvent  ");
    try {
      CaMDOIntegration.logNetworkEvent("" + args.get(0), (int) args.get(1), (int) args.get(2), (int) args.get(3), (int) args.get(4));
    } catch (Exception e) {
      callbackContext.error("Error sending NetworkEvent event: Reason " + e);
    }
  }

  public void logTextMetric(JSONArray args, CallbackContext callbackContext) {
    Log.i(TAG, "@logTextMetric  ");
    try {
       Map<String, String> attribs = new HashMap<>();
      try {
        JSONObject temp = args.getJSONObject(2);
        Iterator<String> itr = temp.keys();
        while (itr.hasNext()) {
          String key = itr.next();
          attribs.put(key, temp.getString(key));
        }

      } catch (Exception d1) {
        Log.i(TAG, "@logTextMetric  3rd agr is not a valid. Follow {'key1':value, 'key2':value, .. } format");
      }
      CaMDOIntegration.logTextMetric("" + args.get(0), (String) args.get(1), attribs, new CaMDOCallback(new Handler()) {
        @Override
        public void onError(int i, Exception e) {
          callbackContext.error("Error sending logTextMetric event: Reason " + e);
        }

        @Override
        public void onSuccess(Bundle bundle) {
          callbackContext.success();
        }
      });

    } catch (Exception e) {
      callbackContext.error("Error sending logTextMetric event: Reason " + e);
    }
  }

  public void logNumericMetric(JSONArray args, CallbackContext callbackContext) {
    Log.i(TAG, "@logNumericMetric  ");
    try {
       Map<String, String> attribs = new HashMap<>();
      try {
        JSONObject temp = args.getJSONObject(2);
        Iterator<String> itr = temp.keys();
        while (itr.hasNext()) {
          String key = itr.next();
          attribs.put(key, temp.getString(key));
        }

      } catch (Exception d1) {
        Log.i(TAG, "@logNumericMetric  3rd agr is not a valid. Follow {'key1':value, 'key2':value, .. } format");
      }
      CaMDOIntegration.logNumericMetric("" + args.get(0),  Double.parseDouble(""+args.get(1)), attribs, new CaMDOCallback(new Handler()) {
        @Override
        public void onError(int i, Exception e) {
          callbackContext.error("Error sending logNumericMetric event: Reason " + e);
        }

        @Override
        public void onSuccess(Bundle bundle) {
          callbackContext.success();
        }
      });

    } catch (Exception e) {
      callbackContext.error("Error sending logNumericMetric event: Reason " + e);
    }
  }

  public void uploadEventsWithCompletionHandler(JSONArray args, CallbackContext callbackContext) {
    Log.i(TAG, "@uploadEventsWithCompletionHandler  ");
    try {
      CaMDOIntegration.uploadEvents(new CaMDOCallback(new Handler()) {
        @Override
        public void onError(int i, Exception e) {
          callbackContext.error("Error in uploadEvents: Reason " + e);
        }

        @Override
        public void onSuccess(Bundle bundle) {
          callbackContext.success();
        }
      });

    } catch (Exception e) {
      callbackContext.error("Error in uploadEvents: Reason " + e);
    }
  }

}
