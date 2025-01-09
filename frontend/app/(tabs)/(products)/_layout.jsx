import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const ProductsLayout = () => {
  return (
    <Stack>
        <Stack.Screen
            name='home'
            options={{
              headerShown: false
            }}
        />
        <Stack.Screen
            name='product-details'
            options={{
              headerStyle: {
                backgroundColor: '#f1f5f9',
              },
              headerBackTitle: 'All products',
              headerTintColor: '#d72638',
              headerTitle: '',
              headerShadowVisible: false,
            }}
        />
    </Stack>
  )
}

export default ProductsLayout