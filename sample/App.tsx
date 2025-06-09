import * as DevRev from '@devrev/sdk-react-native';
import { Button, Linking, Text, View } from 'react-native';
import NotificationService from './NotificationService';
import React from 'react';

export default function App() {
  React.useEffect(() => {
    try {
      DevRev.setShouldDismissModalsOnOpenLink(true);
      DevRev.setInAppLinkHandler((url) => {
        Linking.openURL(url)
      });

      NotificationService.initialize();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const registerDeviceToken = async () => {
    try {
      await NotificationService.register()
    } catch (error) {
      console.error('Error registering device:', error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Configure" onPress={() => {
        DevRev.configure('YOUR_APP_ID');
        console.log('Configured');
      }} />
      <Button title="Identify Unverified User" onPress={() => {
        DevRev.identifyUnverifiedUser('123456');
        console.log('Identified');
      }} />
      <Button title="Show support view" onPress={() => {
        DevRev.showSupport();
        console.log('showing support');
      }} />
      <Button title="Register for push notifications" onPress={() => {
        registerDeviceToken();
      }} />
    </View>
  );
}
