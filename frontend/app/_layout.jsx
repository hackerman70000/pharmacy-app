import { Stack, Slot } from 'expo-router'
import '../global.css'
import GlobalProvider from '../context/GlobalProvider'

export const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:80/api'

const RootLayout = () => {
    
  return (
    <GlobalProvider>
        <Stack>
          <Stack.Screen name='index' options={{headerShown: false}} />
          <Stack.Screen name='(auth)' options={{headerShown: false}} />
          <Stack.Screen name='(tabs)' options={{headerShown: false}} />
        </Stack>
    </GlobalProvider>
  )
}

export default RootLayout