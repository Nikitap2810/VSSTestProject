import React, {useState} from 'react';
import {Alert, ScrollView, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setDrafts} from '../redux/draftSlice';
import {
  TextInput,
  Button,
  Appbar,
  Snackbar,
  useTheme,
} from 'react-native-paper';
import {v4 as uuid} from 'uuid';
import 'react-native-get-random-values';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DraftScreen = ({route, navigation}) => {
  const {draftList} = useSelector(state => state.drafts);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const theme = useTheme();

  const draft = route.params?.draft || {
    id: uuid(),
    recipient: '',
    subject: '',
    body: '',
    status: 'Draft',
  };

  const isDarkMode = useSelector(state => state.theme.isDarkMode);

  const [recipient, setRecipient] = useState(draft.recipient);
  const [subject, setSubject] = useState(draft.subject);
  const [body, setBody] = useState(draft.body);
  const [id, setId] = useState(draft.id);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    if (!recipient || !subject || !body) {
      setIsLoading(false);
      Alert.alert('Error', 'All fields are required');
      return;
    }

    // Submit
    if (route?.params?.draft == undefined) {
      let newDraft = [...(draftList || [])];
      newDraft?.push({
        recipient: recipient,
        subject: subject,
        body: body,
        id: id,
      });
      await AsyncStorage.setItem('userDraft', JSON.stringify(newDraft));
      dispatch(setDrafts(newDraft));
    } else {
      let newDraft = [...(draftList || [])];
      newDraft[route?.params?.id] = {
        recipient: recipient,
        subject: subject,
        body: body,
        id: id,
      };
      await AsyncStorage.setItem('userDraft', JSON.stringify(newDraft));
      dispatch(setDrafts(newDraft));
    }

    // Clear form

    navigation.goBack();
    setIsLoading(false);

    Alert.alert('Success', 'Email Draft SuccessFully');
  };

  return (
    <View style={{flex: 1}}>
      <Appbar.Header dark={isDarkMode ? true : false}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Edit Draft" />
      </Appbar.Header>

      <ScrollView
        style={{flex: 1, backgroundColor: theme.colors.primary}}
        contentContainerStyle={{padding: 20}}>
        <TextInput
          label="Recipient"
          value={recipient}
          onChangeText={setRecipient}
          mode="outlined"
          style={{backgroundColor: '#FFFFFF', elevation: 2}}
        />
        <TextInput
          label="Subject"
          value={subject}
          onChangeText={setSubject}
          mode="outlined"
          style={{backgroundColor: '#FFFFFF', elevation: 2, marginTop: 10}}
        />
        <TextInput
          label="Body"
          value={body}
          onChangeText={setBody}
          multiline
          numberOfLines={6}
          mode="outlined"
          style={{backgroundColor: '#FFFFFF', elevation: 2, marginTop: 10}}
        />

        <Button
          loading={isLoading}
          disabled={isLoading}
          mode="contained"
          onPress={handleSave}
          textColor={theme.colors.primary}
          style={{marginTop: 20, backgroundColor: theme.colors.surface}}>
          Save Draft
        </Button>
      </ScrollView>
    </View>
  );
};

export default DraftScreen;
