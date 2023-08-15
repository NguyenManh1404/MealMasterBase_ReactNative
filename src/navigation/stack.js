import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useMemo} from 'react';
import HeaderBackButton from '../components/HeaderBackButton';
import {ROUTES, ROUTE_NAMES} from './routes';
import BottomTabs from './subStacks/BottomTabs';

const Stack = createNativeStackNavigator();

const SCREEN_OPTION = {
  headerBackTitleVisible: false,
  orientation: 'portrait', // chỉ hiển thị theo chiều dọc
  headerBackButtonMenuEnabled: false,
  headerBackVisible: false,
  headerLeft: props => {
    return <HeaderBackButton {...props} />;
  },
  headerTitleStyle: {
    fontSize: 25,
  },
  headerShadowVisible: true,
  headerTitleAlign: 'center',
  gestureEnabled: true, // cho phép vuốt để chuyển tab
};

const MainNavigator = ({isAbleToGoHome}) => {
  const STACKS = useMemo(() => {
    return [
      {
        name: ROUTE_NAMES.BottomTabs,
        component: BottomTabs,
        options: {
          headerShown: false,
        },
      },
      {
        name: ROUTE_NAMES.Login,
        component: ROUTES.Login,
        options: {},
      },
    ];
  }, []);

  const initialRouteName = useMemo(() => {
    if (isAbleToGoHome) {
      return ROUTE_NAMES.BottomTabs;
    }
    return ROUTE_NAMES.Login;
  }, [isAbleToGoHome]);
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={SCREEN_OPTION}>
      {STACKS.map(({component, name, options}, index) => {
        return (
          <Stack.Screen
            key={index}
            name={name}
            component={component}
            options={options}
          />
        );
      })}
    </Stack.Navigator>
  );
};
export {MainNavigator};
