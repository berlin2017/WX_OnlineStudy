package com.berlin.studyonline.loading;

import android.content.Context;
import android.content.res.TypedArray;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Rect;
import android.graphics.RectF;
import android.support.annotation.Nullable;
import android.util.AttributeSet;
import android.view.View;

import com.berlin.studyonline.R;

/**
 * Created by mac on 2018/1/22.
 */

public class MyProgressView extends View {
    private Paint paint;
    private float radiuWidth;
    private int progress = 100;
    private int max = 100;
    private int duration = 3000;
    private OnProgressChangedListener listener;

    public MyProgressView(Context context) {
        super(context);
        init();
    }

    public MyProgressView(Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        TypedArray mTypedArray = context.obtainStyledAttributes(attrs,
                R.styleable.MyProgressView);
        radiuWidth = mTypedArray.getDimension(R.styleable.MyProgressView_borderWidth,5);
        init();
    }

    public MyProgressView(Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        TypedArray mTypedArray = context.obtainStyledAttributes(attrs,
                R.styleable.MyProgressView);
        radiuWidth = mTypedArray.getDimension(R.styleable.MyProgressView_borderWidth,5);
        init();
    }

    public MyProgressView(Context context, @Nullable AttributeSet attrs, int defStyleAttr, int defStyleRes) {
        super(context, attrs, defStyleAttr, defStyleRes);
        TypedArray mTypedArray = context.obtainStyledAttributes(attrs,
                R.styleable.MyProgressView);
        radiuWidth = mTypedArray.getDimension(R.styleable.MyProgressView_borderWidth,5);
        init();
    }

    private void init(){
        paint = new Paint();
        paint.setColor(Color.RED);
        paint.setStrokeWidth(radiuWidth);
        paint.setStyle(Paint.Style.STROKE); //设置空心
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        Rect rect = new Rect();
        getDrawingRect(rect);

        RectF rectF = new RectF(rect.left+radiuWidth/2,rect.top+radiuWidth/2,rect.right-radiuWidth/2,rect.bottom-radiuWidth/2);
        canvas.drawArc(rectF,0,360*progress/max,false,paint);

    }

    public void setDuration(int duration){
        this.duration = duration;
    }

    public void start(){
        post(runnable);
    }

    Runnable runnable = new Runnable() {
        @Override
        public void run() {
            removeCallbacks(this);
            invalidate();
            if (progress>0){
                progress--;
                if (listener!=null){
                    listener.onProgressChanged(progress);
                }
            }
            postDelayed(this,duration/100);
        }
    };

    public void setListener(OnProgressChangedListener listener){
        this.listener = listener;
    }


    public interface OnProgressChangedListener{
        public abstract void onProgressChanged(int progress);
    }
}
