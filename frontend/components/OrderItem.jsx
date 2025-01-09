import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const OrderItem = ({ orderId, status, total, date, onClick }) => {
  return (
    <TouchableOpacity
        className='w-full items-center justify-between gap-2 p-2 rounded-xl border-red shadow-sm bg-[#FFFFFF]'
        onPress={onClick}
        activeOpacity={0.7}
    >
      <Text className='text-2xl self-start font-bold'>{orderId}</Text>
      <View className='w-full items-center flex-row'>
        <Text className='text-xl font-semibold'>Status: </Text>
        <Text className='text-xl text-slate-500 font-semibold'>{status}</Text>
      </View>
      <View className='w-full items-center flex-row'>
        <Text className='text-xl font-semibold'>Total: </Text>
        <Text className='text-xl text-slate-500 font-semibold'>{total} zł</Text>
      </View>
      <View className='w-full items-center flex-row'>
        <Text className='text-xl font-semibold'>Date: </Text>
        <Text className='text-xl text-slate-500 font-semibold mr-auto'>{date}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default OrderItem