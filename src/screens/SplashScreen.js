import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setDrafts} from '../redux/draftSlice';
import {setAppLoading} from '../redux/app';
import {useTheme} from 'react-native-paper';

const SplashScreen = () => {
  const dispatch = useDispatch();

  const theme = useTheme();

  useEffect(() => {
    async function fetchData() {
      let userDraft = await AsyncStorage.getItem('userDraft');

      let q = JSON?.parse(userDraft);
      dispatch(setDrafts(q));

      setTimeout(() => {
        dispatch(setAppLoading(false));
      }, 1500);
    }
    fetchData();
  }, []);

  return (
    <View style={{...styles.container, backgroundColor: theme.colors.primary}}>
      <Image source={require('../assets/images/splash.png')} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(120, 69, 172)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
