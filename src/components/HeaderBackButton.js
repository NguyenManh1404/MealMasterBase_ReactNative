import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {APP_COLORS} from '../themes/colors';
import LocalImage from './LocalImage';

const HeaderBackButton = ({canGoBack, onGoBack}) => {
  const {goBack} = useNavigation();

  const onPress = () => {
    if (typeof onGoBack === 'function') {
      onGoBack?.();
    } else {
      goBack();
    }
  };

  return (
    <TouchableOpacity disabled={!canGoBack} onPress={onPress}>
      <LocalImage
        imageKey={'icCaretLeftx24'}
        tintColor={APP_COLORS.neturalBlack}
        style={styles.button}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 24,
    height: 24,
  },
});

export default HeaderBackButton;
