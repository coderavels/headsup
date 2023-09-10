import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Home from './home';

const data = ['Actors', 'Movies', 'Food']

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Home data={data} />
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

