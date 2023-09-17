import { Stack } from 'expo-router';

export default function Layout() {
  return <Stack screenOptions={{
    headerStyle: {
      backgroundColor: '#C8AE7D',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 30,
    },

  }} />;
}
