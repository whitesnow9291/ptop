import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ChordListScreen } from './src/screens/ChordListScreen';
import { ChordDetailScreen } from './src/screens/ChordDetailScreen';
import { RootView } from '@app/screens/RootView';
import { PurchaseAdScreen } from '@app/screens/PurchaseAdScreen';
import { Provider, useSelector } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@app/redux/store';
import { request, PERMISSIONS } from 'react-native-permissions'

const Stack = createNativeStackNavigator();

function MainNavigator() {
  const navigation = useNavigation()
  return (<Stack.Navigator>
    <Stack.Screen name="ChordListScreen" component={ChordListScreen} options={{
      title: 'Chords', headerRight: () => {
        return <Button
          onPress={() => navigation.navigate('PurchaseAdScreen')}
          title="Remove Ad"
        />
      }
    }} />
    <Stack.Screen name="ChordDetailScreen" component={ChordDetailScreen} options={{ title: 'Chord Detail' }} />
    <Stack.Screen name="PurchaseAdScreen" component={PurchaseAdScreen} options={{ title: 'Remove Ads' }} />
  </Stack.Navigator>
  )
}
export default function App() {

  useEffect(() => {
    request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY)
  }, [])

  return (

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootView>
          <NavigationContainer>
            <MainNavigator />
          </NavigationContainer>
        </RootView>

      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
