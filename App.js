import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'react-native';
import {Provider, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {useAppMode} from './src/hooks/useAppMode';
import {initI18n} from './src/i18n';
import {MainNavigator} from './src/navigation/stack';
import {persistor, store} from './src/redux/store';
initI18n(); //import multiLanguage

import {MD3LightTheme, PaperProvider} from 'react-native-paper';
import {APP_COLORS} from './src/themes/colors';
const navigationRef = createNavigationContainerRef();

const AppWrapper = () => {
  const {isLightMode} = useAppMode();
  StatusBar.setBarStyle(isLightMode ? 'default' : 'light-content');

  const userInfo = useSelector(state => state.auth.userInfo);

  const theme = {
    ...MD3LightTheme, // or MD3DarkTheme
    roundness: 2,
    colors: {
      ...MD3LightTheme.colors,
      primary: isLightMode ? APP_COLORS.black : '#3498db',
      secondary: '#f1c40f',
      tertiary: isLightMode ? APP_COLORS.black : APP_COLORS.black,
      brandPrimary: '#fefefe',
      brandSecondary: 'red',
      myOwnColor: '#BADA55',
    },
  };
  return (
    <PaperProvider theme={theme}>
      <MainNavigator isAbleToGoHome={userInfo} />
    </PaperProvider>
  );
};

const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Provider store={store}>
        <PersistGate loading={true} persistor={persistor}>
          <AppWrapper />
          <StatusBar />
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
};

export default App;

// const styles = StyleSheet.create({});
