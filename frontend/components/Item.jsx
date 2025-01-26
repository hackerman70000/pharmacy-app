import React from 'react'
import { Image, Text, TouchableOpacity } from 'react-native'

const Item = ({ name, price, image, itemId, onClick }) => {
  return (
    <TouchableOpacity
        className='items-center justify-center w-[160px] md:w-[220px] p-4 rounded-xl border-emerald-500 shadow-sm bg-surface'
        onPress={onClick}
        activeOpacity={0.7}
    >
        <Image
            source={{ uri: image }}
            resizeMode='contain'
            className='w-[100px] h-[100px] md:w-[130px] md:h-[130px]'
        />
        <Text className='text-text text-lg text-center font-semibold'>{name}</Text>
        <Text className='text-text text-lg'>${price}</Text>
    </TouchableOpacity>
  )
}

export default Item