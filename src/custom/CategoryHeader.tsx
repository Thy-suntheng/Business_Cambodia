import React, { useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import style, { COLOR_BACKGROUND, MAIN_COLOR, } from '../styles/style';
var AutoScrolling = require('react-native-auto-scrolling');
const CategoryHeader = () => {
    const home = useSelector((state: any) => state.home)
    const category_title = useSelector((state: any) => state.category_title)

    function renderText() {
        var result = '';
        if (home) {
            home.data_marquee.map((item: any) => {
                result += item.title + ' '
            })
        }
        return home &&
            <AutoScrolling duration={70000}>
                <Text style={{ marginTop: 12, ...style.p, fontSize: 16, color: MAIN_COLOR }}>{result}</Text>
            </AutoScrolling>
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
        ...style.p,
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
    },
})



// import React from 'react'
// import { Text, StyleSheet, View } from 'react-native'
// import { useSelector } from 'react-redux';
// import { COLOR_BACKGROUND } from '../styles/style';
// var AutoScrolling = require('react-native-auto-scrolling');

// const CategoryHeader = () => {
//     const style = useSelector((state: any) => state.style);
//     const home = useSelector((state: any) => state.home)
//     var result = '';
//     home.data_marquee.map((item: any, index: any) => {
//         result += item.title + ' '
//     })
//     return (
//         <View style={[styles.matSlide,]}>
//             <AutoScrolling duration={70000}>
//                 <Text style={[{ color: '#000', fontSize: 15 }]}>{result}</Text>
//             </AutoScrolling>
//         </View>
//     )
// }
// export default React.memo(CategoryHeader);

// const styles = StyleSheet.create({
//     matSlide: {
//         backgroundColor: COLOR_BACKGROUND,
//         // paddingVertical: 10,
//         justifyContent: 'center',
//         // alignItems:'center',
//         height: 45,
//         marginTop: 5
//     },
// })