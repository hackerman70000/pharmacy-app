import { View, TextInput, Image, TouchableOpacity, Platform } from 'react-native'
import { useState } from 'react'
import { icons } from '../constants'

const QuantityPicker = ({ value, increaseDisabled, decreaseDisabled, handleInputChange, increaseValue, decreaseValue }) => {

  return (
    <View className='flex-row items-center justify-center border rounded-l-2xl rounded-r-2xl'>
        <TouchableOpacity
					onPress={decreaseValue}
					activeOpacity={0.7}
					disabled={decreaseDisabled}
					className='px-2'
				>
					<Image
							source={icons.minus}
							resizeMode='contain'
							className={`${Platform.OS === 'web' && 'max-w-[25px] max-h-[35px]'} w-[20px] h-[35px]`}
					/>
				</TouchableOpacity>
				<TextInput
						className={`${Platform.OS === 'web' && 'max-w-16 text-center pb-0'} pb-2 text-black h-[35px] px-4 text-xl border-x`}
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
					className='px-2'
				>
					<Image
							source={icons.plus}
							resizeMode='contain'
							className={`${Platform.OS === 'web' && 'max-w-[25px] max-h-[35px]'} w-[20px] h-[35px]`}
					/>
				</TouchableOpacity>
    </View>
  )
}

export default QuantityPicker