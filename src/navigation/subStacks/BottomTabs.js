import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useMemo} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {APP_COLORS} from '../../themes/colors';
import {ROUTES, ROUTE_NAMES} from '../routes';

const BottomTabNavigator = createBottomTabNavigator();

export const BOTTOMTAB_OPTIONS = {
  // tabBarShowLabel: true, //Luôn hiển thị tên và icon
  headerShadowVisible: true,
  headerTitleAlign: 'center',
  tabBarHideOnKeyboard: true, //  Ẩn thanh điều hướng khi bàn phím hiển thị
  tabBarInactiveTintColor: APP_COLORS.greyL2,
  tabBarStyle: {
    elevation: 0,
    borderWidth: 0,
    backgroundColor: 'red',
  },
  tabBarBadgeStyle: {
    //điều chỉnh hiển thị số lượng thông báo
    fontSize: 14,
  },
};

export const PARENT_BOTTOM_TAB_SCREENS = [
  ROUTE_NAMES.HomeScreen,
  ROUTE_NAMES.FavoriteScreen,
  ROUTE_NAMES.RecipeScreen,
  ROUTE_NAMES.NotificationScreen,
  ROUTE_NAMES.ProfileScreen,
];

const BottomTabs = () => {
  const BOTTOM_TABS = useMemo(() => {
    return [
      {
        name: ROUTE_NAMES.HomeScreen,
        component: ROUTES.HomeScreen,
        options: {
          tabBarLabel: 'Home',
          tabBarIcon: ({color, focused}) => (
            <MaterialCommunityIcons
              name={focused ? 'home' : 'home-outline'}
              color={color}
              size={26}
            />
          ),
          headerShown: false,
          lazy: true,
        },
      },
      {
        name: ROUTE_NAMES.FavoriteScreen,
        component: ROUTES.FavoriteScreen,
        options: {
          tabBarLabel: 'Favorite',
          tabBarIcon: ({color, focused}) => (
            <FontAwesome
              name={focused ? 'heart' : 'heart-o'}
              color={color}
              size={23}
            />
          ),
          headerShown: false,
          lazy: true,
        },
      },
      {
        name: ROUTE_NAMES.RecipeScreen,
        component: ROUTES.RecipeScreen,
        options: {
          tabBarLabel: 'Recipe',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="plus-circle"
              color={color}
              size={26}
            />
          ),
          headerShown: false,
          lazy: true,
        },
      },
      {
        name: ROUTE_NAMES.NotificationScreen,
        component: ROUTES.NotificationScreen,
        options: {
          tabBarLabel: 'Notification',
          tabBarIcon: ({color, focused}) => (
            <MaterialCommunityIcons
              name={focused ? 'bell' : 'bell-outline'}
              color={color}
              backgroundColor={'white'}
              size={26}
            />
          ),
          headerShown: false,
          lazy: true,
        },
      },
      {
        name: ROUTE_NAMES.ProfileScreen,
        component: ROUTES.ProfileScreen,
        options: {
          tabBarLabel: 'Profile',

          tabBarIcon: ({color, focused}) => (
            <FontAwesome
              name={focused ? 'user' : 'user-o'}
              color={color}
              size={focused ? 26 : 23}
            />
          ),

          headerShown: false,
          lazy: true,
        },
      },
    ];
  }, []);
  return (
    <BottomTabNavigator.Navigator
      screenOptions={{
        tabBarActiveTintColor: APP_COLORS.primary,
        tabBarInactiveTintColor: APP_COLORS.greyL2,
        tabBarIconStyle: {width: 4, height: 4},

        tabBarStyle: {},
      }}
      initialRouteName={ROUTE_NAMES.HomeScreen}
      tabBarActiveTintColor={APP_COLORS.primary}>
      {BOTTOM_TABS.map(({name, component, options}, index) => {
        return (
          <BottomTabNavigator.Screen
            key={index}
            name={name}
            component={component}
            options={{
              lazy: options.lazy,
              headerShown: options.headerShown,
              headerTitle: options.headerTitle,
              tabBarLabel: options.tabBarLabel,
              tabBarIcon: options.tabBarIcon,
            }}
          />
        );
      })}
    </BottomTabNavigator.Navigator>
  );
};

export default BottomTabs;
