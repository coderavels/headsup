import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Sensor from './Sensor';

const Cards = ['Amitabh Bachchan', 'Shahrukh Khan', 'Madhuri Dixit', 'Dharmendra', 'Sunny Deol', 'Bobby Deol', 'Abhishek Bachchan', 'Rani Mukherji', 'Kajol']

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Sensor cards={Cards} />
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
