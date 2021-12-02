import React, { useEffect, useState } from 'react'
import { Dimensions, Image, Linking, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import style, { COLOR_BACKGROUND, MAIN_COLOR } from '../styles/style';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/core';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AutoHeightImage from 'react-native-auto-height-image';
import { HStack } from 'native-base';
import ModalAdvertise from '../custom/ModalAdvertise';
import AutoHeightWebView from 'react-native-autoheight-webview';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import 'moment/min/locales';
import { Loading, makeid } from '../function/PTFunction';
const { width } = Dimensions.get('window')
const DetailScreen = (props: any) => {
    const navigate: any = useNavigation()
    const { id } = props.route.params;
    const [detail, setDetail] = useState<any>(null)
    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    `https://www.business-cambodia.com/article/${id}?`,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                } else {
                }
            } else if (result.action === Share.dismissedAction) {
            }
        } catch (error) {
            console.log('error')
        }
    };
    useEffect(() => {
        getData()
    }, [])
    const getData = async () => {
        return fetch(`https://business-cambodia.com/api/blog_detail/${id}?`)
            .then((response) => response.json())
            .then((json) => {
                setDetail(json)
            })
            .catch((error) => {
                console.error(error);
            });
    }
    function searchAndReplace(string: any, find: any, replacement: any) {
        return string.replace(new RegExp(find, "g"), replacement);
    }
    let sBody: any = searchAndReplace(String(detail ? detail.data.des : null), '<figure', '<p')

    sBody = searchAndReplace(String(sBody), '/public', 'https://business-cambodia.com/public')

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.customheader}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            navigate.goBack()
                        }}
                    >
                        <View style={styles.back}>
                            <FontAwesome
                                name='angle-left'
                                size={40}
                                color='#fff'
                            />
                        </View>
                    </TouchableOpacity>
                    <Image
                        style={styles.img}
                        source={require('../images/logo.png')}
                    />
                    <Text></Text>
                </View>
            </View>
            <>
                {detail === null ? null : (
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ backgroundColor: '#fff' }}>
                            <FastImage
                                style={{ width: width, height: width / 1.9, }}
                                source={{ uri: detail.data ? detail.data.image : null }}
                                resizeMode={FastImage.resizeMode.contain}
                            />
                            <Text style={styles.title}>{detail.data ? detail.data.title : null}</Text>
                            <Text style={styles.date}>{moment(detail.data.post_date).locale("km").format(`${`ថ្ងៃទី`} DD ${`ខែ`} MMMM ${`ឆ្នាំ`} YYYY`)}</Text>
                            <View style={styles.buttonshare}>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={onShare}
                                    style={styles.share}>
                                    <Ionicons
                                        name='ios-share-social'
                                        size={25}
                                        color='#fff'
                                    />
                                    <Text style={styles.text}>ចែករំលែក</Text>
                                </TouchableOpacity>
                            </View>
                            <HStack>
                                <View style={{ flexDirection: 'row', marginLeft: 10, }}>
                                    <Ionicons
                                        name="ios-eye-sharp"
                                        size={20}
                                        color='#000'
                                    />
                                    <Text style={{ marginLeft: 5 }}>{detail.view}</Text>
                                </View>
                            </HStack>

                        </View>
                        {detail.below_title_ads.map((item: any, index: any) => {
                            return (
                                <TouchableOpacity key={makeid()}
                                    activeOpacity={0.8}
                                    onPress={() => Linking.openURL(item.url)}
                                >
                                    <AutoHeightImage
                                        style={{ marginBottom: 3 }}
                                        width={width}
                                        source={{ uri: item.image }}
                                    />
                                </TouchableOpacity>
                            )
                        })}
                        <View style={styles.content}>
                            <View style={styles.subcontent}>
                                <AutoHeightWebView
                                    scrollEnabled={false}
                                    dataDetectorTypes="none"
                                    style={{ width: Dimensions.get('window').width - 15, marginTop: 10, marginBottom: 10 }}
                                    customStyle={`
                        * {
                        font-family: 'Battambang' !important;
                        line-height:${2} !important;
                        letter-spacing:${0.5}px !important;
                        font-size:${15}px !important;
                        margin-left: px;
                        margin-right: 2.5px;
                    }
                    li{
                        color:#000;
                        font-size:${15}px;
                    }
                          img {
                          width: 100%;
                          height: auto;
                          padding-top: 12px;
                          }
                      `}
                                    source={{
                                        html: `<html><head><link href="https://fonts.googleapis.com/css?family=Battambang&display=swap" rel="stylesheet"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body><div><p>${sBody}</p></div></body></html>`
                                    }}
                                />

                            </View>
                        </View>
                        {detail.below_content_ads.map((item: any, index: any) => {
                            return (
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() => Linking.openURL(item.url)}
                                >
                                    <AutoHeightImage
                                        style={[styles.contentadd, { marginBottom: detail.below_content_ads.length - 1 === index ? 10 : 2 }]}
                                        width={width}
                                        key={index}
                                        source={{ uri: item.image }}
                                    />
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                )}
                {detail === null ? <Loading /> : (
                    <>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => Linking.openURL(detail.footer_ads[0].url)}
                        >
                            <AutoHeightImage
                                width={width}
                                source={{ uri: detail.footer_ads[0].image }}
                            />
                        </TouchableOpacity>
                    </>
                )}
            </>
            <ModalAdvertise showModal={true} />
        </View>

    )
}

export default DetailScreen

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
    customheader: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 5
    },
    img: {
        width: 60,
        height: 53,
        marginRight: 30
    },
    back: {
        width: 40,
        height: 50,
        alignItems: 'center',
    },
    title: {
        fontSize: 15,
        margin: 10,
        ...style.pBold,
    },
    date: {
        fontSize: 13,
        color: '#555',
        marginLeft: 10,
        ...style.p
    },
    share: {
        width: 90,
        height: 35,
        backgroundColor: 'red',
        borderRadius: 5,
        alignItems: 'center',
        flexDirection: 'row',
    },
    text: {
        fontSize: 15,
        color: '#fff',
        ...style.pBold
    },
    buttonshare: {
        alignSelf: 'flex-end',
        marginRight: 20,
        marginTop: -20
    },
    content: {
        width: width,
        backgroundColor: COLOR_BACKGROUND,
        alignItems: 'center',
    },
    subcontent: {
        width: width - 20,
        backgroundColor: COLOR_BACKGROUND,
        alignSelf: 'center',
    },
    banner: {
        resizeMode: 'contain',
        marginTop: 5,
    },
    add: {
        width: width - 10,
        backgroundColor: '#fff',
    },
    closeadd: {
        width: 20,
        height: 20,
        backgroundColor: 'red',
        position: 'absolute',
        right: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentadd: {

    }
})


