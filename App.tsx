import { NativeBaseProvider } from 'native-base';
import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import RNBootSplash from "react-native-bootsplash";
import { useDispatch, useSelector } from 'react-redux';
import HomeAdvertise from './src/custom/HomeAdvertise';
import { loadData } from './src/function/LoadData';
import Route from './src/routes/Route';
import messaging from '@react-native-firebase/messaging'
import { COLOR_BACKGROUND } from './src/styles/style';
import NetInfo from "@react-native-community/netinfo";
import NoInternetScreen from './src/components/NoInternetScreen';

messaging().subscribeToTopic("BusinessCambodia")
  .then(() => {
  })
const App = () => {
  const dispatch = useDispatch()
  const categories = useSelector((state: any) => state.categories)
  const no_connection = useSelector(
    (state: { no_connection: any }) => state.no_connection,
  );

  useEffect(() => {
    const inter = setInterval(() => {
      const unsubscribe = NetInfo.addEventListener(
        (state: { isConnected: any }) => {
          if (!state.isConnected) {
            dispatch({ type: 'LOAD_NO_CONNECTION', value: true });
            RNBootSplash.hide({ fade: true });
          } else {
            dispatch({ type: 'LOAD_NO_CONNECTION', value: false });
          }
        },
      );
      unsubscribe();
    }, 1000);

    if (no_connection) {
      clearInterval(inter);
    }
  }, [no_connection])

  useEffect(() => {
    if (categories == null) {
      loadData(dispatch)
      requestUserPermission()
    }
    else
      RNBootSplash.hide({ fade: true });
  }, [categories])


  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  }
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <HomeAdvertise showModal={true} />
        {no_connection ? <NoInternetScreen /> :
          categories && <Route />}
      </View>
    </NativeBaseProvider>
  )
}
export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_BACKGROUND
  }
})
