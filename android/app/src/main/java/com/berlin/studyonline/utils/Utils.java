package com.berlin.studyonline.utils;

import android.content.Context;
import android.content.SharedPreferences;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.os.Environment;
import android.util.Base64;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.widget.BaseAdapter;
import android.widget.ListView;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.JsonSyntaxException;
import com.google.gson.reflect.TypeToken;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Type;
import java.net.FileNameMap;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.net.URLConnection;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.security.InvalidKeyException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.Enumeration;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

/**
 * Created by mac on 2018/1/30.
 */

public class Utils {
    public static final int BYTES_LENGTH_OF_ONE_MB = 1 * 1024 * 1024;
    public static final int BYTES_LENGTH_OF_200_KB = 200 * 1024;
    public static final int BYTES_LENGTH_OF_HUNDRED_KB = 100 * 1024;
    private static final String SHARE_PREFERENCES_NAME = "studyonline.preferences";
    public static final long MILLI_SECONDS_OF_ONE_HOUR = 3600 * 1000;
    public static final long MILLI_SECONDS_OF_ONE_DAY = 24 * MILLI_SECONDS_OF_ONE_HOUR;
    public static final long MILLI_SECONDS_OF_TWO_DAY = 2 * 24 * MILLI_SECONDS_OF_ONE_HOUR;
    public static final String DATE_FORMAT_FULL = "yyyy-MM-dd HH:mm:ss";
    public static final String DATE_FORMAT_MONTH_DAY = "yyyy-MM-dd";

    /**
     * @param level level can be Log.INFO, Log.DEBUG, Log.VERBOSE, Log.WARN or
     *              Log.ERROR
     * @param tag   log tag
     * @param msg   log message
     */
    private static void log(int level, String tag, String msg) {
        int key = level;
        switch (key) {
            case Log.VERBOSE:
                Log.v(tag, msg);
                break;
            case Log.DEBUG:
                Log.d(tag, msg);
                break;
            case Log.INFO:
                Log.i(tag, msg);
                break;
            case Log.WARN:
                Log.w(tag, msg);
                break;
            case Log.ERROR:
                Log.e(tag, msg);
                break;
            default:
                break;
        }
    }

    public static void logV(String tag, String msg) {
        log(Log.VERBOSE, tag, msg);
    }

    public static void logD(String tag, String msg) {
        log(Log.DEBUG, tag, msg);
    }

    public static void logI(String tag, String msg) {
        log(Log.INFO, tag, msg);
    }

    public static void logW(String tag, String msg) {
        log(Log.WARN, tag, msg);
    }

    public static void logE(String tag, String msg) {
        log(Log.ERROR, tag, msg);
    }

    final protected static char[] hexArray = "0123456789abcdef".toCharArray();

    public static String bytesToHex(byte[] bytes) {
        char[] hexChars = new char[bytes.length * 2];
        for (int j = 0; j < bytes.length; j++) {
            int v = bytes[j] & 0xFF;
            hexChars[j * 2] = hexArray[v >>> 4];
            hexChars[j * 2 + 1] = hexArray[v & 0x0F];
        }
        return new String(hexChars);
    }

    public static String md5(String value) {
        try {
            MessageDigest md5 = MessageDigest.getInstance("MD5");
            md5.reset();
            md5.update(value.getBytes());
            return bytesToHex(md5.digest());
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static boolean readPreferences(Context context, String key, boolean defValue) {
        if (context == null || key == null) {
            return defValue;
        }
        SharedPreferences preferences = context.getSharedPreferences(SHARE_PREFERENCES_NAME, Context.MODE_PRIVATE);
        return preferences.getBoolean(key, defValue);
    }

    public static void writePreferences(Context context, String key, boolean value) {
        if (context == null || key == null) {
            return;
        }
        SharedPreferences preferences = context.getSharedPreferences(SHARE_PREFERENCES_NAME, Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = preferences.edit();
        editor.putBoolean(key, value);
        editor.commit();
    }

    public static long readPreferences(Context context, String key, long defValue) {
        if (context == null || key == null) {
            return defValue;
        }
        SharedPreferences preferences = context.getSharedPreferences(SHARE_PREFERENCES_NAME, Context.MODE_PRIVATE);
        return preferences.getLong(key, defValue);
    }

    public static String readPreferences(Context context, String key, String defValue) {
        if (context == null || key == null) {
            return defValue;
        }
        SharedPreferences preferences = context.getSharedPreferences(SHARE_PREFERENCES_NAME, Context.MODE_PRIVATE);
        return preferences.getString(key, defValue);
    }

    public static void writePreferences(Context context, String key, String value) {
        if (context == null || key == null) {
            return;
        }
        SharedPreferences preferences = context.getSharedPreferences(SHARE_PREFERENCES_NAME, Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = preferences.edit();
        editor.putString(key, value);
        editor.commit();
    }

    public static float readPreferences(Context context, String key, float defValue) {
        if (context == null || key == null) {
            return defValue;
        }
        SharedPreferences preferences = context.getSharedPreferences(SHARE_PREFERENCES_NAME, Context.MODE_PRIVATE);
        return preferences.getFloat(key, defValue);
    }

    public static void writePreferences(Context context, String key, float value) {
        if (context == null || key == null) {
            return;
        }
        SharedPreferences preferences = context.getSharedPreferences(SHARE_PREFERENCES_NAME, Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = preferences.edit();
        editor.putFloat(key, value);
        editor.commit();
    }

    public static void writePreferences(Context context, String key, long value) {
        if (context == null || key == null) {
            return;
        }
        SharedPreferences preferences = context.getSharedPreferences(SHARE_PREFERENCES_NAME, Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = preferences.edit();
        editor.putLong(key, value);
        editor.commit();
    }

    public static int readPreferences(Context context, String key, int defValue) {
        if (context == null || key == null) {
            return defValue;
        }
        SharedPreferences preferences = context.getSharedPreferences(SHARE_PREFERENCES_NAME, Context.MODE_PRIVATE);
        return preferences.getInt(key, defValue);
    }

    public static void writePreferences(Context context, String key, int value) {
        if (context == null || key == null) {
            return;
        }
        SharedPreferences preferences = context.getSharedPreferences(SHARE_PREFERENCES_NAME, Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = preferences.edit();
        editor.putInt(key, value);
        editor.commit();
    }

    public static boolean hasSdcard() {
        String state = Environment.getExternalStorageState();
        if (state.equals(Environment.MEDIA_MOUNTED)) {
            return true;
        } else {
            return false;
        }
    }

    public static String getPackageDataBasePath(Context context) {
        String databasePath = context.getApplicationContext().getDir("database", Context.MODE_PRIVATE).getPath();
        return databasePath;
    }

    public static Date formatDate(String formatString, String strDate) throws ParseException {
        SimpleDateFormat format = new SimpleDateFormat(formatString, Locale.getDefault());
        Date date = format.parse(strDate);
        return date;
    }

    /**
     * get Format Date
     *
     * @param format Date Format, default is [YYYY-MM-dd HH:mm:ss]
     * @return Format Date
     * @throws ParseException
     */
    public static String getFormatDate(String format, String strDate) throws ParseException {
        return getFormatDate(format, parseDate(strDate));
    }

    /**
     * get Format Date
     *
     * @param format       Date Format, default is [yyyy-MM-dd HH:mm:ss]
     * @param milliseconds the time as the number of milliseconds since Jan. 1, 1970.
     * @return format String
     */
    public static String getFormatDate(String format, long milliseconds) {
        if (format == null) {
            format = DATE_FORMAT_FULL;
        }
        SimpleDateFormat dateFormat = new SimpleDateFormat(format, Locale.getDefault());
        return dateFormat.format(new Date(milliseconds));
    }

    public static long parseDate(String strDate) throws ParseException {
        return parseDate(strDate, DATE_FORMAT_FULL);
    }

    public static long parseDate(String strDate, String formatString) throws ParseException {
        return formatDate(formatString, strDate).getTime();
    }

    public static long deltaTimeFromNow(long toMilliseconds) {
        long nowMs = System.currentTimeMillis();
        return nowMs - toMilliseconds;
    }

    public static long deltaSecondsTimeFromNow(long toMilliseconds) {
        long nowMs = System.currentTimeMillis() / 1000;
        return nowMs - toMilliseconds / 1000;
    }

    public static long todayStartUnixTime() {
        Calendar todayCal = Calendar.getInstance();
        todayCal.set(Calendar.HOUR_OF_DAY, 0);
        todayCal.set(Calendar.MINUTE, 0);
        todayCal.set(Calendar.SECOND, 0);
        todayCal.set(Calendar.MILLISECOND, 0);
        return todayCal.getTimeInMillis();
    }

    public static long todayEndUnixTime() {
        return todayStartUnixTime() + MILLI_SECONDS_OF_ONE_DAY;
    }

    public static boolean isSameDay(long time1, long time2) {
        Calendar cal1 = Calendar.getInstance();
        Calendar cal2 = Calendar.getInstance();
        cal1.setTimeInMillis(time1);
        cal2.setTimeInMillis(time2);
        return (cal1.get(Calendar.YEAR) == cal2.get(Calendar.YEAR))
                && (cal1.get(Calendar.DAY_OF_YEAR) == cal2.get(Calendar.DAY_OF_YEAR));
    }

    public static boolean isSameDayWithToday(long time) {
        Calendar todayCal = Calendar.getInstance();
        return isSameDay(todayCal.getTimeInMillis(), time);
    }

    public static boolean isSameDay(String strDate1, String strDate2) {
        try {
            Date date1 = formatDate(DATE_FORMAT_FULL, strDate1);
            Date date2 = formatDate(DATE_FORMAT_FULL, strDate2);
            return isSameDay(date1.getTime(), date2.getTime());
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return false;
    }



    public static boolean isCameraAvailable(Context context) {
        PackageManager pm = context.getPackageManager();
        return pm.hasSystemFeature(PackageManager.FEATURE_CAMERA);
    }

    public static boolean isUrl(String urlString) {
        if (urlString == null) {
            return false;
        }
        String regex = "^(https?|ftp|file)://[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%=~_|]";
        Pattern patt = Pattern.compile(regex);
        Matcher matcher = patt.matcher(urlString);
        boolean isMatch = matcher.matches();
        return isMatch;
    }

    public static String getFromRaw(Context context, int resID) {
        if (context == null || resID <= 0) {
            return null;
        }
        String result = "";

        try {
            InputStreamReader inputReader = new InputStreamReader(context.getResources().openRawResource(resID));
            BufferedReader bufReader = new BufferedReader(inputReader);
            String line = "";
            while ((line = bufReader.readLine()) != null)
                result += line;
            return result;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    public static String getFromAssets(Context context, String fileName) {
        String result = "";

        try {
            InputStreamReader inputReader = new InputStreamReader(context.getResources().getAssets().open(fileName));
            BufferedReader bufReader = new BufferedReader(inputReader);
            String line = "";
            while ((line = bufReader.readLine()) != null)
                result += line;
            return result;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    public static String getApplicationMetaData(Context context, String key) {
        String value = "";
        ApplicationInfo info;
        try {
            info = context.getPackageManager().getApplicationInfo(context.getPackageName(),
                    PackageManager.GET_META_DATA);
            value = info.metaData.getString(key);
        } catch (PackageManager.NameNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return value;
    }

    public static int getApplicationMetaDataInt(Context context, String key) {
        int value = 0;
        try {
            ApplicationInfo info = context.getPackageManager().getApplicationInfo(context.getPackageName(),
                    PackageManager.GET_META_DATA);
            value = info.metaData.getInt(key);
        } catch (PackageManager.NameNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return value;
    }

    public static void logList(List<Object> list) {
        for (int i = 0; i < list.size(); i++) {
            logD("LOGLIST", list.get(i).toString());
        }
    }

    public static String getMimeType(String fileUrl) throws IOException {
        FileNameMap fileNameMap = URLConnection.getFileNameMap();
        String type = fileNameMap.getContentTypeFor(fileUrl);
        return type;
    }

    public static String UTF8ToGBK(String string) {
        String gbk = "";
        if (string == null || string.length() == 0) {
            return gbk;
        }
        try {
            gbk = URLEncoder.encode(string, "GBK");
        } catch (UnsupportedEncodingException e1) {
            // TODO Auto-generated catch block
            e1.printStackTrace();
        }
        // try {
        // byte[] bytes = string.getBytes("GBK");
        // gbk = new String(bytes, "GBK");
        // } catch (UnsupportedEncodingException e) {
        // // TODO Auto-generated catch block
        // e.printStackTrace();
        // }
        return gbk;
    }

    public static String GBKToUTF8(String string) {
        String utf8 = string;
        if (string == null || string.length() == 0) {
            return utf8;
        }
        try {
            utf8 = URLDecoder.decode(string, "GBK");
        } catch (UnsupportedEncodingException e1) {
            // TODO Auto-generated catch block
            e1.printStackTrace();
        }
        // try {
        // byte[] bytes = string.getBytes("UTF-8");
        // utf8 = new String(bytes, "UTF-8");
        // } catch (UnsupportedEncodingException e) {
        // // TODO Auto-generated catch block
        // e.printStackTrace();
        // }
        return utf8;
    }

    /**
     * 获取版本名
     *
     * @return 当前应用的版本名
     */
    public static String getVersion(Context context) {
        try {
            PackageManager manager = context.getPackageManager();
            PackageInfo info = manager.getPackageInfo(context.getPackageName(), 0);
            String version = info.versionName;
            return version;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "";
    }

    /**
     * 获取版本号码
     *
     * @return 当前应用的版本号码
     */
    public static int getVersionCode(Context context) {
        try {
            PackageManager manager = context.getPackageManager();
            PackageInfo info = manager.getPackageInfo(context.getPackageName(), 0);
            int version = info.versionCode;
            return version;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return 0;
    }

    public static String getCacheDir(Context context) {
        String cachePath = "mounted".equals(Environment.getExternalStorageState()) ? getExternalCacheDir(context).getPath() : context.getCacheDir().getPath();
        return new File(cachePath + File.separator + "/ahnewsCache").getAbsolutePath();
    }

    public static File getExternalCacheDir(Context context) {
        String cacheDir = "/Android/data/" + context.getPackageName() + "/cache/";
        return new File(Environment.getExternalStorageDirectory().getPath() + cacheDir);
    }

    public static String getImgCachePath(Context context) {
        String cachePath = "mounted".equals(Environment.getExternalStorageState()) ? getExternalCacheDir(context).getPath() : context.getCacheDir().getPath();
        return new File(cachePath + File.separator + "/ahnews_img").getAbsolutePath();
    }

    private final static String regxpForHtml = "<([^>]*)>"; // 过滤所有以<开头以>结尾的标签

    /**
     * 基本功能：过滤所有以"<"开头以">"结尾的标签
     * <p>
     *
     * @param str
     * @return String
     */
    public static String filterHtml(String str) {
        Pattern pattern = Pattern.compile(regxpForHtml);
        Matcher matcher = pattern.matcher(str);
        StringBuffer sb = new StringBuffer();
        boolean result1 = matcher.find();
        while (result1) {
            matcher.appendReplacement(sb, "");
            result1 = matcher.find();
        }
        matcher.appendTail(sb);
        return sb.toString();
    }

    public static String encodeJSON(Object src) throws JsonSyntaxException {
        Gson gson = new Gson();
        return gson.toJson(src);
    }

    public static <T> T decodeJSON(String jsonString, Class<T> cls) throws JsonSyntaxException {
        Gson gson = new Gson();
        T model = gson.fromJson(jsonString, cls);
        if (model == null) {
            throw new JsonSyntaxException("model is null");
        }
        return model;
    }

    public static <T> List<T> decodeJSONARRAY(String jsonString, Class<T> cls) throws JsonSyntaxException {
        List<T> list = new ArrayList<T>();
        JSONArray array;
        try {
            array = new JSONArray(jsonString);
            for (int i = 0; i < array.length(); i++) {
                JSONObject object = array.getJSONObject(i);
                T model = decodeJSON(object.toString(), cls);
                list.add(model);
            }
        } catch (JSONException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return list;
    }

    public static <T> T decodeJSONWithCode(String jsonString, Class<T> cls) throws JsonSyntaxException {
        Gson gson = new Gson();
        JsonParser parser = new JsonParser();
        JsonObject jsonObject = parser.parse(jsonString).getAsJsonObject();
        JsonObject jsonObject2 = jsonObject.getAsJsonObject("data");
        T model = gson.fromJson(jsonObject2.toString(), cls);
        if (model == null) {
            throw new JsonSyntaxException("model is null");
        }
        return model;
    }

    public static <T> T decodeJSONWithCode(String jsonString, Class<T> cls, String name) throws JsonSyntaxException {
        Gson gson = new Gson();
        JsonParser parser = new JsonParser();
        JsonObject jsonObject = parser.parse(jsonString).getAsJsonObject();
        JsonObject jsonObject2 = jsonObject.getAsJsonObject(name);
        if (jsonObject2 == null) {
            return null;
        }
        T model = gson.fromJson(jsonObject2.toString(), cls);
        if (model == null) {
            throw new JsonSyntaxException("model is null");
        }
        return model;
    }

    public static <T> T decodeNewsJSONWithCode(String jsonString, Class<T> cls) throws JsonSyntaxException {
        Gson gson = new Gson();
        JsonParser parser = new JsonParser();
        if (jsonString == null || jsonString.equals("")) {
            return null;
        }
        JsonObject jsonObject = parser.parse(jsonString).getAsJsonObject();
        JsonObject jsonObject2 = jsonObject.getAsJsonObject("newsDetail");
        if (jsonObject2 == null) {
            return null;
        }
        T model = gson.fromJson(jsonObject2.toString(), cls);
        if (model == null) {
            throw new JsonSyntaxException("model is null");
        }
        return model;
    }

    public static <T> T decodeJSON(String jsonString, Type typeOfT) throws JsonSyntaxException {
        Gson gson = new Gson();
        return gson.fromJson(jsonString, typeOfT);
    }

    public static Map<String, Object> decodeJSONToMap(String jsonString) throws JsonSyntaxException {
        Gson gson = new Gson();
        Map<String, Object> map = gson.fromJson(jsonString, new TypeToken<Map<String, Object>>() {
        }.getType());
        return map;
    }

    /**
     * 手机号验证
     *
     * @param str
     * @return 验证通过返回true
     */
    public static boolean isMobile(String str) {
        Pattern p = null;
        Matcher m = null;
        boolean b = false;
        p = Pattern.compile("^[1][0-9]{10}$"); // 验证手机号
        m = p.matcher(str);
        b = m.matches();
        return b;
    }


    public static String hmacSHA1WithBase64(String key, String value) {
        return hmacWithBase64("HmacSHA1", key, value);
    }

    public static String hmacSHA256WithBase64(String key, String value) {
        return hmacWithBase64("HmacSHA256", key, value);
    }

    public static String hmacWithBase64(String algorithm, String key, String value) {
        SecretKeySpec keySpec = new SecretKeySpec(key.getBytes(), algorithm);

        try {
            Mac mac = Mac.getInstance(algorithm);
            mac.init(keySpec);
            byte[] result = mac.doFinal(value.getBytes());
            logD("UTIL", bytesToHex(result));
            return encodeToBase64String(result);
        } catch (NoSuchAlgorithmException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (InvalidKeyException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return null;
    }


    public static String encodeToBase64String(byte[] source) {
        return Base64.encodeToString(source, Base64.NO_WRAP);
    }

    public static byte[] decodeBase64FromString(String source) {
        return Base64.decode(source, Base64.NO_WRAP);
    }

    public static void setListViewHeightBasedOnChildren(ListView listView) {
        BaseAdapter listAdapter = (BaseAdapter) listView.getAdapter();
        if (listAdapter == null) {
            // pre-condition
            return;
        }
        int totalHeight = 0;
        for (int i = 0; i < listAdapter.getCount(); i++) {
            View listItem = listAdapter.getView(i, null, listView);
            listItem.measure(0, 0);
            totalHeight += listItem.getMeasuredHeight();
        }
        ViewGroup.LayoutParams params = listView.getLayoutParams();
        params.height = totalHeight + (listView.getDividerHeight() * (listAdapter.getCount() - 1));
        listView.setLayoutParams(params);
    }

    public static int getScreentWidth(Context context) {
        WindowManager wm = (WindowManager) context.getSystemService(Context.WINDOW_SERVICE);
        return wm.getDefaultDisplay().getWidth();
    }

    public static int getStatusBarHeight(Context context) {
        int result = 0;
        int resourceId = context.getResources().getIdentifier("status_bar_height", "dimen", "android");
        if (resourceId > 0) {
            result = context.getResources().getDimensionPixelSize(resourceId);
        }
        return result;
    }

    public static int dip2px(Context context, float dipValue) {
        final float scale = context.getResources().getDisplayMetrics().density;
        return (int) (dipValue * scale + 0.5f);
    }


    public String getLocalIpAddress() {
        try {
            for (Enumeration<NetworkInterface> en = NetworkInterface.getNetworkInterfaces(); en.hasMoreElements(); ) {
                NetworkInterface intf = en.nextElement();
                for (Enumeration<InetAddress> enumIpAddr = intf.getInetAddresses(); enumIpAddr.hasMoreElements(); ) {
                    InetAddress inetAddress = enumIpAddr.nextElement();
                    if (!inetAddress.isLoopbackAddress()) {
                        return inetAddress.getHostAddress().toString();
                    }
                }
            }
        } catch (SocketException ex) {

        }
        return null;
    }

}

