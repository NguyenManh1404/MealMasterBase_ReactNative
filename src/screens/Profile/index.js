import React from 'react';
import {SafeAreaView, Text, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setLanguage} from '../../redux/AppRedux';

const ProfileScreen = () => {
  const user = useSelector(state => state.auth);
  const app = useSelector(state => state.app);

  const dispatch = useDispatch();

  const changeTheme = () => {
    dispatch(setLanguage({language: 'vi'}));
  };

  return (
    <SafeAreaView>
      <Text>
        ProfileScreen{user?.name} {app.language}
      </Text>
      <TouchableOpacity onPress={changeTheme}>
        <Text>Change Language: {app.language}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProfileScreen;

// const styles = StyleSheet.create({});
