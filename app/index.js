import { Text, View, FlatList, StyleSheet } from 'react-native';
import { useState } from 'react';
import Card from '../components/card';
import { StatusBar } from 'expo-status-bar';

const data = ['Actors', 'Actors', 'Actors']

export default function App() {
  const [selected, setSelected] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View>
        <Text>Select the Deck you would like to play</Text>
        <FlatList
          data={data}
          keyExtractor={item => item}
          extraData={selected}
          renderItem={(item) => {
            return (
              <Card
                onPress={() => setSelected(item)}
                selected={selected === item}
              >
                <Text style={{ color: selected === item ? "#fff" : "#000", fontSize: 30, fontWeight: "bold" }}>
                  {item}
                </Text>
              </Card>
            )
          }}
        />
      </View>
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

