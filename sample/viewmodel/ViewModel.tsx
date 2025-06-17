import * as DevRev from '@devrev/sdk-react-native';
import installations from '@react-native-firebase/installations';
import NotificationService from '../NotificationService';
import { Alert } from 'react-native';
import * as Notifications from 'expo-notifications';

function ViewModel() {
  const registerDeviceToken = async () => {
    try {
      await NotificationService.register()
      return true;
    } catch (error) {
      console.error('Could not register the device!', error);
      return false;
    }
  };

  const unregisterDevice = async () => {
    try {
      const id = await installations().getId();
      DevRev.unregisterDevice(id);
      console.log('Device unregistered with ID:', id);
      return true;
    } catch (error) {
      console.error('Could not unregister the device!', error);
      return false;
    }
  }

  const simulateANR = () => {
    console.log('Simulating ANR...');
    setTimeout(() => {
      const startTime = Date.now();
      while (Date.now() - startTime < 10000) { }
      console.log('ANR Simulation - Complete');
    }, 0);
  };

  const simulateCrash = () => {
    Alert.alert('Crash Triggered', 'App will crash immediately');
    throw new Error('Simulated crash');
  };

  const logout = async () => {
    try {
      const id = await installations().getId();
      DevRev.logout(id);
      console.log('Logged out');
    } catch (error) {
      console.error('Could not log out the user!', error);
    }
  }

  return {
    registerDeviceToken,
    unregisterDevice,
    simulateANR,
    simulateCrash,
    logout
  };
}

const viewModel = ViewModel();

export default viewModel
