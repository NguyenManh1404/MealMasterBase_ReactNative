import Login from '../screens/Authentication/Login';
import Register from '../screens/Authentication/Register';
import ResetPassword from '../screens/Authentication/ResetPassword';
import SendCodeVerifyEmail from '../screens/Authentication/SendCodeVerifyEmail';
import VerifyAccount from '../screens/Authentication/VerifyAccount';
import ChatScreen from '../screens/Chat';
import FavoriteScreen from '../screens/Favorite';
import HomeScreen from '../screens/Home';
import NotificationScreen from '../screens/Notification';
import ProfileScreen from '../screens/Profile';
import RecipeScreen from '../screens/Recipe';

const ROUTES = {
  HomeScreen,
  NotificationScreen,
  RecipeScreen,
  FavoriteScreen,
  ProfileScreen,
  Login,
  Register,
  VerifyAccount,
  SendCodeVerifyEmail,
  ResetPassword,
  ChatScreen,
};

const ROUTE_NAMES = {
  BottomTabs: 'BottomTabs',
  HomeScreen: 'HomeScreen',
  FavoriteScreen: 'FavoriteScreen',
  RecipeScreen: 'RecipeScreen',
  NotificationScreen: 'NotificationScreen',
  ProfileScreen: 'ProfileScreen',
  Login: 'Login',
  Register: 'Register',
  VerifyAccount: 'VerifyAccount',
  SendCodeVerifyEmail: 'SendCodeVerifyEmail',
  ResetPassword: 'ResetPassword',
  ChatScreen: 'ChatScreen',
};

export {ROUTES, ROUTE_NAMES};
