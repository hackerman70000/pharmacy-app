import { Stack } from 'expo-router';
import React from 'react';

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
              headerTintColor: '#10B981',
              headerTitle: '',
              headerShadowVisible: false,
            }}
        />
    </Stack>
  )
}

export default ProfileLayout;