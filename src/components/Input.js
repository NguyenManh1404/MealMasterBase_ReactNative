import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {LocalImage, Text} from '.';
import {APP_COLORS} from '../themes/colors';
import {FONT_SIZES} from '../themes/fonts';
import {EMPTY_STRING, HIT_SLOP, INPUT_ICON_SIZE} from '../utils/constants';
import {isEmpty} from '../utils/helpers';

const Input = forwardRef(
  (
    {
      secureTextEntry,
      style,
      inputStyle,
      labelStyle,
      error,
      required = false,
      label,
      defaultValue = EMPTY_STRING,
      preIcon,
      rightIcon,
      onChangeText,
      multiline,
      inputContainerStyle,
      inputWrapperStyle,
      isTouchable = false,
      touched,
      placeholderTextColor = APP_COLORS.neutral500Base,
      isClearButtonMode,
      ...props
    },
    ref,
  ) => {
    const inputRef = useRef();
    const [isSecureMode, setIsSecureMode] = useState(secureTextEntry);
    const [text, setText] = useState(defaultValue);

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
      blur: () => inputRef.current?.blur(),
      clear: () => {
        inputRef.current?.clear();
        setText(EMPTY_STRING);
      },
      isFocused: () => inputRef.current?.isFocused(),
      resetDefaultValue: () => {
        setText(defaultValue);
      },
    }));

    const toggleSecureState = useCallback(() => {
      setIsSecureMode(prevSecure => !prevSecure);
    }, []);

    const changeText = value => {
      onChangeText?.(value);
      setText(value);
    };

    const borderColor = useMemo(
      () => (error ? APP_COLORS.error : APP_COLORS.grey),
      [error],
    );

    return (
      <View style={style}>
        <View
          style={[
            styles.inputContainer,
            multiline ? styles.multiline : styles.notMultiline,
            inputContainerStyle,
            {borderColor},
          ]}>
          {label && (
            <Text
              type={text ? 'normal-12' : 'bold-12'}
              color={text ? APP_COLORS.gray : APP_COLORS.black}
              style={labelStyle}>
              {label}{' '}
              {required && (
                <Text
                  type={text ? 'normal-12' : 'bold-12'}
                  color={APP_COLORS.error}>
                  *
                </Text>
              )}
            </Text>
          )}
          <View style={[styles.inputWrapper]}>
            {preIcon && (
              <LocalImage
                imageKey={preIcon?.imageKey}
                style={[styles.preIcon, preIcon?.style]}
              />
            )}

            {isTouchable ? (
              <Text
                numberOfLines={1}
                style={styles.inputTouchable}
                color={
                  isEmpty(defaultValue)
                    ? placeholderTextColor
                    : APP_COLORS.neutral800PrimaryText
                }>
                {defaultValue || props?.placeholder}
              </Text>
            ) : (
              <TextInput
                {...props}
                placeholderTextColor={placeholderTextColor}
                style={[styles.input, inputStyle]}
                ref={inputRef}
                allowFontScaling={false}
                blurOnSubmit={false}
                secureTextEntry={isSecureMode}
                onChangeText={changeText}
                value={defaultValue || text}
                multiline={multiline}
                autoCapitalize={multiline ? 'sentences' : 'none'}
              />
            )}

            {secureTextEntry && (
              <TouchableOpacity onPress={toggleSecureState}>
                <LocalImage
                  imageKey={isSecureMode ? 'icEyeClose' : 'icEyeOpen'}
                  style={styles.secureIcon}
                  tintColor={APP_COLORS.inputIcon}
                />
              </TouchableOpacity>
            )}
            {rightIcon && (
              <TouchableOpacity
                disabled={!rightIcon?.onPress}
                onPress={rightIcon?.onPress}>
                <LocalImage
                  imageKey={rightIcon?.imageKey}
                  style={[styles.preIcon, rightIcon?.style]}
                  tintColor={rightIcon?.tintColor || APP_COLORS.inputIcon}
                />
              </TouchableOpacity>
            )}
            {isClearButtonMode && text?.length > 0 && (
              <TouchableOpacity
                onPress={() => changeText(EMPTY_STRING)}
                style={styles.btnClear}
                hitSlop={HIT_SLOP}>
                <LocalImage
                  imageKey={'icCloseCircle'}
                  style={styles.iconClearTextAndroid}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        {error && (
          <Text type="normal-12" color={APP_COLORS.error} style={styles.error}>
            {error}
          </Text>
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  input: {
    flex: 1,
    fontSize: FONT_SIZES.medium,
    color: APP_COLORS.black,
    paddingLeft: 0,
  },
  inputTouchable: {
    flex: 1,
    fontSize: FONT_SIZES.medium,
    paddingTop: Platform.select({
      ios: 0,
      android: 4,
    }),
  },
  error: {
    marginTop: 5,
  },
  preIcon: {
    width: 12,
    height: 12,
    tintColor: APP_COLORS.inputIcon,
    marginRight: 5,
  },
  secureIcon: {
    width: INPUT_ICON_SIZE,
    height: INPUT_ICON_SIZE,
    marginHorizontal: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Platform.select({
      ios: 5,
      android: 0,
    }),
  },
  multiline: {
    maxHeight: 150,
  },
  notMultiline: {
    maxHeight: 64,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 15,
    paddingRight: 8,
    paddingTop: 11,
    paddingBottom: 15,
    backgroundColor: APP_COLORS.white,
  },
  btnClear: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginLeft: 5,
  },
  iconClearTextAndroid: {
    width: 16,
    height: 16,
  },
});

export default Input;
