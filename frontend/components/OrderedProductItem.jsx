import React from 'react'
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native'

const OrderedProductItem = ({ name, quantity, price, total, image, onClick }) => {
  return (
    <TouchableOpacity
      className='w-full items-center flex-row gap-4 p-4 rounded-xl border border-gray-200 shadow-sm bg-surface'
      onPress={onClick}
      activeOpacity={0.7}
    >
      {image ?
        <Image
          source={{ uri: image }}
          resizeMode='contain'
          className='w-[80px] h-[80px]'
        />
        :
        <ActivityIndicator size='medium' className='w-[80px] h-[80px]' color='#4F46E5' />
      }
      <View className='flex-1 gap-2'>
        <Text className='text-xl font-semibold text-text-dark'>{name}</Text>
        <View className='flex-row gap-3'>
          <Text className='text-text-light font-semibold text-xl'>{quantity} x ${price}</Text>
          <Text className='text-text-light font-semibold text-xl'>=</Text>
          <Text className='text-primary font-bold text-xl'>${total}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default OrderedProductItem