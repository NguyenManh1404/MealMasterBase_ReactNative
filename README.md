# Setup environment for MAC OS

--updated 2/8/2023--

## Installed Node, Git, Yarn, NPM, Visual Studio.

1. Install **Xcode** :

![forEachResult](./readmeImg/xcodeInstall.png)

    Link: https://apps.apple.com/us/app/xcode/id497799835?mt=12/

2. Install **Homebrew** : Homebrew là chương trình quản lý các package (gói) nó hoạt động trên macOS, Linux. Sử dụng Homebrew giúp bạn dễ dàng cài đặt / gỡ bỏ các gói phần mềm

- Use this command: **/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"**

  link: https://docs.brew.sh/Installation

3. Install **ANDROID STUDIO**: https://developer.android.com/studio
4. Install **cocoapods**: https://formulae.brew.sh/formula/cocoapods
5. Install **yarn** with brew: use this command brew install yarn

6. **Setup emulator**:

   - Android environment: use **android studio**;

     1. **emulator -list-avds**: list máy ảo android
     2. **emulator -avd Pixel_4_API_30**: mở máy ảo

   - Ios environment: use **xcode**;

     1. **touch ~/.bash_profile** : create file;
     2. **open ~/.bash_profile** : open;
     3. Paste this command into this file:

     ```js
     export ANDROID_SDK_ROOT=$HOME/Library/Android/sdk
     export PATH=$PATH:$ANDROID_SDK_ROOT/emulator
     export PATH=$PATH:$ANDROID_SDK_ROOT/tools
     export PATH=$PATH:$ANDROID_SDK_ROOT/tools/bin
     export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools
     export JAVA_HOME=$(/usr/libexec/java_home -v 11.0.16.1)
     export PATH="$PATH:/Applications/Visual Studio Code.app/Contents/Resources/app/bin"
     ```

     - Lưu ý cài java version 11 nhé;
     - use this command **cd /Library/Java/JavaVirtualMachines/** gõ ls xem phiên bản bao nhiêu dk-11.0.16.1.jdk

     4. source ~/.bash_profile: save and apply
        ![forEachResult](./readmeImg/bash_profile.png)

# Setup environment for WINDOW

document: https://reactnative.dev/docs/environment-setup?os=windows&platform=android

1. Cài đặt máy ảo(Có thể dùng android studio hoặc genymotion);

- lưu ý: SetUp SDK cho Android studio như Trên doc

2. Tải SDk. Hiện tại chỉ hỗ trợ Java 11

3. Cài đặt sdk môi trường cho máy trỏ đến sdk vừa tải:

- Set up Environment cho `ANDROID_HOME `và `JAVA_HOME`
- Bỏ trong phần **path** với đường dẫn **C:\Users\admin\AppData\Local\Android\Sdk**

  ![forEachResult](./readmeImg/androidHome.png)

4. Cài đặt **react native client**:

   - Với câu lệnh: **npm i -g react-native-cli**

5. Khởi tạo project thôi:

   - Với câu lệnh: **npx react-native init NameProject**
   - Theo phiên bản chỉ định: **npx react-native init AwesomeProject --version X.XX.X**
   - Theo templay TypeScript: **npx react-native init AwesomeTSProject --template react-native-template-typescript**

6. Chạy thử:

--updated 2/8/2023--

# Add Splash screen / App logo for APP

Follow this guide link: https://youtu.be/_hgsAlPTGXY

## Android Environment:

### Add Logo for android:

1. Chose a image to make logo for app “png, jpg”;
2. Open your project with android studio;

- Choose Image Asset to open import logo feature;

![forEachResult](./readmeImg/openWithAndroid.png)

- Import the logo and adjust it to suit the app;
- After editing, click next, android studio will automatically apply the new logo to the app.

  ![forEachResult](./readmeImg/modifleIcon.png)
  ![forEachResult](./readmeImg/androidIcon.png);

- Lưu ý chỉnh sửa ảnh cho nó phù hợp với kích cỡ của màn hình, remove background;

4. Rebuild app again to check result;
   ![forEachResult](./readmeImg/doneAddIconAndroid.png);

### Add Splash Screen for android:

#### Custom with native module

1.  Choose a photo to make splash Screen;

- Drag this image logo.png into this folder `android/app/src/main/res/drawable`

  ![forEachResult](./readmeImg/addNewLogo.png)

2.  Create `layout` folder, then create `activity_splash.xml` file inside layout folder.

- Edit file `activity_splash.xml` as follows:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
  xmlns:app="http://schemas.android.com/apk/res-auto"
  xmlns:tools="http://schemas.android.com/tools"
  android:layout_width="match_parent"
  android:layout_height="match_parent"
  android:gravity="center"
  tools:context=".SplashActivity">
  <ImageView
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:background="@drawable/logo" />
      <!-- name of logo -->
</LinearLayout>
```

![Alt text](activity_splash.png)

3.  Create SplashActivity.java file inside `android/app/src/main/java/com/mealmaster`

- Edit file `SplashActivity.java` as follows:

```java
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
```

![Alt text](readmeImg/SplashActivity.png)

4.  Edit file `AndroidManifest.xml` with path `android/app/src/main/AndroidManifest.xml` as follows:

```xml
 <manifest xmlns:android="http://schemas.android.com/apk/res/android"
   package="com.mealmaster">

     <uses-permission android:name="android.permission.INTERNET" />

     <application
       android:name=".MainApplication"
       android:label="@string/app_name"
       android:icon="@mipmap/ic_launcher"
       android:roundIcon="@mipmap/ic_launcher_round"
       android:allowBackup="false"
       android:theme="@style/AppTheme">

     <activity android:name=".SplashActivity" android:exported="true" android:screenOrientation="portrait">
       <intent-filter>
         <action android:name="android.intent.action.MAIN"/>
         <category android:name="android.intent.category.LAUNCHER"/>
       </intent-filter>
     </activity>

       <activity
         android:name=".MainActivity"
         android:label="@string/app_name"
         android:configChanges="keyboard|keyboardHidden|orientation|screenLayout|screenSize|smallestScreenSize|uiMode"
         android:launchMode="singleTask"
         android:windowSoftInputMode="adjustResize"
         android:exported="true">
     <!-- app activity -->

     <!-- app activity -->
       </activity>

     </application>
 </manifest>
```

![Alt text](readmeImg/mainActivity.png)

5. Rebuild app and check results;
   ![Alt text](readmeImg/DoneSplashAndroid.png)

## IOS Environment:

### Add Logo for IOS:

1. init a new project: `npx react-native@latest init AwesomeProject`;

- Default logo after build new project;
  ![forEachResult](./readmeImg/defautLogoIos.png)

2. Open **Asset Catalog Creator** app to start export logo with all type for app:
   ![forEachResult](./readmeImg/catalogApp.png)
3. Import a logo to export file
   ![forEachResult](./readmeImg/importCatalog.png)

   - File after exporting:
     ![forEachResult](./readmeImg/filleAffterExport.png)

4. Replace folder exported into your project:
   ![forEachResult](./readmeImg/replayLogoIos.png)

5. Rebuild end check results:
   ![forEachResult](./readmeImg/doneChangeLogoIos.png)

### Add Splash Screen for IOS:

1.  Open Xcode to make splash screen for IOS,

- Default Splash screen

![Alt text](readmeImg/defaultSplashIos.png)

2. Import SplashScreen image;
   ![Alt text](readmeImg/importSplashI%C3%B3.png)

3. Modify LaunchScreen;

![Alt text](readmeImg/modifilSplashIos.png)

4.  Check again for work on all devices;

![Alt text](readmeImg/checkForAllIos.png)

5. Rebuild and check result

--updated 8/8/2023--

# Add eslint and auto format code when save;

1. Modified file **MealMaster/.eslintrc.js**

```js
module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'no-duplicate-imports': 'error',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'no-alert': 2,
    'no-console': 2,
    'react-native/no-unused-styles': 2,
    'react-native/no-inline-styles': 2,
    'react-native/no-color-literals': 2,
    'react/no-unused-state': 2,
    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': 2,
    'no-unused-vars': 2,
    'sort-imports': [
      'error',
      {
        ignoreDeclarationSort: true,
      },
    ],
  },
};
```

2. Make new folder **.vscode**, and a file in that **settings.json**;

```js
{
  "security.workspace.trust.untrustedFiles": "open",
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "workbench.iconTheme": "material-icon-theme",
  "javascript.updateImportsOnFileMove.enabled": "always",
  "editor.codeActionsOnSave": {
    "source.organizeImports": true,
    "source.sortMembers": true
  },
  "editor.tabCompletion": "on",
  "window.zoomLevel": -1
}

```

3. Checking results;

# Add quickly command;

Modify **package.json** file;

```json

"scripts":{
  ///......
    "android:clean": "cd android && ./gradlew clean",
    "podInstall": "cd ios && pod install && cd ..",
    "podNewClear": "cd ios && rm -rf Pods/* && rm -rf Podfile.lock && cd ..",
    "newclear": "yarn removeCachedFiles && yarn removeCachedMetro && yarn podNewClear && yarn && yarn android:clean && yarn podInstall"

}

```

# Add Vector ICON and Component Paper;

link: https://www.npmjs.com/package/react-native-vector-icons

1. Add library:

- **yarn add react-native-vector-icons**: add icons [ 'AntDesign.ttf', 'Entypo.ttf', 'EvilIcons.ttf','Feather.ttf', 'FontAwesome.ttf', 'FontAwesome5_Brands.ttf','FontAwesome5_Regular.ttf', 'FontAwesome5_Solid.ttf', 'Fontisto.ttf','Foundation.ttf','Ionicons.ttf','MaterialIcons.ttf', 'MaterialCommunityIcons.ttf', 'SimpleLineIcons.ttf', 'Octicons.ttf', 'Zocial.ttf' ];

- **yarn add react-native-paper** : Thư viện này sẽ một số compent tạo sẵn mình import nhanh vào để dùng

2. Set up IOS;

- Browse to **node_modules/react-native-vector-icons** and drag the folder Fonts to your project in Xcode.
  ![forEachResult](./readmeImg/addIconIos.png)
- Or change file

```plist
......
		</dict>
	</dict>
	<key>NSLocationWhenInUseUsageDescription</key>
	<string></string>
  	<!-- fontIcon for IOS -->
	<key>UIAppFonts</key>
	<array>
	  <string>AntDesign.ttf</string>
      <string>Entypo.ttf</string>
      <string>EvilIcons.ttf</string>
      <string>Feather.ttf</string>
      <string>FontAwesome.ttf</string>
      <string>FontAwesome5_Brands.ttf</string>
      <string>FontAwesome5_Regular.ttf</string>
      <string>FontAwesome5_Solid.ttf</string>
      <string>Fontisto.ttf</string>
      <string>Foundation.ttf</string>
      <string>Ionicons.ttf</string>
      <string>MaterialIcons.ttf</string>
      <string>MaterialCommunityIcons.ttf</string>
      <string>SimpleLineIcons.ttf</string>
      <string>Octicons.ttf</string>
      <string>Zocial.ttf</string>
	</array>
  	<!-- fontIcon for IOS -->
	<key>UILaunchStoryboardName</key>
	<string>LaunchScreen</string>
	<key>UIRequiredDeviceCapabilities</key>
	<array>
		<string>armv7</string>
	</array>
  .......
```

3. Setup for Android

- Edit `android/app/build.gradle` ( NOT `android/build.gradle` ) and add the following:

```gradle
apply from: file("../../node_modules/react-native-vector-icons/fonts.gradle")
```

- To customize the files being copied, add the following instead:

```gradle
project.ext.react = [
    enableHermes: true,  // clean and rebuild if changing
]

project.ext.vectoricons = [
    iconFontNames: [ 'AntDesign.ttf', 'Entypo.ttf', 'EvilIcons.ttf','Feather.ttf', 'FontAwesome.ttf', 'FontAwesome5_Brands.ttf','FontAwesome5_Regular.ttf', 'FontAwesome5_Solid.ttf', 'Fontisto.ttf','Foundation.ttf','Ionicons.ttf','MaterialIcons.ttf', 'MaterialCommunityIcons.ttf', 'SimpleLineIcons.ttf', 'Octicons.ttf', 'Zocial.ttf' ] // Name of the font files you want to copy
]

apply from: file("../../node_modules/react-native-vector-icons/fonts.gradle")
apply from: "../../node_modules/react-native/react.gradle"
```

# Add Navigation for Project;

## Setup

1. Add library :

- **yarn add @react-navigation/native**:
- **yarn add react-native-screens react-native-safe-area-context**
- **yarn add @react-navigation/native-stack**
- **yarn add @react-native-pager-view**

2. Remove old app, and rebuild.

## Demo navigate

<details>
    <summary><b>DEMO</b></summary>

```js
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

const Stack = createNativeStackNavigator();

const HomeScreen = () => {
  const {navigate} = useNavigation();
  return (
    <View>
      <Text>HomeScreen</Text>
      <TouchableOpacity
        onPress={() => {
          navigate('Details');
        }}>
        <Text>Navigate</Text>
      </TouchableOpacity>
    </View>
  );
};

const DetailsScreen = () => {
  const {navigate} = useNavigation();
  return (
    <View>
      <Text>DetailsScreen</Text>
      <TouchableOpacity
        onPress={() => {
          navigate('Favorite');
        }}>
        <Text>Navigate</Text>
      </TouchableOpacity>
    </View>
  );
};

const FavoriteScreen = () => {
  const {popToTop} = useNavigation(); // navigate to the initialRouteName
  return (
    <View>
      <Text>FavoriteScreen</Text>
      <TouchableOpacity onPress={popToTop}>
        <Text>Navigate</Text>
      </TouchableOpacity>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Favorite" component={FavoriteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

// const styles = StyleSheet.create({});
```

</details>

## Bottom Tab Navigator

link: https://reactnavigation.org/docs/material-bottom-tab-navigator/

1. Add library :

### Use are made sure installed all library here

- **yarn add @react-navigation/material-bottom-tabs react-native-paper react-native-vector-icons** :
- **yarn add @react-navigation/native**:
- **yarn add react-native-screens react-native-safe-area-context**
- **yarn add @react-navigation/native-stack**
- **yarn add @react-native-pager-view**

<details>
    <summary><b>DEMO</b></summary>

```js
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity} from 'react-native';
import {
  Avatar,
  Banner,
  Button,
  Card,
  IconButton,
  Searchbar,
  Tooltip,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/FontAwesome5';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {SafeAreaView} from 'react-native-safe-area-context';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();

// const Stack = createNativeStackNavigator();

const HomeScreen = () => {
  const {navigate} = useNavigation();
  const [visible, setVisible] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  const LeftContent = props => <Avatar.Icon {...props} icon="folder" />;
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
        <Text>HomeScreen</Text>
        <Avatar.Icon size={24} icon="folder" color="yellow" />
        <Icon name="rocket" size={30} color="#900" solid />
        <Button
          onPress={() => {
            navigate('Details');
          }}>
          <Text>Navigate</Text>
        </Button>

        <Banner
          visible={visible}
          actions={[
            {
              label: 'Fix it',
              onPress: () => setVisible(false),
            },
            {
              label: 'Learn more',
              onPress: () => setVisible(false),
            },
          ]}
          icon={({size}) => (
            <Image
              source={{
                uri: 'https://avatars3.githubusercontent.com/u/17571969?s=400&v=4',
              }}
              style={{
                width: size,
                height: size,
              }}
            />
          )}>
          There was a problem processing a transaction on your credit card.
        </Banner>

        <Card>
          <Card.Title
            title="Card Title"
            subtitle="Card Subtitle"
            left={LeftContent}
          />
          <Card.Content>
            <Text variant="titleLarge">Card title</Text>
            <Text variant="bodyMedium">Card content</Text>
          </Card.Content>
          <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
          <Card.Actions>
            <Button>Cancel</Button>
            <Button>Ok</Button>
          </Card.Actions>
        </Card>

        <Tooltip title="Selected Camera">
          <IconButton icon="camera" selected size={24} onPress={() => {}} />
        </Tooltip>

        <Icon.Button name="facebook" onPress={this.loginWithFacebook} solid>
          Login with Facebook
        </Icon.Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const DetailsScreen = () => {
  const {navigate} = useNavigation();
  return (
    <SafeAreaView>
      <Text>DetailsScreen</Text>
      <TouchableOpacity
        onPress={() => {
          navigate('Favorite');
        }}>
        <Text>Navigate</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const ProfileScreen = () => {
  const {popToTop} = useNavigation();
  return (
    <SafeAreaView>
      <Text>FavoriteScreen</Text>
      <TouchableOpacity onPress={popToTop}>
        <Text>Navigate</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#e91e63"
        barStyle={{backgroundColor: 'white'}}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            tabBarLabel: 'Updates',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="bell" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;

// const styles = StyleSheet.create({});
```

</details>
