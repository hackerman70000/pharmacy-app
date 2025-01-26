import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const OrderItem = ({ orderId, status, total, date, onClick }) => {
  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'completed':
        return 'text-emerald-400'
      case 'pending':
        return 'text-amber-400'
      case 'processing':
        return 'text-blue-400'
      case 'cancelled':
        return 'text-red-400'
      default:
        return 'text-white'
    }
  }

  return (
    <TouchableOpacity
      className='bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden'
      onPress={onClick}
      activeOpacity={0.7}
    >
      <View className='p-5 space-y-4'>
        {/* Header */}
        <View className='flex-row justify-between items-center'>
          <Text className='text-lg font-bold text-white'>Order #{orderId}</Text>
          <Text className={`font-medium ${getStatusColor(status)}`}>
            {status}
          </Text>
        </View>

        {/* Details */}
        <View className='space-y-2'>
          <View className='flex-row justify-between items-center'>
            <Text className='text-white/60'>Amount</Text>
            <Text className='text-white font-bold'>${total}</Text>
          </View>
          
          <View className='flex-row justify-between items-center'>
            <Text className='text-white/60'>Date</Text>
            <Text className='text-white/80'>{date}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default OrderItem