import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Sensor from './Sensor';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Sensor />
    </View>
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
