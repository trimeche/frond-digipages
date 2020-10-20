import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Intro from '../Screens/Intro';
import Home from '../Screens/Home';
import ProductList from '../Screens/ProductList';
import Product from '../Screens/Product';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{...TransitionPresets.SlideFromRightIOS}}>
      <Stack.Screen
        name="Intro"
        component={Intro}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="ProductList"
        component={ProductList}
        options={({route}) => ({
          title: route.params && route.params.title ? route.params.title : '',
        })}
      />
      <Stack.Screen
        name="Product"
        component={Product}
        options={({route}) => ({
          headerBackTitleVisible: false,
          headerTransparent: true,
          headerTintColor: '#fff',
          title: '',
        })}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
