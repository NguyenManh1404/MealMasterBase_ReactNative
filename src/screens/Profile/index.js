import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  Image,
  NativeModules,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Config from 'react-native-config';
import {useDispatch, useSelector} from 'react-redux';
import {LocalImage} from '../../components';
import WSafeAreaView from '../../components/SafeAreaContainer';
import Text from '../../components/Text';
import {setUser} from '../../redux/AuthRedux';
import {APP_COLORS} from '../../themes/colors';
import {getRandomColorHex, isURL} from '../../utils/helpers';
import YourRecipes from './components/YourRecipes';
const {ConnectNativeModule} = NativeModules;

const ProfileScreen = () => {
  const userInfo = useSelector(state => state.auth.userInfo);
  const [tabPageHeight, setTabPageHeight] = useState(0);

  const {navigate} = useNavigation();

  const dispatch = useDispatch();
  const getRandomColorHe = getRandomColorHex();

  const Tab = createMaterialTopTabNavigator();

  const About = () => {
    return (
      <View style={styles.tabContainer}>
        <Text> About</Text>
      </View>
    );
  };

  const updateTabHeight = event => {
    const {height} = event.nativeEvent.layout;

    setTabPageHeight(height);
  };

  const goToNextApp = useCallback(async item => {
    await ConnectNativeModule?.openApp(
      'AwesomeProject',
      `index.${Platform.OS}-1.bundle`,
      {
        text: 'Hell0',
      },
      false,
      () => {},
    );

    const result = await ConnectNativeModule?.getBundleNames();
    console.log('qwwww', result);
    return result;
  }, []);

  return (
    <WSafeAreaView>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text type="bold-20">My Profile</Text>
          <TouchableOpacity
            onPress={() => {
              dispatch(setUser(null));
            }}>
            <LocalImage imageKey={'icBookMark'} style={styles.imageBlobHome} />
          </TouchableOpacity>
        </View>
        <View style={styles.userView}>
          <View style={styles.detailName}>
            <View style={styles.userView}>
              {userInfo?.avatar ? (
                <Image
                  source={{
                    uri: isURL(userInfo?.avatar)
                      ? userInfo?.avatar
                      : `${Config.BASE_URL_API}/public/${userInfo?.avatar}`,
                  }}
                  style={styles.defaultAvatar}
                />
              ) : (
                <View
                  style={[
                    styles.defaultAvatar,
                    {backgroundColor: getRandomColorHe},
                  ]}>
                  <Text type={'bold-20'} color={APP_COLORS.white}>
                    {userInfo?.firstName?.charAt(0)?.toUpperCase()}
                  </Text>
                </View>
              )}
              <Text style={styles.userName} type="bold-16">
                {userInfo.firstName} {userInfo.lastName && userInfo.lastName}
              </Text>
            </View>
            <View style={styles.numberReceip}>
              <View style={styles.list}>
                <Text type={'bold-16'} style={styles.listItem}>
                  Recipes
                </Text>
                <Text style={styles.listItem}>10</Text>
              </View>
              <View style={styles.list}>
                <Text type={'bold-16'} style={styles.listItem}>
                  Following
                </Text>
                <Text style={styles.listItem}>20</Text>
              </View>
              <View style={styles.list}>
                <Text type={'bold-16'} style={styles.listItem}>
                  Followers
                </Text>
                <Text style={styles.listItem}>2</Text>
              </View>
            </View>
          </View>
          <View style={styles.textname}>
            <Text style={styles.userName} type="bold-16">
              {/* {userData?.firstName} {userData?.lastName && userData?.lastName} */}
            </Text>
          </View>
        </View>

        <View style={styles.BtnEditProfile}>
          <TouchableOpacity
            onPress={() => {
              navigate('EditProfile', {userData: userInfo});
            }}>
            <View style={styles.viewEditProfile}>
              <Text type="bold-14" style={styles.TextEditProfile}>
                Edit Profile
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={goToNextApp}>
            <View style={styles.viewEditProfile}>
              <Text type="bold-14" style={styles.TextEditProfile}>
                Switch App
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <Tab.Navigator
            style={[styles.tabContainer, {height: tabPageHeight + 100}]}
            screenOptions={{
              tabBarIndicatorStyle: {backgroundColor: APP_COLORS.primary},
              tabBarActiveTintColor: APP_COLORS.primary,
            }}>
            <Tab.Screen
              name="Your Recipes"
              children={props => (
                <YourRecipes {...props} updateTabHeight={updateTabHeight} />
              )}
            />
            <Tab.Screen name="About" component={About} />
          </Tab.Navigator>
        </View>
      </ScrollView>
    </WSafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  imageBlobHome: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  detailName: {
    flexDirection: 'row',
  },
  list: {
    width: 80,
    height: 70,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  listItem: {
    color: APP_COLORS.black,
    justifyContent: 'space-between',
  },
  userName: {
    marginLeft: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: APP_COLORS.black,
  },
  numberReceip: {
    flexDirection: 'row',
    marginLeft: 20,
  },
  userView: {
    alignItems: 'center',
  },
  defaultAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: APP_COLORS.blue,
  },
  tabContainer: {
    minHeight: 100,
    backgroundColor: APP_COLORS.white,
  },

  BtnEditProfile: {
    marginBottom: 20,
    justifyContent: 'center',
  },
  viewEditProfile: {
    height: 40,
    borderRadius: 5,
    borderColor: APP_COLORS.greyL2,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextEditProfile: {
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 1,
    opacity: 0.8,
  },
});
