import * as DevRev from '@devrev/sdk-react-native';
import { Button, Linking, Text, View, StyleSheet } from 'react-native';
import NotificationService from './NotificationService';
import React from 'react';
import firebase from '@react-native-firebase/app';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './navigator/Navigator'

const App = () => {
  React.useEffect(() => {
    try {
      firebase.app();
      DevRev.configure(
        'YOUR_APP_ID',
      );
      DevRev.setShouldDismissModalsOnOpenLink(true);
      DevRev.setInAppLinkHandler((url) => {
        Linking.openURL(url)
      });

      NotificationService.initialize();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
};

export default App;
