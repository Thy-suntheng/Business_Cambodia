import { Dimensions, StyleSheet } from "react-native";
import { Battambang, BattambangBold } from "../custom_fonts/customFonts";
export const MAIN_COLOR = '#ed1b24'
export const TEXT_COLOR = '#000'
export const ICON_COLOR = '#555'
export const COLOR_BACKGROUND = '#fff'
export const { width, height } = Dimensions.get('window');
export default StyleSheet.create({
    p: {
        ...Battambang
    },
    pBold: {
        ...BattambangBold
    }
})