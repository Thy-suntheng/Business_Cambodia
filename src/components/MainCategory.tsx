import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { HStack } from 'native-base';
import React, { useEffect, useState } from 'react'
import { RefreshControl, StyleSheet, Text, View } from 'react-native'
import { Wander, Wave, } from 'react-native-animated-spinkit';
import { Image } from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { loadCategoryTitle } from '../action/Category';
import { deepLink, fetchBasicApi, FlatListVertical, makeid, Type } from '../function/PTFunction';
import style, { COLOR_BACKGROUND, MAIN_COLOR, width } from '../styles/style';
import messaging from '@react-native-firebase/messaging';
let page: any = 1;
const MainCategory = (props: any) => {
    const { category } = props;
    const dispatch = useDispatch()
    const ads = useSelector((state: any) => state.ads)
    const categories = useSelector((state: any) => state.categories)
    const [content, setContent] = useState(null)
    const navigate: any = useNavigation()
    const [hasScrolled, setHasScrolled] = useState(false);
    const [isRefresh, setIsRefresh] = useState(false);
    const [isMoreLoading, setIsMoreLoading] = useState(false);

    useEffect(() => {
        page = 1;
        // push notification on detail
        if (categories) {
            if (category.id === categories.data[0].id) {
                onNavigate()
            }
        }
        const unsubscribe = navigate.addListener('focus', () => {
            dispatch(loadCategoryTitle(category.name))
        });
        getData();
        return unsubscribe;
    }, []);
    const navigaion: any = useNavigation()
    const onNavigate = () => {
        messaging()
            .getInitialNotification()
            .then((notificationOpen: any) => {
                if (notificationOpen !== null && notificationOpen !== undefined) {
                    navigaion.navigate('DetailScreen', {
                        id: notificationOpen.data.news_id
                    })
                }
            })
            .catch(() => { });
    }
    const getData = async () => {
        return fetch('https://business-cambodia.com/api/blogs/' + category.id + `?page=${page}`)
            .then((response) => response.json())
            .then((json) => {
                setContent(json.data.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const getMore = async () => {
        if (!hasScrolled) return null;
        if (page > 0) {
            setIsMoreLoading(true);
            fetchBasicApi(`blogs/${category.id}?page=${page + 1}`).then((news) => {
                if (news.message) {
                    let _data: any = content;
                    _data.push(...news.data.data);
                    setContent(_data);
                    page = Math.ceil(_data.length / news.data.per_page);
                    if (Number(news.data.total) <= _data.length) {
                        page = 0;
                    }
                }
                setIsMoreLoading(false);
            });
        }
    };
    const onRefresh = () => {
        setIsRefresh(true);
        page = 1;
        getData()
        setTimeout(() => {
            setIsRefresh(false)
        }, 250);
    };
    const _onScroll = () => {
        if (!hasScrolled) setHasScrolled(true);
    };
    const renderFooter: any = () => {
        if (!isMoreLoading) return true;
        return (
            <Wave
                size={30}
                color={MAIN_COLOR}
                style={{ marginBottom: 10, alignSelf: 'center' }}
            />
        );
    };
    const renderItem = ({ item, index }: any) => {
        return (
            <>
                {index === 0 ?
                    (
                        <TouchableOpacity key={makeid()}
                            style={{ backgroundColor: COLOR_BACKGROUND }}
                            onPress={() => {
                                navigate.navigate('DetailScreen', { id: item.id })
                            }}
                            activeOpacity={0.8}>
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

                            <Text style={styles.title}>{item.title}​​</Text>
                            <Text style={styles.date}>{moment(item.post_date).locale("km").format(`${`ថ្ងៃទី`} DD ${`ខែ`} MMMM ${`ឆ្នាំ`} YYYY`)}</Text>

                        </TouchableOpacity>
                    ) :
                    <TouchableOpacity key={makeid()}
                        activeOpacity={0.8}
                        onPress={() => {
                            navigate.navigate('DetailScreen', { id: item.id })
                        }}
                        style={styles.list}>
                        <HStack>
                            <Image
                                source={{
                                    uri: item.image
                                }}
                                style={styles.img}
                                resizeMethod='resize'
                                resizeMode='contain'
                                containerStyle={{
                                    backgroundColor: '#fff',
                                }}
                                placeholderStyle={{
                                    backgroundColor: "#fff",
                                }}
                                PlaceholderContent={
                                    <FastImage
                                        style={[styles.img1, {
                                            backgroundColor: "#f6f6f6"
                                        }]}
                                        source={require('../images/no_image.png')}
                                        resizeMode='contain'
                                    />
                                }
                            />
                            <View style={styles.mainTitle}>
                                <Text style={styles.subTitle} numberOfLines={3}>{item.title}</Text>
                                <Text style={styles.des}>{moment(item.post_date).locale("km").format(`${`ថ្ងៃទី`}DD ${`ខែ`}MMMM ${`ឆ្នាំ`}YYYY`)}</Text>
                            </View>
                        </HStack>
                    </TouchableOpacity>
                }
                {(index % 5 !== 4) ? null :
                    ads.data === undefined ? null : ads.data.length === 0 ? null : (
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => {
                                if (ads.data[index % ads.data.length].url !== null)
                                    deepLink(Type.WEBSITE, ads.data[index % ads.data.length].url)
                            }}
                        >{
                                ads.data[index % ads.data.length].image === null ||
                                    ads.data[index % ads.data.length].image === '' ? null :
                                    (
                                        <FastImage
                                            style={{ height: (width / 5) - 10, width: width, }}
                                            source={{
                                                uri: ads.data[index % ads.data.length].image.replace('https', 'http'),

                                                priority: FastImage.priority.high,
                                            }}
                                            resizeMode={FastImage.resizeMode.contain}
                                        />
                                    )
                            }
                        </TouchableOpacity>
                    )}
            </>
        )
    }
    return (
        <>
            <View style={{ backgroundColor: COLOR_BACKGROUND, flex: 1 }}>
                {content === null ? (
                    <Wander
                        color={MAIN_COLOR}
                        size={35}
                        style={{
                            marginTop: 20, alignSelf: 'center'
                        }}
                    />
                ) :
                    <FlatListVertical
                        data={content}
                        renderItem={renderItem}
                        ListFooterComponent={
                            <>{isMoreLoading && page !== 0 && renderFooter()}</>
                        }
                        refreshControl={
                            <RefreshControl refreshing={isRefresh} onRefresh={onRefresh} />
                        }
                        onTouchMove={_onScroll}
                        onEndReached={() => {
                            if (!isMoreLoading) {
                                getMore();
                            }
                        }}
                    />
                }

            </View>
        </>
    )
}

export default React.memo(MainCategory)

const styles = StyleSheet.create({
    mainImg: {
        width: width,
        height: width / 2
    },
    img: {
        width: 160,
        height: 110,
        marginRight: 10
    },
    img1: {
        width: 160,
        height: 100,
        borderRadius: 10
    },
    title: {
        fontSize: 17,
        margin: 10,
        ...style.pBold,
    },
    date: {
        fontSize: 14,
        color: '#555',
        marginLeft: 10,
        ...style.p
    },
    list: {
        width: width - 15,
        padding: 5,
        borderWidth: 0.7,
        borderColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: COLOR_BACKGROUND,
    },
    subTitle: {
        fontSize: 15,
        marginBottom: 3,
        ...style.p,
        width: width / 2,
        marginLeft: 3
    },
    des: {
        fontSize: 13,
        color: '#555',
        ...style.p
    },
    add: {
        resizeMode: 'contain',
        width: width - 10,
        height: 50,
    },
    mainTitle: {
        ...style.pBold,
        width: (width / 2) + 10,
    }

})
