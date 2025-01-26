import React, { useState } from 'react'
import { Platform, Text, TextInput, View } from 'react-native'
import IconButton from './IconButton'

const FormField = ({title, value, placeholder, handleChangeText, otherStyles, ...props}) => {
  const [showPassword, setshowPassword] = useState(false)
  
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='text-base text-text font-pmedium pl-2'>{title}</Text>

      <View className='border-2 border-gray-200 w-full h-16 px-4
      bg-surface rounded-2xl focus:border-primary items-center flex-row'>
        <TextInput
          className={`flex-1 text-text font-psemibold text-base h-full ${Platform.OS !== 'web' && 'pb-2'}`}
          value={value}
          placeholder={placeholder}
          placeholderTextColor='#94A3B8'
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
          {...props}
        />

        {title === 'Password' && (
          <IconButton
            icon={showPassword ? 'eyeOff' : 'eye'}
            size={24}
            color="#64748B"
            handlePress={() => setshowPassword(!showPassword)}
          />
        )}
      </View>
    </View>
  )
}

export default FormField