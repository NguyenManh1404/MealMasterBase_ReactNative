import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import WSafeAreaView from '../../components/SafeAreaContainer';
import Text from '../../components/Text';
import {useAppMode} from '../../hooks/useAppMode';
import {setLanguage} from '../../redux/AppRedux';

const ProfileScreen = () => {
  const user = useSelector(state => state.auth);
  const app = useSelector(state => state.app);

  const dispatch = useDispatch();

  const changeTheme = () => {
    dispatch(setLanguage('vi'));
  };

  const {isLightMode, onSelectAppMode} = useAppMode();

  return (
    <WSafeAreaView>
      <TouchableOpacity onPress={changeTheme}>
        <Text>Change Language: {app.language}</Text>
      </TouchableOpacity>
      <Text>
        ProfileScreen{user?.name} {app.language}
      </Text>
      <TouchableOpacity onPress={onSelectAppMode}>
        <Text>Change Themes: {isLightMode ? 'light' : 'Dark'}</Text>
      </TouchableOpacity>
    </WSafeAreaView>
  );
};

export default ProfileScreen;

// const styles = StyleSheet.create({});
