import { View, Text, FlatList } from 'react-native';
import { useState, useEffect } from 'react'
import Card from '../components/card';
import { router } from 'expo-router';
import { Stack } from 'expo-router';

const Home = ({ data }) => {
  const [selected, setSelected] = useState('');

  useEffect(() => {
    if (selected) {
      router.push(`/${selected}`)
    }
  }, [selected])

  return (
    <View>
      <Stack.Screen options={{ title: 'Select the deck' }} />
      {/* <Text>Select the Deck you would like to play</Text> */}
      <FlatList
        data={data}
        keyExtractor={item => item}
        extraData={selected}
        renderItem={({ item }) => {
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
  )
}

export default Home
