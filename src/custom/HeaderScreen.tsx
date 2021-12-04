import { useNavigation } from '@react-navigation/native'
import { HStack } from 'native-base'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { MAIN_COLOR } from '../styles/style'

const HeaderScreen = () => {
    const navigate: any = useNavigation()
    return (
        <View style={styles.header}>
            <HStack style={styles.customheader}>
                <TouchableOpacity
                    onPress={() => navigate.openDrawer()}
                    activeOpacity={0.8}
                    style={{ width: 40, height: 35 }}
                >
                    <Ionicons
                        name='menu'
                        size={30}
                        color='#fff'
                    />
                </TouchableOpacity>
                <Image
                    style={styles.logo}
                    source={require('../images/logo.png')}
                />
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        navigate.navigate('Search')
                    }}
                >
                    <Ionicons
                        name='search-outline'
                        size={30}
                        color='#fff'
                    />
                </TouchableOpacity>
            </HStack>
        </View>
    )
}

export default HeaderScreen

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 50,
        backgroundColor: MAIN_COLOR
    },
    customheader: {
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 12
    },
    logo: {
        width: 60,
        height: 53,
        marginRight: 8
    }
})
