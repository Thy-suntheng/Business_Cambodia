import { NativeBaseProvider } from 'native-base';
import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import RNBootSplash from "react-native-bootsplash";
import { useDispatch, useSelector } from 'react-redux';
import HomeAdvertise from './src/custom/HomeAdvertise';
import { loadData } from './src/function/LoadData';
import Route from './src/routes/Route';
import messaging from '@react-native-firebase/messaging'
import { COLOR_BACKGROUND } from './src/styles/style';
messaging().subscribeToTopic("BusinessCambodia")
  .then(() => {
  })
const App = () => {
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }
  const dispatch = useDispatch()
  const categories = useSelector((state: any) => state.categories)
  useEffect(() => {
    if (categories === null)
      requestUserPermission(),
        loadData(dispatch)
    else
      RNBootSplash.hide({ fade: true });
  }, [categories])
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <HomeAdvertise showModal={true} />
        {categories && <Route />}
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
