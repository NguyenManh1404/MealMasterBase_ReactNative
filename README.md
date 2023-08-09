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
2. Go to https://icon.kitchen/ to export file;
   ![forEachResult](./readmeImg/iconKitchen.png)
3. Get the necessary files for the app, must be have two files about **_ic_launcher.png_** and **_ic_launcher_round.png_**;
   ![forEachResult](./readmeImg/androidIcon.png);

   - Lưu ý chỉnh sửa ảnh cho nó phù hợp với kích cỡ của màn hình, remove background;

4. Rebuild app again to check result;
   ![forEachResult](./readmeImg/doneAddIconAndroid.png);

## IOS Environment:

### Add Logo for android:

1. init a new project: `npx react-native@latest init AwesomeProject`;

- Default logo after build new project;
  ![forEachResult](./readmeImg/defautLogoIos.png)

2. Go to https://icon.kitchen/ to export file;
   ![forEachResult](./readmeImg/iconKitchen.png)
3. Open Xcode to start change logo:
   ![forEachResult](./readmeImg/openXcodeDefault.png)

4. Move image exported into Xcode:
   ![forEachResult](./readmeImg/openXcodeSetNewLogo.png)

5. Rebuild end check results:
   ![forEachResult](./readmeImg/doneChangeLogoIos.png)

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
