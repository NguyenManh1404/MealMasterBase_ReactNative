import i18next from 'i18next';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, ScrollView, TouchableOpacity} from 'react-native';
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
import {useDispatch, useSelector} from 'react-redux';
import LocalImage from '../../components/LocalImage';
import WSafeAreaView from '../../components/SafeAreaContainer';
import Text from '../../components/Text';
import {useAppMode} from '../../hooks/useAppMode';
import {
  setIsAbleToGoHome,
  setLanguage as setLanguageRedux,
} from '../../redux/AppRedux';
import {clearUser, setUser} from '../../redux/AuthRedux';

const HomeScreen = () => {
  const [visible, setVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const user = useSelector(state => state.auth);
  const app = useSelector(state => state.app);
  const isAbleToGoHome = useSelector(state => state.app.isAbleToGoHome);
  const {isLightMode, onSelectAppMode} = useAppMode();

  const dispatch = useDispatch();

  const changeUser = () => {
    dispatch(setUser({name: 'Mo Yeu Giau'}));
  };
  const clearUsers = () => {
    dispatch(clearUser());
  };
  const [language, setLanguage] = useState('en');

  const {t} = useTranslation();

  const updateLanguage = async selectedLanguage => {
    if (selectedLanguage) {
      await dispatch(setLanguageRedux(language));
      setLanguage(language === 'vi' ? 'en' : 'vi');
      i18next.changeLanguage(language);
    }
  };

  const onChangeSearch = query => setSearchQuery(query);

  const LeftContent = props => <Avatar.Icon {...props} icon="folder" />;
  return (
    <WSafeAreaView>
      <ScrollView>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
        <Text type="bold-25">HomeScreen {user?.name}</Text>
        <Text>{app.language}</Text>
        <Text>{t('onboarding.hello')}</Text>

        <Icon.Button
          name="user"
          onPress={changeUser}
          solid
          theme={{dark: true}}>
          Change User
        </Icon.Button>

        <Icon.Button name="user" onPress={clearUsers} solid>
          Clear User
        </Icon.Button>

        <Icon.Button name="facebook" onPress={updateLanguage} solid>
          Change Language
        </Icon.Button>

        <TouchableOpacity onPress={onSelectAppMode}>
          <Text>Change Themes: {isLightMode ? 'light' : 'Dark'}</Text>
        </TouchableOpacity>

        <Avatar.Icon size={24} icon="folder" color="yellow" />
        <Icon name="rocket" size={30} color="#900" solid />
        <Button
          onPress={() => {
            dispatch(setIsAbleToGoHome(!isAbleToGoHome));
          }}>
          <Text>Logout</Text>
        </Button>

        <Banner
          theme={{dark: true}}
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
          <Text variant="titleLarge">Card title</Text>
          There was a problem processing a transaction on your credit card.
        </Banner>
        <LocalImage imageKey={'logo'} />

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
      </ScrollView>
    </WSafeAreaView>
  );
};

export default HomeScreen;

// const styles = StyleSheet.create({});
