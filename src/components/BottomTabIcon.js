import React from 'react';
import {APP_COLORS} from '../themes/colors';
import LocalImage from './LocalImage';

const BottomTabIcon = ({focused, size, source}) => {
  const appTintColor = focused ? APP_COLORS.primary : APP_COLORS.greyL2;

  return (
    <LocalImage
      imageKey={source}
      tintColor={appTintColor}
      style={{width: size, height: size}}
    />
  );
};

export default BottomTabIcon;
