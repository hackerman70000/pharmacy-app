import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const OrderItem = ({ orderId, status, total, date, onClick }) => {
  return (
    <TouchableOpacity
      className='w-full items-center justify-between gap-2 p-4 rounded-xl border border-gray-200 shadow-sm bg-surface'
      onPress={onClick}
      activeOpacity={0.7}
    >
      <Text className='text-2xl self-start font-bold text-text-dark'>{orderId}</Text>
      <View className='w-full items-center flex-row'>
        <Text className='text-xl font-semibold text-text'>Status: </Text>
        <Text className='text-xl text-text-light font-semibold'>{status}</Text>
      </View>
      <View className='w-full items-center flex-row'>
        <Text className='text-xl font-semibold text-text'>Total: </Text>
        <Text className='text-xl text-primary font-semibold'>${total}</Text>
      </View>
      <View className='w-full items-center flex-row'>
        <Text className='text-xl font-semibold text-text'>Date: </Text>
        <Text className='text-xl text-text-light font-semibold mr-auto'>{date}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default OrderItem