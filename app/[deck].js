import { DeviceMotion } from 'expo-sensors';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Stack } from 'expo-router';

const OrientationModes = {
  Positive: 'positive',
  Negative: 'negative',
  Invalid: 'invalid'
}

const DisplayStates = {
  Card: 'card',
  Pass: 'pass',
  Correct: 'correct'
}

const GameState = {
  Waiting: 0,
  Started: 1,
  Ended: 2,
}

const Game = () => {
  const [gamma, setGamma] = useState(0);
  const [orientation, setOrientation] = useState(orientation);
  const [currentCard, setCurrentCard] = useState({});
  const [displayState, setDisplayState] = useState(DisplayStates.Card);
  const [orientationMode, setOrientationMode] = useState('');
  const prevDisplayStateRef = useRef(DisplayStates.Card);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const { deck: deckID } = useLocalSearchParams();
  const [gameState, setGameState] = useState(GameState.Waiting);

  const getDeckCards = async () => {
    try {
      const host = process.env.EXPO_PUBLIC_SERVER_URL
      const url = `${host}/decks/${deckID}/cards`
      const response = await fetch(url)
      const json = await response.json()
      setCards(json)
      setGameState(GameState.Started)

    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getDeckCards().then(

    );

    return () => {

    }
  }, [])

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL);
    var deviceMotionSubs;

    DeviceMotion.isAvailableAsync().then((result) => {
      if (result) {
        deviceMotionSubs = DeviceMotion.addListener((devicemotionData) => {
          setGamma(devicemotionData.rotation.gamma)
          setOrientation(devicemotionData.orientation)
        });

        DeviceMotion.setUpdateInterval(300);
      }
    })

    return () => {
      if (deviceMotionSubs) {
        deviceMotionSubs.remove();
      }
    }
  }, [])

  useEffect(() => {
    if (Math.abs(orientation) != 90) {
      setOrientationMode(OrientationModes.Invalid)
    } else if (Math.sign(orientation) === 1) {
      setOrientationMode(OrientationModes.Positive)
    } else {
      setOrientationMode(OrientationModes.Negative)
    }
  }, [orientation])

  useEffect(() => {
    var ds = ''
    if (orientationMode === OrientationModes.Positive) {
      if (gamma > -0.8) {
        ds = DisplayStates.Pass
      } else if (gamma < -2.3) {
        ds = DisplayStates.Correct
      } else {
        ds = DisplayStates.Card
      }
    } else {
      if (gamma < 0.8) {
        ds = DisplayStates.Pass
      } else if (gamma > 2.3) {
        ds = DisplayStates.Correct
      } else {
        ds = DisplayStates.Card
      }
    }

    setDisplayState(ds)
  }, [gamma, orientationMode])

  const selectNewCard = () => {
    return cards[Math.floor(Math.random() * cards.length)]
  }

  useEffect(() => {
    if (prevDisplayStateRef.current != DisplayStates.Card && displayState === DisplayStates.Card) {
      setCurrentCard(selectNewCard())
    }
    prevDisplayStateRef.current = displayState
  }, [displayState])

  const getDisplayValue = () => {
    if (orientationMode === OrientationModes.Invalid) {
      return 'Rotate Your Phone to Play the Game'
    }
    if (displayState === DisplayStates.Pass) {
      return 'PASS'
    } else if (displayState === DisplayStates.Correct) {
      return 'CORRECT!'
    } else {
      return currentCard.Name
    }
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      {
        loading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.titleText}>
            {getDisplayValue()}
          </Text>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#9EB384',
  },
  titleText: {
    fontSize: 50,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    color: '#fff',
  },
});

export default Game;
