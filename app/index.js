import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import Home from './home';

const decksPath = "/decks"

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getDecks = async () => {
    try {
      const host = process.env.EXPO_PUBLIC_SERVER_URL;
      const url = `${host}${decksPath}`
      console.log("url to fetch decks", url)
      const response = await fetch(url)
      const json = await response.json()
      setData(json)
    } catch (error) {
      console.error("error while fetching decks", error)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getDecks();
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {loading
        ? (
          <ActivityIndicator />
        )
        : (
          <Home data={data} />
        )
      }
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9EB384',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

