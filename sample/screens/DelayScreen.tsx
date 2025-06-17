import { useEffect } from 'react';
import { Text, View } from 'react-native';
import * as DevRev from '@devrev/sdk-react-native';

const DelayScreen: React.FC = () => {
    useEffect(() => {
        try {
            DevRev.endScreenTransition();
        } catch (error) {
            console.error('Error ending screen transition:', error);
        }
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Delayed Screen</Text>
            <Text>This screen opened after a 2-second delay</Text>
        </View>
    );
};

export default DelayScreen;
