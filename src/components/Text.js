import React, {useMemo} from 'react';
import {Text as RNText} from 'react-native';
import {useAppMode} from '../hooks/useAppMode';

const styleByType = fontType => {
  const FONT_TYPE = fontType?.split('-');

  return {
    fontWeight: FONT_TYPE?.[0] || 'normal',
    fontSize: Number(FONT_TYPE?.[1]) || 14,
  };
};

const Text = textProps => {
  const {appModeColor} = useAppMode();
  const {style, type, textAlign, color, children, ...props} = textProps;

  const textStyle = useMemo(() => {
    return {
      textAlign,
      color: color || appModeColor.mainColor,
    };
  }, [textAlign, color, appModeColor.mainColor]);

  return (
    <RNText {...props} style={[style, styleByType(type), textStyle]}>
      {children}
    </RNText>
  );
};

export default Text;
