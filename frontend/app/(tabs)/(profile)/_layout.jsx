import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const ProfileLayout = () => {
  return (
    <Stack>
        <Stack.Screen
            name='profile'
            options={{
              headerShown: false
            }}
        />
        <Stack.Screen
            name='order-details'
            options={{
              headerStyle: {
                backgroundColor: '#f1f5f9',
              },
              headerBackTitle: 'Profile',
              headerTintColor: '#d72638',
              headerTitle: '',
              headerShadowVisible: false,
            }}
        />
    </Stack>
  )
}

export default ProfileLayout;