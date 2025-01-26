import React from 'react'
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native'

const OrderedProductItem = ({ name, quantity, price, total, image, onClick }) => {
  return (
    <TouchableOpacity
      className='bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden'
      onPress={onClick}
      activeOpacity={0.7}
    >
      <View className='p-4 flex-row gap-4'>
        {/* Product Image */}
        <View className='bg-white/10 rounded-xl overflow-hidden'>
          {image ? (
            <Image
              source={{ uri: image }}
              resizeMode='contain'
              className='w-[80px] h-[80px]'
            />
          ) : (
            <View className='w-[80px] h-[80px] items-center justify-center'>
              <ActivityIndicator size='small' color='#FFFFFF' />
            </View>
          )}
        </View>

        {/* Product Details */}
        <View className='flex-1 justify-center space-y-2'>
          <Text className='text-white font-bold text-lg' numberOfLines={2}>
            {name}
          </Text>
          
          <View className='flex-row items-center justify-between'>
            <View className='flex-row items-center gap-2'>
              <Text className='text-white/60'>
                {quantity} × ${price}
              </Text>
            </View>
            <Text className='text-emerald-400 font-bold'>
              ${total}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default OrderedProductItem