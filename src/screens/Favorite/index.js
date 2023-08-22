import React from 'react';
import {TouchableOpacity} from 'react-native';
import {shallow} from 'zustand/shallow';
import WSafeAreaView from '../../components/SafeAreaContainer';
import Text from '../../components/Text';
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
    <WSafeAreaView>
      <Text>FavoriteScree{number}</Text>
      <TouchableOpacity onPress={increaseNumber}>
        <Text>Count</Text>
      </TouchableOpacity>
    </WSafeAreaView>
  );
};

export default FavoriteScreen;

// const styles = StyleSheet.create({});
