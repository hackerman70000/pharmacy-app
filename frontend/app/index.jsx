import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../components/CustomButton'
import { router } from 'expo-router'

const App = () => {
  return (
    <SafeAreaView className='h-full bg-slate-100'>
        <ScrollView contentContainerStyle={{height: '100%'}}>
            <View className='w-full items-center justify-center h-full'>
                <CustomButton
                    title='Sign in'
                    handlePress={() => router.push('/sign-in')}
                />
                <Text className='text-slate-500 font-semibold text-xl my-3'>or</Text>
                <CustomButton
                    title='Continue as guest'
                    handlePress={() => router.push('/home')}
                />
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default App