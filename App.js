import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import React from 'react';
import {initI18n} from './src/i18n';
import {MainNavigator} from './src/navigation/stack';
initI18n();

const navigationRef = createNavigationContainerRef();

const AppWrapper = () => {
  return <MainNavigator isAbleToGoHome={true} isAuthenticated={true} />;
};

const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <AppWrapper />
    </NavigationContainer>
  );
};

export default App;

// const styles = StyleSheet.create({});
