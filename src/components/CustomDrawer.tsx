import { DrawerActions, useNavigation } from '@react-navigation/core'
import React from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import { makeid } from '../function/PTFunction'
import style, { COLOR_BACKGROUND, MAIN_COLOR } from '../styles/style'
const CustomDrawer = () => {
    const categories = useSelector((state: any) => state.categories)
    const navigate: any = useNavigation()
    const renderItem = ({ item, _ }: any) => {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                    navigate.navigate(item.id === 0 ? "Setting" : item.name, { category_id: item.id });
                    navigate.dispatch(DrawerActions.closeDrawer())
                }}
                style={styles.list}>
                <Text style={styles.categoryitem}>{item.name}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <>
            <View style={styles.header}>
                <Image
                    style={styles.image}
                    source={require('../images/logo.png')}
                />
            </View>
            <FlatList
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                data={categories ? [...categories.data, {
                    id: 0,
                    name: "ការកំណត់"
                }] : null}
                renderItem={renderItem}
                keyExtractor={(index) => makeid()}
            />
        </>
    )
}

export default CustomDrawer

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 50,
        backgroundColor: MAIN_COLOR,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 60,
        height: 60
    },
    list: {
        width: '100%',
        borderWidth: 0.5,
        borderColor: '#ddd',
        height: 50,
        backgroundColor: COLOR_BACKGROUND,
        justifyContent: 'center'
    },
    categoryitem: {
        fontSize: 17,
        marginLeft: 10,
        ...style.pBold,
        color: '#555',
        padding: 10
    }
})


