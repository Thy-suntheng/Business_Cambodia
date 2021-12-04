import React, { useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import TextTicker from 'react-native-text-ticker';
import { useSelector } from 'react-redux'
import style, { COLOR_BACKGROUND, MAIN_COLOR, width } from '../styles/style';
var MarqueeText = require("react-native-marquee").default
const CategoryHeader = () => {
    const home = useSelector((state: any) => state.home)
    const category_title = useSelector((state: any) => state.category_title)
    const _renderText = () => {
        return (
            home.data_marquee.map((item: any, index: any) => {
                return (
                    <Text
                        key={index}
                        style={styles.text}>
                        {item.title}
                    </Text>
                )
            })
        )
    }
    function renderText() {
        return home &&
            <TextTicker
                style={{ marginTop: 12, marginLeft: (width / 2.5), width: width / 1.3 }}
                duration={70000}
                shouldAnimateTreshold={40}
                bounce={false}
                loop
                marqueeDelay={100}
            >
                {_renderText()}
            </TextTicker>
    }
    const RENDER_TEXT = useMemo(() => renderText(), [home])
    return (
        <View style={styles.container}>
            {RENDER_TEXT}
            <View style={styles.headerContainer}>
                <View style={styles.box}>
                    <Text style={[styles.text, {
                        color: '#fff'
                    }]}>{category_title}</Text>
                    <View style={{
                        width: 10
                    }}
                    />
                    <View style={styles.diamond}>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default CategoryHeader

const styles = StyleSheet.create({
    container: {
        height: 48,
        backgroundColor: COLOR_BACKGROUND,
        alignItems: 'center'
    },
    text: {
        color: MAIN_COLOR,
        fontSize: 16,
        marginHorizontal: 10,
        ...style.p
    },
    diamond: {
        width: 28,
        height: 28,
        backgroundColor: MAIN_COLOR,
        transform: [{ rotate: "45deg" }],
        right: -14,
        top: 6,
        position: 'absolute'
    },
    box: {
        height: 40,
        minWidth: 80,
        backgroundColor: MAIN_COLOR,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerContainer: {
        position: 'absolute',
        left: 0,
        top: 4
    }
})


