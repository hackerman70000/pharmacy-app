import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const ImageButton = ({ title, image, handlePress, containerStyles, imageStyles, isLoading }) => {
  return (
    <TouchableOpacity
        className={`bg-red rounded-xl min-h-[50px] px-4
            justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
        onPress={handlePress}
        activeOpacity={0.7}
        disabled={isLoading}
    >
        <Image
          source={image}
          resizeMode='contain'
          tintColor={'#ffffff'}
          className={imageStyles}
        />
    </TouchableOpacity>
  )
}

export default ImageButton