package com.berlin.studyonline.loading;

import android.content.Intent;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.TextView;

import com.berlin.studyonline.MainActivity;
import com.berlin.studyonline.R;
import com.berlin.studyonline.RegisterActivity;
import com.berlin.studyonline.utils.UserUtils;

public class LoadingActivity extends AppCompatActivity implements MyProgressView.OnProgressChangedListener {

    private MyProgressView progressBar;
    private TextView textView;
    private int duration = 3000;


    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        progressBar = findViewById(R.id.progressBar);
        textView = findViewById(R.id.textView);
        textView.setText(duration/1000+"s");
        progressBar.setListener(this);
        progressBar.setDuration(duration);
        progressBar.start();
    }


    @Override
    public void onProgressChanged(int progress) {
        if (progress == 0){
            textView.setText("0s");
            Intent intent;
            if (UserUtils.getUser(this) == null){
                intent = new Intent(this,RegisterActivity.class);
            }else{
                intent = new Intent(this,MainActivity.class);
            }

            startActivity(intent);
            finish();
        }else{
            textView.setText((progress)*duration/1000/100+1+"s");
        }
    }
}
