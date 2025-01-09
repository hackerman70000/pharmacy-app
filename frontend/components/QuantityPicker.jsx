import { View, TextInput, Image, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { icons } from '../constants'

const QuantityPicker = ({ value, increaseDisabled, decreaseDisabled, handleInputChange, increaseValue, decreaseValue }) => {

  return (
    <View className='flex-row items-center justify-center'>
        <TouchableOpacity
					onPress={decreaseValue}
					activeOpacity={0.7}
					disabled={decreaseDisabled}
				>
					<Image
							source={icons.minus}
							resizeMode='contain'
							className='w-[30px] h-[35px] px-2 border rounded-l-2xl'
					/>
				</TouchableOpacity>
				<TextInput
						className='text-black h-[35px] px-4 text-xl border-y'
						value={value}
						onChangeText={handleInputChange}
						keyboardType="numeric"
						maxLength={3}
						editable={false}
				/>
				<TouchableOpacity
					onPress={increaseValue}
					activeOpacity={0.7}
					disabled={increaseDisabled}
				>
					<Image
							source={icons.plus}
							resizeMode='contain'
							className='w-[30px] h-[35px] px-2 border rounded-r-2xl'
					/>
				</TouchableOpacity>
    </View>
  )
}

export default QuantityPicker