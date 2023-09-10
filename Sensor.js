import { DeviceMotion } from 'expo-sensors';
import { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';

const Cards = ['Amitabh Bachchan', 'Shahrukh Khan', 'Madhuri Dixit', 'Dharmendra', 'Sunny Deol', 'Bobby Deol', 'Abhishek Bachchan', 'Rani Mukherji', 'Kajol']

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

const Sensor = () => {
  const [gamma, setGamma] = useState(0);
  const [orientation, setOrientation] = useState(orientation);
  const [currentCard, setCurrentCard] = useState('');
  const [displayState, setDisplayState] = useState(DisplayStates.Card);
  const [orientationMode, setOrientationMode] = useState('');
  const prevDisplayStateRef = useRef(DisplayStates.Card);

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
    return Cards[Math.floor(Math.random() * Cards.length)]
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
      return currentCard
    }
  }

  // console.log('orientation: ', orientation)
  // console.log('new displayState: ', displayState, ' , prev displayState: ', prevDisplayStateRef.current)
  // console.log('current Card: ', currentCard)

  return (
    <View>
      <Text style={styles.titleText}>
        {getDisplayValue()}
      </Text>
      {/* <Text> */}
      {/*   {gamma} */}
      {/* </Text> */}
      {/* <Text> */}
      {/*   {orientation} */}
      {/* </Text> */}
    </View>
  )
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 50,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
  },
});

export default Sensor;
