package com.mealmaster; // name of app

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;

public class SplashActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        try {
            super.onCreate(savedInstanceState);
            setContentView(R.layout.activity_splash);
            new Handler().postDelayed(new Runnable() {
                @Override
                public void run() {
                    Intent intent = new Intent(SplashActivity.this, MainActivity.class);
                    Bundle extras = getIntent().getExtras();
                    if (extras != null) {
                        intent.putExtras(extras);
                    }
                    intent.setAction(getIntent().getAction());
                   intent.setData(getIntent().getData());
                    startActivity(intent);
                    finish();
                }
            }, 1500); // set up time display of splash screen
        }
        catch(Exception e) {
            e.printStackTrace();
            finishAffinity();
        }
    }
}