import {MD3LightTheme, MD3DarkTheme} from 'react-native-paper';

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    text: '#000000',
    button: '#6200EE',
    primary: 'rgb(120, 69, 172)',

    background: 'rgb(255, 251, 255)',

    surface: 'rgb(255, 251, 255)',
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    primary: 'rgb(220, 184, 255)',
    background: 'rgb(29, 27, 30)',
    surface: 'rgb(29, 27, 30)',
    text: '#FFFFFF',
    button: '#BB86FC',
  },
};
