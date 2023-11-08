import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {APP_COLORS} from '../../themes/colors';
import Ingredients from './components/Ingredients';
import StepTab from './components/StepTab';
import TipTab from './components/TipTab';

const Tab = createMaterialTopTabNavigator();

const DetailRecipeTabView = ({recipeInfo}) => {
  const [tabPageHeight, setTabPageHeight] = useState(0);

  const updateTabHeight = event => {
    const {height} = event.nativeEvent.layout;
    setTabPageHeight(height);
  };
  return (
    <Tab.Navigator
      style={[styles.container, {height: tabPageHeight + 500}]}
      initialRouteName="Ingredient"
      screenOptions={{
        swipeEnabled: false,
        tabBarPressColor: '#f8f8f8',
        tabBarIndicatorStyle: {backgroundColor: APP_COLORS.primary},
      }}>
      <Tab.Screen
        name="Ingredient"
        children={props => (
          <Ingredients
            {...props}
            data={recipeInfo}
            updateTabHeight={updateTabHeight}
          />
        )}
      />

      <Tab.Screen
        name="Tips"
        component={TipTab}
        options={{
          lazy: true,
        }}
      />
      <Tab.Screen
        name="Let's Cook"
        children={props => (
          <StepTab
            {...props}
            data={recipeInfo}
            updateTabHeight={updateTabHeight}
          />
        )}
        options={{
          lazy: true,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // minHeight: 1000,
    paddingVertical: 40,
  },
});

export default DetailRecipeTabView;
