import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading, variant = 'primary' }) => {
  const getBackgroundColor = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-secondary'
      case 'outline':
        return 'bg-transparent border-2 border-primary'
      default:
        return 'bg-primary'
    }
  }

  const getTextColor = () => {
    return variant === 'outline' ? 'text-primary' : 'text-white'
  }

  return (
    <TouchableOpacity
      className={`${getBackgroundColor()} rounded-xl min-h-[50px] px-4
        justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isLoading}
    >
      <Text className={`${getTextColor()} font-psemibold text-lg ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default CustomButton