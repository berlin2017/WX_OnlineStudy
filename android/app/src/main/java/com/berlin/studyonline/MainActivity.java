package com.berlin.studyonline;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.view.ViewPager;
import android.support.v7.app.AppCompatActivity;

import com.ashokvarma.bottomnavigation.BottomNavigationBar;
import com.ashokvarma.bottomnavigation.BottomNavigationItem;

/**
 * Created by ahxmt on 2018/5/8.
 */

public class MainActivity extends BaseActivity{

    private BottomNavigationBar bottomNavigationBar;
    private ViewPager viewPager;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.layout_main);
        getSupportActionBar().hide();
        bottomNavigationBar = findViewById(R.id.main_navigation);
        viewPager = findViewById(R.id.main_viewPager);
        setNavigation();
    }

    public void setNavigation(){
        bottomNavigationBar.addItem(new BottomNavigationItem(R.drawable.ic_tab_home,"首页"));
    }
}
