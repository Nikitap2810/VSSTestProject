import React from 'react';
import {Alert, FlatList, Pressable, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Appbar, FAB, Switch, Text, useTheme} from 'react-native-paper';
import {toggleTheme} from '../redux/themeSlice';
import DraftItem from '../components/DraftItem';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {store} from '../redux/store';
import {setDrafts} from '../redux/draftSlice';

const HomeScreen = ({navigation}) => {
  const {draftList} = useSelector(state => state.drafts);

  const theme = useTheme();

  console.log(draftList?.length > 0);

  const isDarkMode = useSelector(state => state.theme.isDarkMode);
  const dispatch = useDispatch();

  const logout = async () => {
    Alert.alert('Confirm', 'Are you sure to want to logout?', [
      {
        text: 'Cancel',
        onPress: () => {
          return false;
        },
      },
      {
        text: 'Logout',
        onPress: async () => {
          await AsyncStorage.removeItem('userDraft');

          store.dispatch(setDrafts([]));

          console.log('Logged out');
        },
      },
    ]);
  };

  return (
    <View style={{flex: 1}}>
      <Appbar.Header dark={isDarkMode ? true : false}>
        <Appbar.Content title="Email Drafts" />

        <Pressable onPress={logout} style={{padding: 15}}>
          <Ionicons
            name="log-out-outline"
            size={24}
            color={theme.colors.text}
          />
        </Pressable>
      </Appbar.Header>

      <View
        style={{flex: 1, backgroundColor: theme.colors.primary, padding: 5}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 15,
            backgroundColor: isDarkMode ? '#333' : '#fff',
            borderRadius: 30,
            margin: 15,
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 4},
            shadowOpacity: 0.2,
            shadowRadius: 4,
          }}>
          <Text
            style={{
              color: isDarkMode ? '#bbb' : '#555',
              fontSize: 16,
              fontWeight: '600',
            }}>
            Light Mode
          </Text>

          <Switch
            value={isDarkMode}
            onValueChange={() => dispatch(toggleTheme())}
            thumbColor={isDarkMode ? '#fff' : theme.colors.primary}
            trackColor={{false: '#ddd', true: theme.colors.primary}}
            style={{transform: [{scaleX: 1.2}, {scaleY: 1.2}]}} // Slightly larger switch
          />

          <Text
            style={{
              color: isDarkMode ? '#fff' : '#222',
              fontSize: 16,
              fontWeight: '600',
            }}>
            Dark Mode
          </Text>
        </View>

        {draftList?.length > 0 ? (
          <FlatList
            data={draftList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => <DraftItem draft={item} />}
          />
        ) : (
          <Text
            style={{
              textAlign: 'center',
              alignItems: 'center',
              color: theme.colors.surface,

              marginTop: 200,
            }}>
            No drafts available.
          </Text>
        )}

        <FAB
          style={{
            position: 'absolute',
            right: 20,
            bottom: 20,
            backgroundColor: '#FFF',
          }}
          icon="plus"
          onPress={() => navigation.navigate('Draft')}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
