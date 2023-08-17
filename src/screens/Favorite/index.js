import React from 'react';
import {SafeAreaView, Text, TouchableOpacity} from 'react-native';
import {shallow} from 'zustand/shallow';
import {useStore} from '../../zustand';

const FavoriteScreen = () => {
  const {number, counterNumber} = useStore(
    state => ({
      number: state.number,
      counterNumber: state.counterNumber,
    }),
    shallow,
  );

  const increaseNumber = () => {
    counterNumber(number + 1);
  };
  return (
    <SafeAreaView>
      <Text>FavoriteScree{number}</Text>
      <TouchableOpacity onPress={increaseNumber}>
        <Text>Count</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default FavoriteScreen;

// const styles = StyleSheet.create({});
