import { useNavigation } from '@react-navigation/core'
import { HStack } from 'native-base'
import React, { useState } from 'react'
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { COLOR_BACKGROUND, MAIN_COLOR } from '../styles/style'
const Setting = () => {
    const navigate: any = useNavigation()
    const [isEnabled, setIsEnabled] = useState(true);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

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
            <View style={styles.setting}>
                <Text style={styles.text}>Setting</Text>
            </View>
            <HStack style={styles.setting1}>
                <Text style={styles.text1}>Notification</Text>
                <Switch
                    trackColor={{ false: "#ccc", true: MAIN_COLOR }}
                    thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </HStack>
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
        marginLeft: 30
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
    },
    text1: {
        fontSize: 20,
        color: MAIN_COLOR,
        fontWeight: '600',
        margin: 10
    },

})
