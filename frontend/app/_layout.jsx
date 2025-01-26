import { Stack } from 'expo-router'
import GlobalProvider from '../context/GlobalProvider'
import '../global.css'

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