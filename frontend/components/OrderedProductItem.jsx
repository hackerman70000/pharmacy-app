import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import { images } from '../constants'

const OrderedProductItem = ({ name, quantity, price, total, image, onClick }) => {
  return (
    <TouchableOpacity
			className='w-full items-center flex-row gap-4 p-2 rounded-xl border-red shadow-sm bg-[#FFFFFF]'
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
        <ActivityIndicator size='medium' className='w-[80px] h-[80px]' color='#0000ff' />
      }
			<View className='flex gap-2'>
        <Text className='text-xl font-semibold'>{name}</Text>
        <View className='flex-row gap-3'>
          <Text className='text-slate-500 font-semibold text-xl'>{quantity} x {price} zł</Text>
          <Text className='text-slate-500 font-semibold text-xl'>=</Text>
          <Text className='text-green-500 font-bold text-xl'>{total} zł</Text>
        </View>
			</View>
    </TouchableOpacity>
  )
}

export default OrderedProductItem