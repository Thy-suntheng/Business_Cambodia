import React, { useState } from 'react'
import { InteractionManager, KeyboardAvoidingView, Platform, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Loading } from '../function/PTFunction';
import { MAIN_COLOR } from '../styles/style';
import HeaderScreen from './HeaderScreen';


const BaseComponent = ({ children, title, data, loading }: any) => {
    const [isReady, setIsReady] = useState(false)
    React.useEffect(() => {
        // InteractionManager.runAfterInteractions(() => {
        //     setIsReady(true)
        // });
        setIsReady(true)
    }, [])
    return (
        <KeyboardAvoidingView
            keyboardVerticalOffset={Platform.OS === "ios" ? 15 : 25}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1, backgroundColor: '#f6f6f6' }}
        >
            <View style={{
                flex: 1,
            }}>
                {title && <HeaderScreen />}
                {!isReady || data === null ? (loading ?
                    <Loading /> : null) :
                    children
                }
            </View>
            <SafeAreaView style={{ flex: 0, backgroundColor: MAIN_COLOR }} />
        </KeyboardAvoidingView>
    )
}

export default React.memo(BaseComponent)