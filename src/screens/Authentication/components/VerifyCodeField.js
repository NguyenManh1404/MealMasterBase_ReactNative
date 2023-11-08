import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {APP_COLORS} from '../../../themes/colors';
import {EMPTY_STRING} from '../../../utils/constants';
const CELL_COUNT = 6;

const VerifyCodeField = forwardRef(({cellCount = CELL_COUNT, style}, ref) => {
  const [value, setValue] = useState(EMPTY_STRING);
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const blurRef = useBlurOnFulfill({value, cellCount});

  useImperativeHandle(ref, () => ({
    getCode: () => value,
  }));

  return (
    <CodeField
      ref={blurRef}
      {...props}
      value={value}
      onChangeText={setValue}
      cellCount={CELL_COUNT}
      rootStyle={style}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      renderCell={({index, symbol, isFocused}) => (
        <Text
          key={index}
          style={[styles.cell, isFocused && styles.focusCell]}
          onLayout={getCellOnLayoutHandler(index)}>
          {symbol || (isFocused ? <Cursor /> : null)}
        </Text>
      )}
    />
  );
});

export default VerifyCodeField;

const styles = StyleSheet.create({
  cell: {
    width: 45,
    height: 45,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 1,
    borderColor: APP_COLORS.gray,
    textAlign: 'center',
    borderRadius: 5,
    backgroundColor: APP_COLORS.white,
  },
  focusCell: {
    borderColor: APP_COLORS.black,
  },
});
