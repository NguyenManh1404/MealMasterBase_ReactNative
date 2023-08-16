import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {useSelector} from 'react-redux';

const ProfileScreen = () => {
  const user = useSelector(state => state.auth);
  console.log('🚀 ~ file: index.js:7 ~ ProfileScreen ~ user:', user);

  return (
    <SafeAreaView>
      <Text>ProfileScreen{user?.name}</Text>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
