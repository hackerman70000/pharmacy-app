import { Platform, TextInput, View } from 'react-native'
import IconButton from './IconButton'

const QuantityPicker = ({ value, increaseDisabled, decreaseDisabled, handleInputChange, increaseValue, decreaseValue }) => {
  return (
    <View className='flex-row items-center justify-center border rounded-l-2xl rounded-r-2xl'>
      <IconButton
        icon="minus"
        size={20}
        color="#10B981"
        handlePress={decreaseValue}
        disabled={decreaseDisabled}
        containerStyles="px-2"
      />
      <TextInput
        className={`${Platform.OS === 'web' && 'max-w-16 text-center pb-0'} pb-2 text-text h-[35px] px-4 text-xl border-x`}
        value={value}
        onChangeText={handleInputChange}
        keyboardType="numeric"
        maxLength={3}
        editable={false}
      />
      <IconButton
        icon="plus"
        size={20}
        color="#10B981"
        handlePress={increaseValue}
        disabled={increaseDisabled}
        containerStyles="px-2"
      />
    </View>
  )
}

export default QuantityPicker