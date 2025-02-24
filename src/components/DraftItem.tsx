import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, Text, IconButton, useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const DraftItem = ({draft}) => {
  const navigation = useNavigation();
  const theme = useTheme();

  const isDarkMode = useSelector(state => state.theme.isDarkMode);

  return (
    <Card
      style={[styles.card, {backgroundColor: theme.colors.primary}]}
      onPress={() => navigation.navigate('Draft', {draft})}>
      <Card.Title
        style={{backgroundColor: theme.colors.surface, borderRadius: 10}}
        title={draft.subject || 'No Subject'}
        subtitleStyle={{color: theme.colors.text}}
        titleStyle={{color: theme.colors.text}}
        subtitle={`To: ${draft.recipient || 'No recipient'}`}
        right={props => (
          <View style={styles.statusContainer}>
            <Text
              style={[
                styles.statusText,
                draft.status === 'Sent' && styles.sent,
              ]}>
              {draft.status}
            </Text>
            <IconButton
              {...props}
              icon="pencil"
              iconColor={theme.colors.text}
              onPress={() => navigation.navigate('Draft', {draft})}
            />
          </View>
        )}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 3,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    marginRight: 10,
    fontSize: 14,
    color: '#FFA500',
  },
  sent: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});

export default DraftItem;
