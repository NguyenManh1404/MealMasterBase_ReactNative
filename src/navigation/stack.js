import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useMemo} from 'react';
import HeaderBackButton from '../components/HeaderBackButton';
import ViewImage from '../components/ViewImage';
import ChatScreen from '../screens/Chat';
import DetailRecipe from '../screens/DetailRecipe';
import EditProfile from '../screens/Profile/EditProfile';
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
        name: ROUTE_NAMES.ChatScreen,
        component: ChatScreen,
        options: {
          headerShown: false,
        },
      },

      {
        name: ROUTE_NAMES.EditProfile,
        component: EditProfile,
        options: {
          headerShown: false,
        },
      },

      {
        name: ROUTE_NAMES.DetailRecipe,
        component: DetailRecipe,
        options: {
          headerShown: false,
        },
      },
      {
        name: ROUTE_NAMES.ViewImage,
        component: ViewImage,
        options: {
          headerShown: false,
        },
      },
      // {
      //   name: ROUTE_NAMES.Login,
      //   component: ROUTES.Login,
      //   options: {
      //     headerShown: false || isAbleToGoHome,
      //   },
      // },
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
      {isAbleToGoHome ? (
        STACKS.map(({component, name, options}, index) => {
          return (
            <Stack.Screen
              key={index}
              name={name}
              component={component}
              options={options}
            />
          );
        })
      ) : (
        <Stack.Group
          screenOptions={SCREEN_OPTION}
          initialRouteName={ROUTE_NAMES.Login}>
          <Stack.Screen
            name={ROUTE_NAMES.Login}
            component={ROUTES.Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={ROUTE_NAMES.Register}
            component={ROUTES.Register}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={ROUTE_NAMES.VerifyAccount}
            component={ROUTES.VerifyAccount}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={ROUTE_NAMES.SendCodeVerifyEmail}
            component={ROUTES.SendCodeVerifyEmail}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={ROUTE_NAMES.ResetPassword}
            component={ROUTES.ResetPassword}
            options={{headerShown: false}}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};
export {MainNavigator};
