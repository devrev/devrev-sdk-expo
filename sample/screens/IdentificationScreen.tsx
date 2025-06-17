import React, { useRef } from 'react';

import * as DevRev from '@devrev/sdk-react-native';
import { Identity } from '@devrev/sdk-react-native';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import viewModel from '../viewmodel/ViewModel';
import TouchableOpacityButton from '../components/TouchableOpacityButton';

interface CustomButtonProps {
    onPress: () => void;
    buttonText: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ onPress, buttonText }) => {
    return (
        <TouchableOpacityButton
            onPress={onPress}
            buttonText={buttonText}
            buttonStyle={styles.button}
            textStyle={styles.buttonText}
        />
    );
}

const IdentificationScreen: React.FC = () => {
    const [userID, setUserID] = React.useState('');
    const [sessionToken, setSessionToken] = React.useState('');
    const [userEmail, setUserEmail] = React.useState('');

    const handleUpdateUser = () => {
        const identity: Identity = {
            userRef: userID,
            userTraits: {
                email: userEmail,
            },
        };
        DevRev.updateUser(identity);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Unverified User</Text>
            <TextInput
                style={styles.input}
                placeholder="User ID"
                onChangeText={setUserID}
            />

            <CustomButton
                onPress={() => {
                    console.log('Identifying user with:', userID);
                    DevRev.identifyUnverifiedUser(userID);
                }}
                buttonText="Identify Unverified User"
            />

            <Text style={styles.heading}>Verified User</Text >
            <TextInput
                style={styles.input}
                placeholder="User ID"
                onChangeText={setUserID}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter Session token"
                onChangeText={setSessionToken}
            />

            <CustomButton
                onPress={() => {
                    console.log('Identifying user with:', userID, 'and session token:', sessionToken);
                    DevRev.identifyVerifiedUser(userID, sessionToken);
                }}
                buttonText="Identify Verified User"
            />

            <Text style={styles.heading}>Update User</Text >
            <TextInput
                style={styles.input}
                placeholder="Enter New User Email"
                onChangeText={setUserEmail}
            />

            <CustomButton
                onPress={() => {
                    console.log('Updating user...');
                    handleUpdateUser();
                }}
                buttonText="Update User"
            />

            <Text style={styles.heading}>Logout</Text>
            <CustomButton
                onPress={() => {
                    viewModel.logout();
                }}
                buttonText="Logout"
            />
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 8,
        paddingRight: 16,
    },
    heading: {
        color: '#454141',
        fontSize: 12,
        marginTop: 16,
        paddingHorizontal: 8,
        paddingTop: 16,
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#D3D3D3',
        borderRadius: 4,
        padding: 12,
        marginVertical: 4,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#D3D3D3',
        padding: 12,
        borderRadius: 12,
        marginVertical: 4,
        alignItems: 'flex-start',
        paddingBottom: 8,
    },
    buttonText: {
        color: '#000000',
        fontSize: 16,
        paddingLeft: 8,
    },
});

export default IdentificationScreen;
