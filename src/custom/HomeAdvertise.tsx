import { HStack } from 'native-base';
import React, { useEffect, useMemo, useState } from 'react'
import { Animated, Linking, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image';
import Entypo from 'react-native-vector-icons/Entypo';
import { useSelector } from 'react-redux';
import { makeid } from '../function/PTFunction';
import { COLOR_BACKGROUND, height, MAIN_COLOR, width } from '../styles/style';

const HomeAdvertise = (props: any) => {
    const [visible, setVisible] = useState(props.showModal)
    const [seconds, setSeconds] = useState<any>(4)
    const advertise = useSelector((state: any) => state.pop_up_ads_home)

    useEffect(() => {
        if (seconds > 0) {
            setTimeout(() => {
                if (seconds <= 1) {
                    setVisible(false)
                }
                setSeconds(seconds - 1)
            }, 1000);
        } else {
            null
        }
    });
    function renderImage() {
        return advertise.map((item: any) => {
            return (
                <TouchableOpacity
                    key={makeid()}
                    activeOpacity={0.8}
                    onPress={() => Linking.openURL(item.url)}
                >
                    <FastImage
                        source={{
                            uri: item.image
                        }}
                        style={styles.mainImg}
                        resizeMode='contain'
                    />
                </TouchableOpacity>
            )
        })
    }
    const RENDER_IMAGE = useMemo(() => renderImage(), [advertise])

    const _renderModal = () => {
        return (
            <Modal transparent visible={visible}>
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
                    {RENDER_IMAGE}
                </Animated.View>
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

export default HomeAdvertise;

const styles = StyleSheet.create({
    mainImg: {
        width: '100%',
        height: height - 100,
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
    modalcontainer: {
        width: '100%',
        backgroundColor: '#fff',
        flex: 1,
    },
    header: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        height: 50,
        backgroundColor: '#f6f6f6'
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




