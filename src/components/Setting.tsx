import { useNavigation } from '@react-navigation/core'
import { HStack } from 'native-base'
import React, { useState } from 'react'
import { Linking, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { COLOR_BACKGROUND, MAIN_COLOR } from '../styles/style'
import messaging from '@react-native-firebase/messaging';
const Setting = () => {
    const navigate: any = useNavigation()
    async function toggleNotification() {
        if (Platform.OS === 'ios') {
            const authStatus = await messaging().hasPermission();
            if (authStatus === messaging.AuthorizationStatus.NOT_DETERMINED) {
                const authorizationStatus = await messaging().requestPermission();
                if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
                    console.log('true');
                }
            } else {
                Linking.openURL('app-settings://');
            }
        } else {
            Linking.openSettings();
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <HStack style={styles.customheader}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            navigate.goBack()
                        }}
                        style={styles.back}
                    >
                        <FontAwesome
                            name='angle-left'
                            size={40}
                            color='#fff'
                        />
                    </TouchableOpacity>
                    <Text style={styles.notification}>Notification</Text>
                </HStack>
            </View>
            {/* <View style={styles.setting}>
                <Text style={styles.text}>Setting</Text>
            </View> */}
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => toggleNotification()}
            >
                <HStack style={styles.setting1}>
                    <Text style={styles.text1}>Notification</Text>
                    <FontAwesome
                        style={{ marginRight: 20 }}
                        name='angle-right'
                        color='#555'
                        size={35}
                    />
                </HStack>
            </TouchableOpacity>
        </View>
    )
}

export default Setting

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR_BACKGROUND
    },
    header: {
        width: '100%',
        height: 50,
        backgroundColor: MAIN_COLOR,
    },
    notification: {
        fontSize: 23,
        color: '#fff',
        fontWeight: '600',
        marginLeft: 5
    },
    customheader: {
        width: 180,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 10
    },
    back: {
        width: 50,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    setting: {
        width: '100%',
        height: 50,
        backgroundColor: '#ccc',
        justifyContent: 'center'
    },
    text: {
        fontSize: 20,
        color: MAIN_COLOR,
        fontWeight: '600',
        margin: 10
    },
    setting1: {
        width: '100%',
        height: 50,
        backgroundColor: '#f5f5f5',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        alignItems: 'center',
    },
    text1: {
        fontSize: 20,
        color: MAIN_COLOR,
        fontWeight: '600',
        margin: 10
    },

})
