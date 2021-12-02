import { HStack } from 'native-base';
import React, { useEffect, useRef, useState } from 'react'
import { Animated, Linking, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image';
import Entypo from 'react-native-vector-icons/Entypo';
import { useSelector } from 'react-redux';
import { makeid } from '../function/PTFunction';
import style, { COLOR_BACKGROUND, MAIN_COLOR, width } from '../styles/style';

const HomeAdvertise = (props: any) => {
    const [visible, setVisible] = useState(props.showModal)
    const [seconds, setSeconds] = useState<any>(3)
    const addvertise = useSelector((state: any) => state.pop_up_ads_home)
    useEffect(() => {
        setTimeout(() => {
            setVisible(false)
        }, 4000);
    }, [])

    useEffect(() => {
        if (seconds > 0) {
            setTimeout(() => setSeconds(seconds - 1), 1000);
        } else {
            null
        }
    });

    const _renderModal = () => {
        return (
            <Modal transparent visible={visible}>
                <View style={styles.modalbackground}>
                    <Animated.View style={[styles.modalcontainer]}>
                        <View style={{ alignItems: 'center' }}>
                            <HStack style={styles.header}>
                                <HStack>
                                    <Text style={styles.add}>Add will close in </Text>
                                    <Text style={styles.num}>{seconds}</Text>
                                </HStack>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() => setVisible(false)}
                                >
                                    <Entypo
                                        name='cross'
                                        size={30}
                                    />
                                </TouchableOpacity>
                            </HStack>
                        </View>
                        {addvertise !== null ? (
                            <>
                                {addvertise.map((item: any, index: any) => {
                                    return (
                                        <TouchableOpacity key={makeid()}
                                            activeOpacity={0.8}
                                            onPress={() => Linking.openURL(item.url)}
                                        >
                                            <FastImage
                                                style={[styles.img, {
                                                }]}
                                                source={{ uri: item.image }}
                                                resizeMode='cover'
                                            />

                                        </TouchableOpacity>
                                    )
                                })}
                            </>) : (
                            <View style={{
                                height: 200,
                                width: '100%',
                                backgroundColor: '#f8f8f8'
                            }}>
                            </View>
                        )}
                    </Animated.View>
                </View>
            </Modal>
        )
    }
    return (
        <View>
            {_renderModal()}
        </View>
    )
}

export default HomeAdvertise;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR_BACKGROUND
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    modalbackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalcontainer: {
        width: '85%',
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 10,
        elevation: 10
    },
    header: {
        width: '100%',
        alignItems: 'flex-end',
        justifyContent: 'space-between'
    },
    img: {
        width: '100%',
        height: 200,
    },
    add: {
        fontSize: 15,
        marginBottom: 5
    },
    num: {
        color: MAIN_COLOR,
        fontSize: 17,
        fontWeight: '600',
        marginLeft: 3
    }
})


