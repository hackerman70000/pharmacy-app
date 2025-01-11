import { TouchableOpacity, Text, Image } from 'react-native'
import React from 'react'

const Item = ({ name, price, image, itemId, onClick }) => {
  return (
    <TouchableOpacity
        className='items-center justify-center w-[160px] md:w-[220px] p-4 rounded-xl border-red shadow-sm bg-[#FFFFFF]'
        onPress={onClick}
        activeOpacity={0.7}
    >
        <Image
            source={{ uri: image }}
            resizeMode='contain'
            className='w-[100px] h-[100px] md:w-[130px] md:h-[130px]'
        />
        <Text className='text-black text-lg text-center font-semibold'>{name}</Text>
        <Text className='text-black text-lg'>{price} zł</Text>
    </TouchableOpacity>
  )
}

export default Item