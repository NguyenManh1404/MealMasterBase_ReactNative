import {NavigationContainer, useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity} from 'react-native';
import {
  Avatar,
  Banner,
  Button,
  Card,
  IconButton,
  Searchbar,
  Tooltip,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/FontAwesome5';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {SafeAreaView} from 'react-native-safe-area-context';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();

// const Stack = createNativeStackNavigator();

const HomeScreen = () => {
  const {navigate} = useNavigation();
  const [visible, setVisible] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  const LeftContent = props => <Avatar.Icon {...props} icon="folder" />;
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
        <Text>HomeScreen</Text>
        <Avatar.Icon size={24} icon="folder" color="yellow" />
        <Icon name="rocket" size={30} color="#900" solid />
        <Button
          onPress={() => {
            navigate('Details');
          }}>
          <Text>Navigate</Text>
        </Button>

        <Banner
          visible={visible}
          actions={[
            {
              label: 'Fix it',
              onPress: () => setVisible(false),
            },
            {
              label: 'Learn more',
              onPress: () => setVisible(false),
            },
          ]}
          icon={({size}) => (
            <Image
              source={{
                uri: 'https://avatars3.githubusercontent.com/u/17571969?s=400&v=4',
              }}
              style={{
                width: size,
                height: size,
              }}
            />
          )}>
          There was a problem processing a transaction on your credit card.
        </Banner>

        <Card>
          <Card.Title
            title="Card Title"
            subtitle="Card Subtitle"
            left={LeftContent}
          />
          <Card.Content>
            <Text variant="titleLarge">Card title</Text>
            <Text variant="bodyMedium">Card content</Text>
          </Card.Content>
          <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
          <Card.Actions>
            <Button>Cancel</Button>
            <Button>Ok</Button>
          </Card.Actions>
        </Card>

        <Tooltip title="Selected Camera">
          <IconButton icon="camera" selected size={24} onPress={() => {}} />
        </Tooltip>

        <Icon.Button name="facebook" onPress={this.loginWithFacebook} solid>
          Login with Facebook
        </Icon.Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const DetailsScreen = () => {
  const {navigate} = useNavigation();
  return (
    <SafeAreaView>
      <Text>DetailsScreen</Text>
      <TouchableOpacity
        onPress={() => {
          navigate('Favorite');
        }}>
        <Text>Navigate</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const ProfileScreen = () => {
  const {popToTop} = useNavigation();
  return (
    <SafeAreaView>
      <Text>FavoriteScreen</Text>
      <TouchableOpacity onPress={popToTop}>
        <Text>Navigate</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#e91e63"
        barStyle={{backgroundColor: 'white'}}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            tabBarLabel: 'Updates',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="bell" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;

// const styles = StyleSheet.create({});
