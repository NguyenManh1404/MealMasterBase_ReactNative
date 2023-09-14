import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {APP_COLORS} from '../themes/colors';
import {HIT_SLOP} from '../utils/constants';
import {isEmpty, valueAsDefault} from '../utils/helpers';
import Text from './Text';

const Checkbox = ({
  title,
  label,
  isSelected,
  onCheckboxPress,
  style,
  checkBoxTintColor = APP_COLORS.primary,
  labelColor = APP_COLORS.blackText,
  enabled = true,
  isShowIcon = true,
  iconStyle,
}) => {
  const checkboxTitleColor = enabled ? labelColor : APP_COLORS.gray;

  return (
    <View style={style}>
      {!isEmpty(title) && <Text type={'bold-14'}>{valueAsDefault(title)}</Text>}
      <TouchableOpacity
        disabled={!enabled}
        style={styles.btnSelect}
        hitSlop={HIT_SLOP}
        onPress={onCheckboxPress}>
        {isShowIcon &&
          (isSelected ? (
            <Icon name="check-square" size={20} color={APP_COLORS.primary} />
          ) : (
            <Icon name="square" size={20} color={APP_COLORS.primary} />
          ))}
        <Text style={styles.label} color={checkboxTitleColor}>
          {valueAsDefault(label)}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  btnSelect: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    paddingLeft: 10,
  },
});
