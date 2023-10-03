import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '../../../components';
import {APP_COLORS} from '../../../themes/colors';

const StepsCard = ({number, content}) => {
  return (
    <View>
      <View style={styles.view1}>
        <View style={styles.view2}>
          <Text type={'bold-14'}>{number}</Text>
        </View>
        <Text style={styles.textContent}>{content}</Text>
      </View>
    </View>
  );
};

export default StepsCard;

const styles = StyleSheet.create({
  textContent: {
    textAlign: 'left',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  view2: {
    width: 40,
    height: 40,
    backgroundColor: APP_COLORS.white,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 24,
  },
  view1: {
    flexDirection: 'row',
    padding: 24,
    borderColor: APP_COLORS.gray,
    backgroundColor: APP_COLORS.backGroundPrimary,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
});
