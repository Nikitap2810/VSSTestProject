import React from 'react';
import {FlatList, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Appbar, FAB, Switch, Text, useTheme} from 'react-native-paper';
import {toggleTheme} from '../redux/themeSlice';
import DraftItem from '../components/DraftItem';

const HomeScreen = ({navigation}) => {
  const {draftList} = useSelector(state => state.drafts);

  const theme = useTheme();

  console.log(draftList?.length > 0);

  const isDarkMode = useSelector(state => state.theme.isDarkMode);
  const dispatch = useDispatch();

  return (
    <View style={{flex: 1}}>
      <Appbar.Header dark={isDarkMode ? true : false}>
        <Appbar.Content title="Email Drafts" />
        <Switch
          value={isDarkMode}
          onValueChange={() => dispatch(toggleTheme())}
        />
      </Appbar.Header>

      <View style={{flex: 1, backgroundColor: theme.colors.primary}}>
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
