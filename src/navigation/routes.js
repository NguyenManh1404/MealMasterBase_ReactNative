import Login from '../screens/Authentication/Login';
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
};

const ROUTE_NAMES = {
  BottomTabs: 'BottomTabs',
  HomeScreen: 'HomeScreen',
  FavoriteScreen: 'FavoriteScreen',
  RecipeScreen: 'RecipeScreen',
  NotificationScreen: 'NotificationScreen',
  ProfileScreen: 'ProfileScreen',
  Login: 'Login',
};

export {ROUTES, ROUTE_NAMES};
