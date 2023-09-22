import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import React, {useEffect} from 'react';
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

import messaging from '@react-native-firebase/messaging';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {
  PERMISSIONS,
  RESULTS,
  openSettings,
  request,
} from 'react-native-permissions';
import {IS_IOS} from './src/utils/constants';
import {showSystemAlert} from './src/utils/helpers';

const AppWrapper = () => {
  // // auto CALL API to not stop
  // useQuery({
  //   queryKey: [{url: AUTHENTICATION_ENDPOINTS.GET_AUTH}],
  //   queryFn: commonQueryDetailFunction,
  //   select: res => {
  //     return res;
  //   },
  //   refetchInterval: 50000,
  // });
  // // auto CALL API to not stop

  const requestNotificationPermission = async () => {
    if (IS_IOS) {
      await messaging().registerDeviceForRemoteMessages();
      const authStatus = await messaging().requestPermission();
      // await messaging().setAPNSToken('sdfghj');
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        // eslint-disable-next-line no-console
        console.log('Authorization status:', authStatus);
      }
    } else {
      try {
        const response = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
        if (
          [RESULTS.BLOCKED, RESULTS.UNAVAILABLE, RESULTS.DENIED].includes(
            response,
          )
        ) {
          return showSystemAlert({
            message: error?.message,
            actions: [
              {text: 'cancel', onPress: () => {}},
              {
                text: 'ok',
                onPress: openSettings,
              },
            ],
          });
        }
      } catch (errors) {}
    }
  };

  useEffect(() => {
    requestNotificationPermission();
  }, []);

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
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 3,
        staleTime: 60 * 1000,
      },
    },
  });
  return (
    <NavigationContainer ref={navigationRef}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate loading={true} persistor={persistor}>
            <AppWrapper />
            <StatusBar />
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </NavigationContainer>
  );
};

export default App;

// const styles = StyleSheet.create({});
