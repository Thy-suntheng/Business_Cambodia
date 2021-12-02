import { NativeBaseProvider } from 'native-base';
import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import RNBootSplash from "react-native-bootsplash";
import { useDispatch, useSelector } from 'react-redux';
import HomeAdvertise from './src/custom/HomeAdvertise';
import { loadData } from './src/function/LoadData';
import Route from './src/routes/Route';
import messaging from '@react-native-firebase/messaging'
messaging().subscribeToTopic("BusinessCambodia")
  .then(() => {
  })
const App = () => {
  const dispatch = useDispatch()
  const categories = useSelector((state: any) => state.categories)
  useEffect(() => {
    if (categories === null)
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
    backgroundColor: '#fff'
  }
})
