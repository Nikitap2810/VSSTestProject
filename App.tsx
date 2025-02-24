import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {PaperProvider} from 'react-native-paper';
import {useSelector} from 'react-redux';
import HomeScreen from './src/screens/HomeScreen';
import DraftScreen from './src/screens/DraftScreen';
import {darkTheme, lightTheme} from './src/utilis/theme';
import {RootState, store} from './src/redux/store';
import SplashScreen from './src/screens/SplashScreen';
import AppNavigator from './src/navigation/AppNavigator';

const Stack = createStackNavigator();

const MainApp = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  return (
    <PaperProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <AppNavigator />
    </PaperProvider>
  );
};

const App = () => (
  <Provider store={store}>
    <MainApp />
  </Provider>
);

export default App;
