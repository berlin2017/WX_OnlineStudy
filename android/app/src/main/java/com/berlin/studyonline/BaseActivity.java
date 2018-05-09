package com.berlin.studyonline;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;
import android.view.Gravity;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

/**
 * Created by ahxmt on 2018/5/8.
 */

public class BaseActivity extends AppCompatActivity implements View.OnClickListener {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setActionBar();
    }

    public void setActionBar(){
        ActionBar actionBar = getSupportActionBar();
        actionBar.setCustomView(R.layout.layout_custom_actionbar);
        actionBar.setDisplayOptions(ActionBar.DISPLAY_SHOW_CUSTOM);
        actionBar.setDisplayShowCustomEnabled(true);
        TextView titleView = actionBar.getCustomView().findViewById(R.id.custom_actionbar_title);
        titleView.setText(getTitle());
    }

    public void setConBackActionBar(){
        ImageView backImage = getSupportActionBar().getCustomView().findViewById(R.id.custom_actionbar_back);
        backImage.setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {
        finish();
    }
}
