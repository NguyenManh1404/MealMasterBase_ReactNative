import React from 'react';
import {View as RNView} from 'react-native';
import {useAppMode} from '../hooks/useAppMode';

const WView = viewProps => {
  const {bgColor, style, children, ...props} = viewProps;
  const {appModeColor} = useAppMode();
  return (
    <RNView
      style={[
        style,
        {backgroundColor: bgColor || appModeColor.mainBackgroundColor},
      ]}
      {...props}>
      {children}
    </RNView>
  );
};

export default WView;
