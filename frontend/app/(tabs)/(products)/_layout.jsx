import { Stack } from 'expo-router'
import React from 'react'

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
              headerTintColor: '#10B981',
              headerTitle: '',
              headerShadowVisible: false,
            }}
        />
    </Stack>
  )
}

export default ProductsLayout