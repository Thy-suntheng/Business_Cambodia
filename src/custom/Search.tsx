import { useNavigation } from '@react-navigation/core'
import React, { createRef, useEffect, useState } from 'react'
import { RefreshControl, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import style, { COLOR_BACKGROUND, MAIN_COLOR, width } from '../styles/style'
import { HStack } from 'native-base'
import FastImage from 'react-native-fast-image'
import { fetchBasicApi, FlatListVertical, makeid } from '../function/PTFunction'
import { Wander, Wave } from 'react-native-animated-spinkit'
import { Image } from 'react-native-elements'
let page: any = 1;
const Search = () => {
    const navigate: any = useNavigation()
    const [search, setSearch] = useState<any>(null)
    const [isRefresh, setIsRefresh] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);
    const [isMoreLoading, setIsMoreLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [searchText, setSearchText] = useState("")
    React.useEffect(() => {
        inputRef.current?.focus()
    }, [])
    React.useEffect(() => {
        page = 1;
        getData(searchText);
    }, [searchText]);

    const getData = (text: any) => {
        fetchBasicApi(`search?search=${text}`)
            .then((search) => {
                setSearch(search.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const getMore = async () => {
        if (!hasScrolled) return null;
        if (page > 0) {
            setIsMoreLoading(true);
            setTimeout(async () => {
                fetchBasicApi(`search?search=${searchText}&page=${page + 1}`).then((news) => {
                    let _data: any = search;
                    _data.push(...news.data);
                    setSearch(_data);
                    page = Math.ceil(_data.length / news.meta.per_page);
                    if (Number(news.meta.total) <= _data.length) {
                        page = 0;
                    }
                    setIsMoreLoading(false);
                })
            }, 200);
        }
    };
    const onRefresh = () => {
        setIsRefresh(true);
        page = 1;
        getData(searchText)
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

    const inputRef = createRef<TextInput>()
    useEffect(() => {
        inputRef.current?.focus()
    }, [])
    const renderItem = ({ item }: any) => {
        return (
            <>
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
                                backgroundColor: '#fff'
                            }}
                            placeholderStyle={{
                                backgroundColor: "#fff"
                            }}
                            PlaceholderContent={
                                <FastImage
                                    style={[styles.img, {
                                        height: 80,
                                        backgroundColor: "#f6f6f6"
                                    }]}
                                    source={require('../images/no_image.png')}
                                    resizeMode='contain'
                                />
                            }
                        />
                        <View style={styles.mainTitle}>
                            <Text style={styles.subTitle} numberOfLines={3}>{item.title}</Text>
                        </View>
                    </HStack>
                </TouchableOpacity>
            </>
        )
    }
    return (
        <>
            <View style={styles.header}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        navigate.goBack()
                    }}
                >
                    <Feather
                        style={{ marginRight: 10 }}
                        name='chevron-left'
                        size={40}
                        color='#fff'
                    />
                </TouchableOpacity>
                <View style={styles.input}>
                    <Fontisto
                        style={{ marginLeft: 10 }}
                        name='search'
                        color='gray'
                        size={20}
                    />

                    <TextInput
                        onChangeText={(text) => setSearchText(text)}
                        style={styles.inputtext}
                        placeholder="ស្វែងរកព័ត៌មាន...!"
                        placeholderTextColor={'#999'}
                        ref={inputRef}
                        autoFocus={true}
                    >
                    </TextInput>
                </View>
            </View>

            <View style={styles.container}>
                {isLoading ?
                    <Wander size={40}
                        color={MAIN_COLOR}
                        style={{ marginVertical: 20 }}
                    />
                    : search == 0 ? (
                        <View style={styles.content}>
                            {/* <Feather
                                name='folder'
                                size={55}
                                color='#999'
                            /> */}
                            <AntDesign
                                name='folderopen'
                                size={55}
                                color='#C8C6C6'
                            />
                            <Text style={styles.text}>គ្មានទិន្នន័យ</Text>
                        </View>
                    ) : (
                        <FlatListVertical
                            data={search}
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
                    )}
            </View>
        </>
    )
}

export default Search

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR_BACKGROUND
    },
    header: {
        width: width,
        padding: 5,
        backgroundColor: MAIN_COLOR,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    input: {
        borderRadius: 20,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        width: width - 80,
        borderColor: '#555',
        height: width / 9.2,
        marginRight: 10,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        marginTop: 30
    },
    text: {
        fontSize: 20,
        color: '#C8C6C6',
        ...style.p
    },
    list: {
        width: width - 10,
        padding: 5,
        borderWidth: 0.7,
        borderColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    mainTitle: {
        fontSize: 18,
        marginLeft: 5,
        ...style.pBold,
        width: width / 1.8,
    },
    img: {
        width: 160,
        height: 110,
        borderRadius: 5,
        marginRight: 5
    },
    subTitle: {
        fontSize: 17,
        marginBottom: 3,
        ...style.p
    },
    inputtext: {
        flex: 1,
        color: '#000',
        fontSize: 15,
        padding: 6,
        ...style.p,
        marginLeft: 5
    }

})

