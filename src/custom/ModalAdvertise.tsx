import { HStack } from 'native-base';
import React, { useEffect, useState } from 'react'
import { Animated, Linking, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Image } from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import Entypo from 'react-native-vector-icons/Entypo';
import { useSelector } from 'react-redux';
import { makeid } from '../function/PTFunction';
import { COLOR_BACKGROUND, MAIN_COLOR, width } from '../styles/style';

const ModalAdvertise = (props: any) => {
    const [visible, setVisible] = useState(props.showModal)
    const [seconds, setSeconds] = useState<any>(4)
    const advertise = useSelector((state: any) => state.pop_up_detail_ads)
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
                        {advertise.map((item: any) => {
                            return (
                                <TouchableOpacity key={makeid()}
                                    activeOpacity={0.8}
                                    onPress={() => Linking.openURL(item.url)}
                                >
                                    <Image
                                        source={{
                                            uri: item.image
                                        }}
                                        style={styles.mainImg}
                                        resizeMethod='resize'
                                        containerStyle={{
                                            backgroundColor: '#f6f6f6'
                                        }}
                                        placeholderStyle={{
                                            backgroundColor: "#f6f6f6"
                                        }}
                                        PlaceholderContent={
                                            <FastImage
                                                style={[styles.mainImg, {
                                                    height: 100,
                                                    backgroundColor: "#f6f6f6"
                                                }]}
                                                source={require('../images/no_image.png')}
                                                resizeMode='contain'
                                            />
                                        }
                                    />
                                </TouchableOpacity>
                            )
                        })}
                    </Animated.View>
                </View>
            </Modal>
        )
    }

    return (
        <View>
            {advertise == null ? null :
                advertise.length == 0 ? null :
                    _renderModal()}
        </View>
    )
}

export default ModalAdvertise;

const styles = StyleSheet.create({
    mainImg: {
        width: '100%',
        height: width / 2
    },
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



