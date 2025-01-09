import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useState, useEffect } from 'react'
import { icons, images } from '../constants'
import QuantityPicker from './QuantityPicker'
import ImageButton from './ImageButton'

const CartItem = ( { name, price, quantity, image, handleDelete, handleAdd } ) => {

	const [value, setValue] = useState(quantity.toString());

	const [increaseDisabled, setIncreaseDisabled] = useState(parseInt(quantity) == 999);

	const [decreaseDisabled, setDecreaseDisabled] = useState(parseInt(quantity) == 1);

	const handleInputChange = (text) => {
		if (/^\d{1,3}$/.test(text) && parseInt(text) >= 1 && parseInt(text) <= 999) {
			setValue(text);
		}
		console.log(value);
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
    <View
			className='w-full items-center justify-between flex-row gap-4 p-4 rounded-xl border-red shadow-sm bg-[#FFFFFF]'
    >
			{image ?
				<Image
					source={{ uri: image }}
					resizeMode='contain'
					className='w-[80px] h-[80px]'
				/>
				:
				<ActivityIndicator size='large' className='w-[80px] h-[80px]' color='#0000ff' />
			}
			<View className='flex gap-5 justify-between items-start max-w-[160px]'>
				<Text className='text-black text-xl font-semibold -mt-3'>{name}</Text>
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
				<Text className='text-black text-lg'>{price} zł</Text>
				<ImageButton
						image={icons.trash}
						imageStyles='w-6 h-6'
						handlePress={() => handleDelete(value, true)}
				/>
			</View>
    </View>
  )
}

export default CartItem