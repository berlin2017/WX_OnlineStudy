package com.berlin.studyonline;

import android.app.AlarmManager;
import android.app.Application;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;

/**
 * Created by ahxmt on 2018/5/8.
 */

public class MyApplication extends Application implements Thread.UncaughtExceptionHandler {

    @Override
    public void onCreate() {
        super.onCreate();
        Thread.setDefaultUncaughtExceptionHandler(this);
    }

    @Override
    public void uncaughtException(Thread t, Throwable e) {
        System.out.println("uncaughtException==========" + e.getMessage());
        restartApp();
    }

    public void restartApp() {
        Intent intent = new Intent(getApplicationContext(), MainActivity.class);
        PendingIntent restartIntent = PendingIntent.getActivity(getBaseContext(), 0, intent, PendingIntent.FLAG_UPDATE_CURRENT);
        AlarmManager mgr = (AlarmManager) getSystemService(Context.ALARM_SERVICE);
        mgr.set(AlarmManager.RTC, System.currentTimeMillis() + 2000, restartIntent);
        System.exit(2);
    }
}
