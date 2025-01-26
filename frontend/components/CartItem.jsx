import { useEffect, useState } from 'react'
import { ActivityIndicator, Image, Platform, Text, View } from 'react-native'
import IconButton from './IconButton'
import QuantityPicker from './QuantityPicker'

const CartItem = ({ name, price, quantity, image, handleDelete, handleAdd }) => {
  const [value, setValue] = useState(quantity.toString());
  const [increaseDisabled, setIncreaseDisabled] = useState(parseInt(quantity) == 999);
  const [decreaseDisabled, setDecreaseDisabled] = useState(parseInt(quantity) == 1);

  useEffect(() => {
    setValue(quantity.toString())
  }, [quantity])

  const handleInputChange = (text) => {
    if (/^\d{1,3}$/.test(text) && parseInt(text) >= 1 && parseInt(text) <= 999) {
      setValue(text);
    }
    setIncreaseDisabled(text == '999');
    setDecreaseDisabled(text == '1'); 
  }

  const increaseValue = () => {
    const newValue = parseInt(value, 10) + 1;
    setValue(newValue.toString());
    setIncreaseDisabled(newValue == '999');
    setDecreaseDisabled(newValue == '1');
    handleAdd();
  }

  const decreaseValue = () => {
    const newValue = parseInt(value, 10) - 1;
    setValue(newValue.toString());
    setIncreaseDisabled(newValue == '999');
    setDecreaseDisabled(newValue == '1');
    handleDelete('1', false);
  }

  return (
    <View className='w-full items-center justify-between flex-row gap-4 p-4 rounded-xl border border-gray-200 shadow-sm bg-surface'>
      {image ?
        <Image
          source={{ uri: image }}
          resizeMode='contain'
          className='w-[80px] h-[80px] md:w-[100px] md:h-[100px]'
        />
        :
        <ActivityIndicator size='large' className='w-[80px] h-[80px]' color='#4F46E5' />
      }
      <View className={`flex-1 gap-5 justify-between items-start ${Platform.OS !== 'web' && ''}`}>
        <Text className='text-text text-xl font-semibold -mt-3'>{name}</Text>
        <QuantityPicker
          value={value}
          increaseDisabled={increaseDisabled}
          decreaseDisabled={decreaseDisabled}
          handleInputChange={handleInputChange}
          increaseValue={increaseValue}
          decreaseValue={decreaseValue}
        />
      </View>
      <View className='flex gap-3 ml-auto'>
        <Text className='text-text text-lg'>${price}</Text>
        <IconButton
          icon="trash"
          size={24}
          color="#EF4444"
          handlePress={() => handleDelete(value, true)}
        />
      </View>
    </View>
  )
}

export default CartItem