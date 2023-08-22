import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useMemo} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAppMode} from '../../hooks/useAppMode';
import {APP_COLORS} from '../../themes/colors';
import {LANGUAGE_KEY} from '../../utils/constants';
import {ROUTES, ROUTE_NAMES} from '../routes';

const BottomTabNavigator = createBottomTabNavigator();

export const PARENT_BOTTOM_TAB_SCREENS = [
  ROUTE_NAMES.HomeScreen,
  ROUTE_NAMES.FavoriteScreen,
  ROUTE_NAMES.RecipeScreen,
  ROUTE_NAMES.NotificationScreen,
  ROUTE_NAMES.ProfileScreen,
];

const BottomTabs = () => {
  const {t} = useTranslation();

  const {isLightMode} = useAppMode();
  const currentLanguage = AsyncStorage.getItem(LANGUAGE_KEY);
  const BOTTOM_TABS = useMemo(() => {
    return [
      {
        name: ROUTE_NAMES.HomeScreen,
        component: ROUTES.HomeScreen,
        options: {
          tabBarLabel: t('bottomTab.home'),
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
          tabBarLabel: t('bottomTab.favorite'),
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
          tabBarLabel: t('bottomTab.recipe'),
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
          tabBarLabel: t('bottomTab.notification'),
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
          tabBarLabel: t('bottomTab.profile'),
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, currentLanguage]); // currentLanguage đổi thì reRender lại
  return (
    <BottomTabNavigator.Navigator
      screenOptions={{
        tabBarActiveTintColor: APP_COLORS.primary,
        tabBarInactiveTintColor: !isLightMode
          ? APP_COLORS.white
          : APP_COLORS.greyL2,
        tabBarIconStyle: {width: 4, height: 4},
        tabBarStyle: {
          backgroundColor: isLightMode ? APP_COLORS.white : APP_COLORS.black,
        },
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
