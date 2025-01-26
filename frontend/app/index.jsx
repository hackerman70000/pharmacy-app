import { router } from 'expo-router'
import { PillBottle } from 'lucide-react'
import React from 'react'
import { ImageBackground, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../components/CustomButton'

const App = () => {
  return (
    <ImageBackground 
      source={require('../assets/images/index-background.jpg')}
      resizeMode="cover"
      style={{
        flex: 1,
        width: '100%',
        height: '100%'
      }}
    >
      <SafeAreaView className='h-full'>
        <View className='absolute inset-0 bg-black/60' />
        <ScrollView contentContainerStyle={{height: '100%'}}>
          <View className='w-full items-center justify-center h-full px-6'>
            <View className='bg-black/20 backdrop-blur-sm p-8 rounded-3xl items-center'>
              <View className='bg-white p-5 rounded-full mb-8 shadow-lg'>
                <PillBottle size={64} color="#10B981" />
              </View>
              <Text className='text-4xl font-bold text-white mb-3 text-center'>Your Pharmacy</Text>
              <Text className='text-white text-center text-lg mb-12 max-w-sm'>
                Your trusted healthcare partner. Access medications and health products with ease.
              </Text>
              <View className='w-full max-w-xs'>
                <CustomButton
                  title='Sign in'
                  handlePress={() => router.push('/sign-in')}
                  containerStyles='w-full mb-4 shadow-lg'
                />
                <Text className='text-white font-medium mt-1 mb-4 text-center px-4'>or</Text>
                <CustomButton
                  title='Continue as a guest'
                  handlePress={() => router.push('/home')}
                  variant='outline'
                  containerStyles='w-full border-white shadow-lg'
                  textStyles='text-white'
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  )
}

export default App