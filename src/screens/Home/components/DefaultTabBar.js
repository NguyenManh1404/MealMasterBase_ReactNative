import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TabBar} from 'react-native-tab-view';
import {Text} from '../../../components';
import {APP_COLORS} from '../../../themes/colors';

const DefaultTabBar = ({primaryColor, ...props}) => {
  return (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: APP_COLORS.primary,
      }}
      renderLabel={({route, focused}) => (
        <View
          style={[
            styles.viewTabView,
            {
              backgroundColor: focused && APP_COLORS.primary,
            },
          ]}>
          <Text
            type={'bold-14'}
            color={focused ? APP_COLORS.white : APP_COLORS.primary}>
            {route.title}
          </Text>
        </View>
      )}
      style={{backgroundColor: APP_COLORS.white}}
    />
  );
};

export default DefaultTabBar;

const styles = StyleSheet.create({
  viewTabView: {
    width: 110,
    height: 40,
    paddingLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});
