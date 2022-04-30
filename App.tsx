import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ChordListScreen } from './src/screens/ChordListScreen';
import { ChordDetailScreen } from './src/screens/ChordDetailScreen';

const Stack = createNativeStackNavigator();

function MainNavigator() {

  return (<Stack.Navigator>
    <Stack.Screen name="ChordListScreen" component={ChordListScreen} options={{ title: 'Chords' }} />
    <Stack.Screen name="ChordDetailScreen" component={ChordDetailScreen} options={{ title: 'Chord Detail' }} />
  </Stack.Navigator>
  )
}
export default function App() {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
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
