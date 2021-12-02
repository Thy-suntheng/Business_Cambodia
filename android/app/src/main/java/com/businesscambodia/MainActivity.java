package com.businesscambodia;
import android.os.Bundle; // <- add this necessary import

import com.facebook.react.ReactActivity;
import com.zoontek.rnbootsplash.RNBootSplash; 
public class MainActivity extends ReactActivity {

  @Override
  protected String getMainComponentName() {
    return "BusinessCambodia";
  }
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState); // or super.onCreate(null) with react-native-screens
    RNBootSplash.init(R.drawable.bootsplash, MainActivity.this); // display the generated bootsplash.xml drawable over our MainActivity
  }
}
