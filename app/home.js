import { View, Text, FlatList } from 'react-native';
import { useState, useEffect } from 'react'
import Card from '../components/card';
import { router, Stack } from 'expo-router';

const Home = ({ data }) => {
  const [selected, setSelected] = useState();

  useEffect(() => {
    if (selected) {
      router.push(`/${selected}`)
    }
  }, [selected])

  return (
    <View>
      <Stack.Screen options={{ title: 'Select the deck' }} />
      <FlatList
        data={data}
        keyExtractor={item => item.ID}
        extraData={selected}
        renderItem={({ item }) => {
          return (
            <Card
              onPress={() => setSelected(item.ID)}
              selected={selected === item.ID}
            >
              <Text style={{ color: selected === item.ID ? "#fff" : "#000", fontSize: 30, fontWeight: "bold" }}>
                {item.Name}
              </Text>
            </Card>
          )
        }}
      />
    </View>
  )
}

export default Home
