import React, { useEffect, useState } from 'react'
import { Dimensions, Image, Linking, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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
import { FlatListScroll, Loading, makeid } from '../function/PTFunction';
const { width } = Dimensions.get('window')
const DetailScreen = (props: any) => {
    const navigate: any = useNavigation()
    const { id } = props.route.params;
    const [detail, setDetail] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [isRenderFooter, setIsRenderFooter] = useState(false)

    React.useEffect(() => {
        if (!loading) {
            setTimeout(() => {
                setIsRenderFooter(true)
            }, 100);
        }
    }, [loading])
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
                <HStack style={styles.customheader}>
                    <TouchableOpacity
                        onPress={() => {
                            navigate.goBack()
                        }}
                        activeOpacity={0.8}
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
                        style={styles.logo}
                        source={require('../images/logo.png')}
                    />
                    <View>
                        <Ionicons
                            name='search-outline'
                            size={30}
                            color={MAIN_COLOR}
                        />
                    </View>
                </HStack>
            </View>
            <>
                {detail === null ?
                    null
                    : (
                        <FlatListScroll showsVerticalScrollIndicator={false}>
                            <View style={{ backgroundColor: '#fff' }}>
                                <FastImage
                                    style={{ width: width, height: width / 1.9, }}
                                    source={{ uri: detail.data ? detail.data.image : null }}
                                    resizeMode={FastImage.resizeMode.contain}
                                />
                                {detail == null ? null :
                                    detail.length == 0 ? null :
                                        <>
                                            {detail.below_title_ads.map((item: any) => {
                                                return (
                                                    <TouchableOpacity key={makeid()}
                                                        activeOpacity={0.8}
                                                        onPress={() => Linking.openURL(item.url)}
                                                    >
                                                        <AutoHeightImage
                                                            style={{ marginBottom: 2 }}
                                                            width={width}
                                                            source={{ uri: item.image }}
                                                        />
                                                    </TouchableOpacity>
                                                )
                                            })}
                                        </>
                                }
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
                                <HStack style={{ marginTop: -12 }}>
                                    <View style={{ flexDirection: 'row', marginLeft: 10, }}>
                                        <Ionicons
                                            name="ios-eye-sharp"
                                            size={18}
                                            color='#000'
                                        />
                                        <Text style={{ marginLeft: 5, fontSize: 14, marginBottom: 20 }}>{detail.view}</Text>
                                    </View>
                                </HStack>

                            </View>


                            <View style={styles.content}>
                                <View style={styles.subcontent}>
                                    <AutoHeightWebView
                                        dataDetectorTypes="none"
                                        scrollEnabled={false}
                                        style={{ width: Dimensions.get('window').width }}
                                        customStyle={`
                * {
                    font-family: 'Content' !important;
                    line-height:${2} !important;
                    letter-spacing:${0.9}px !important;
                    font-size:${14}px !important;
                    margin-left: 1px;
                    margin-right: 3px;
                    margin-bottom:20px !important;
                    margin-top:3px !important;
                }
                li{
                    color:#2b2b2b;
                    font-size:${15}px;
                }
            img{
            width:calc(100%) !important;
             margin-left: -3px !important;
             margin-right: 0px !important;
            margin-top:5px !important;
            }
            h1{
                font-size:${14}px;
                line-height: 40px;
            }
            iframe{
                color:#79fa12;
                font-size:30px;
                width:calc(100%) !important;
                height:${width / 1.9}px !important;
                margin-left: 0px !important;
                margin-right: 0px !important;
                marginBottom:10px
            }
                `}
                                        files={[
                                            {
                                                href: "cssfileaddress",
                                                type: "text/css",
                                                rel: "stylesheet"
                                            }
                                        ]}
                                        source={{
                                            html: `<html><head><link href="https://fonts.googleapis.com/css?family=Content&display=swap" rel="stylesheet"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body><div><p>${sBody}</p></div></body></html>`
                                        }}
                                        scalesPageToFit={true}
                                        viewportContent={"width=device-width, initial-scale=1.0, user-scalable=no"}
                                        onLoadEnd={() => setLoading(false)}
                                    />
                                </View>
                            </View>
                            {detail == null ? null :
                                detail.length == 0 ? null :
                                    <>
                                        {detail.below_content_ads.map((item: any) => {
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
                                    </>
                            }
                        </FlatListScroll>
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
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 12
    },
    img: {
        width: 60,
        height: 53,
        marginRight: 30
    },
    logo: {
        width: 60,
        height: 53,
        marginRight: 9
    },
    back: {
        width: 40,
        height: 50,
        alignItems: 'center',
    },
    title: {
        fontSize: 17,
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
        width: width - 10,
        backgroundColor: COLOR_BACKGROUND,
        alignSelf: 'center',
        marginTop: -20,
        marginBottom: 10
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
        alignItems: 'center',
    },
})



