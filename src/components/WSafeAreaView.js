import React from 'react';
import {SafeAreaView as RNSafeAreaView, StyleSheet} from 'react-native';
import {useAppMode} from '../hooks/useAppMode';

const WSafeAreaView = viewProps => {
  const {bgColor, style, children, ...props} = viewProps;
  const {appModeColor} = useAppMode();
  return (
    <RNSafeAreaView
      style={[
        style,
        styles.container,
        {backgroundColor: bgColor || appModeColor.mainBackgroundColor},
      ]}
      {...props}>
      {children}
    </RNSafeAreaView>
  );
};

export default WSafeAreaView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
