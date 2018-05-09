package com.berlin.studyonline.utils;

import android.content.Context;
import android.text.TextUtils;

import com.berlin.studyonline.user.model.User;
import com.google.gson.Gson;

/**
 * Created by ahxmt on 2018/5/8.
 */

public class UserUtils {

    public static User getUser(Context context){

        String str = Utils.readPreferences(context,"user_login","");
        if (TextUtils.isEmpty(str)){
            return null;
        }
        Gson gson = new Gson();
        return gson.fromJson(str,User.class);
    }
}
