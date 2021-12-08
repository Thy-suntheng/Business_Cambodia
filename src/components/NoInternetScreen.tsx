import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import style, { MAIN_COLOR } from '../styles/style';

const NoInternetScreen = () => {
    return (
        <View style={styles.safeAreaContainer}>
            <View style={styles.iconContainer}>
                <MaterialCommunityIcons name="wifi-off" size={60} color="#fff" />
            </View>
            <Text style={{ ...style.pBold, fontSize: 17, color: MAIN_COLOR }}>
                No Internet
            </Text>
            <Text style={[{ textAlign: 'center', ...style.pBold, fontSize: 17, color: MAIN_COLOR, marginTop: 10 }]}>
                Please Cheack Your Internet
            </Text>
        </View>
    );
};

export default React.memo(NoInternetScreen);

const styles = StyleSheet.create({
    iconContainer: {
        height: 100,
        width: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: MAIN_COLOR,
        marginBottom: 20,
    },
    safeAreaContainer: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
});