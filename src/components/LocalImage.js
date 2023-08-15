import React from 'react';
import FastImage from 'react-native-fast-image';
import {APP_IMAGES} from '../themes/images';

const LocalImage = ({imageKey, ...props}) => {
  if (!imageKey) {
    return null;
  }

  return <FastImage {...props} source={APP_IMAGES[imageKey]} />;
};

export default LocalImage;
