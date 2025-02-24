import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import DraftScreen from '../screens/DraftScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const {appLoading} = useSelector(state => state.app);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {appLoading && <Stack.Screen name="Splash" component={SplashScreen} />}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Draft" component={DraftScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
