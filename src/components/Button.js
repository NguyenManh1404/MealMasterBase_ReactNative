import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from '.';
import {APP_COLORS} from '../themes/colors';
import {BUTTON_VARIANTS} from '../utils/constants';

const Button = ({
  textStyle,
  label,
  style,
  variant = BUTTON_VARIANTS.FILL,
  disabled,
  ...props
}) => {
  const buttonVariantStyle = useMemo(() => {
    switch (variant) {
      case BUTTON_VARIANTS.FILL:
        return {
          backgroundColor: disabled ? APP_COLORS.gray : APP_COLORS.primary,
        };
      case BUTTON_VARIANTS.OUTLINE:
        return {
          borderWidth: 1,
          borderColor: disabled ? APP_COLORS.gray : APP_COLORS.primary,
        };
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, ['red', disabled, variant]);

  const labelVariantColor = useMemo(() => {
    return variant === BUTTON_VARIANTS.FILL ? APP_COLORS.white : 'red';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, ['red', variant]);

  return (
    <TouchableOpacity
      {...props}
      disabled={disabled}
      style={{
        ...styles.button,
        ...buttonVariantStyle,
        ...style,
      }}>
      <Text
        type={'bold-14'}
        color={labelVariantColor}
        textAlign="center"
        style={textStyle}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    borderRadius: 4,
  },
});

export default Button;
