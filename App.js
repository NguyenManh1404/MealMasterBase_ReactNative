import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {initI18n} from './src/i18n';
import {MainNavigator} from './src/navigation/stack';
import {persistor, store} from './src/redux/store';
initI18n(); //import multiLanguage

const navigationRef = createNavigationContainerRef();

const AppWrapper = () => {
  return <MainNavigator isAbleToGoHome={true} isAuthenticated={true} />;
};

const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Provider store={store}>
        <PersistGate loading={true} persistor={persistor}>
          <AppWrapper />
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
};

export default App;

// const styles = StyleSheet.create({});
