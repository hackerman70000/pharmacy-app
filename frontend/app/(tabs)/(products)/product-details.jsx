import { View, Text, ScrollView, Image, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../../../components/CustomButton'
import { API_URL } from '../../_layout'
import { useLocalSearchParams, router } from 'expo-router'
import QuantityPicker from '../../../components/QuantityPicker'
import { useGlobalContext } from '../../../context/GlobalProvider'

const ProductDetails = () => {

	const { productId } = useLocalSearchParams()

	const [isLoading, setIsLoading] = useState(false)
	
	const [productInfo, setProductInfo] = useState({
		name: '',
		price: 0,
		manufacturer: '',
		description: '',
		imageUrl: '',
	})

	const { isLoggedIn, state, triggerRefreshViews } = useGlobalContext()

	const [value, setValue] = useState('1');

	const [increaseDisabled, setIncreaseDisabled] = useState(false)

	const [decreaseDisabled, setDecreaseDisabled] = useState(true)

	useEffect(() => {
		setIsLoading(true)

		fetch(`${API_URL}/products/${productId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
		}).then(res => res.json())
			.then(data => {
				setProductInfo({
					...productInfo,
					name: data.name,
					price: data.price,
					manufacturer: data.manufacturer,
					description: data.description,
					imageUrl: data.image_url
				})
			})
			.catch(err => {
				console.log(err)
				Alert.alert('Internal Server Error. Try again later')
			})

			setIsLoading(false)
		
	}, [])


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
	}

	const decreaseValue = () => {
		const newValue = parseInt(value, 10) - 1;

		setValue(newValue.toString());

		console.log(newValue == '1');
		setIncreaseDisabled(newValue == '999');
		setDecreaseDisabled(newValue == '1');
	}

	const addToCart = () => {

		if (!isLoggedIn) {
			Alert.alert(
				"Sign in required",
				"You need to be signed in to add to cart. Do you want to sign in now?",
				[
					{
						text: "No",
						onPress: () => {}
					},
					{
						text: "Yes",
						onPress: () => router.push('/sign-in')
					},
				],
				{ cancelable: true }
			);

			return;
		}

		setIsLoading(true)

		fetch(`${API_URL}/cart/add`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${state.token}`
			},
			body: JSON.stringify({
				product_id: productId,
				quantity: parseInt(value)
			})
		}).then(res => res.json())
			.then(data => {
				setValue('1');

				triggerRefreshViews();
				setIsLoading(false)

				Alert.alert(
					"Product added to cart",
					"Product added to cart. Do you want to continue to checkout?",
					[
						{
							text: "No",
							onPress: () => {}
						},
						{
							text: "Yes",
							onPress: () => router.push('/cart')
						},
					],
					{ cancelable: true }
				);

			})
			.catch(err => {
				setIsLoading(false)
				console.log(err)
				Alert.alert('Internal Server Error. Try again later')
			})
	}

  return (
    <SafeAreaView className='bg-slate-100 h-full'>
        <ScrollView>
            <View className='w-full items-start justify-center h-full gap-4 px-8'>
								<View className='w-full self-center items-center justify-center bg-[#ffffff] rounded-xl shadow-sm'>
									{productInfo.imageUrl ?
										<Image
												source={{ uri: productInfo.imageUrl }}
												resizeMode='contain'
												className='w-[250px] h-[250px] self-center'
										/>
										:
										<ActivityIndicator size='large' className='w-[250px] h-[250px] self-center' color='#0000ff' />
									}
								</View>
                <Text className='text-3xl font-bold'>{productInfo.name}</Text>
								<View className='flex-row items-center justify-between w-full'>
									<View className='items-center flex-row'>
                		<Text className='text-2xl mr-auto font-semibold'>Price: </Text>
										<Text className='text-2xl text-slate-500 mr-auto font-semibold'>{productInfo.price} zł</Text>
									</View>
									<QuantityPicker
										value={value}
										increaseDisabled={increaseDisabled}
										decreaseDisabled={decreaseDisabled}
										handleInputChange={handleInputChange}
										increaseValue={increaseValue}
										decreaseValue={decreaseValue}
									/>
								</View>
                <CustomButton
                    title='Add to cart'
                    containerStyles='w-full'
										handlePress={addToCart}
                />
								<View className='items-center flex-row'>
                	<Text className='text-xl font-semibold'>Manufacturer: </Text>
									<Text className='text-xl text-slate-500 font-semibold'>{productInfo.manufacturer}</Text>
								</View>
                <Text className='text-xl font-semibold'>Description</Text>
                <Text className='text-lg'>{productInfo.description}</Text>
            </View>
        </ScrollView>
				{isLoading && (
					<View className="absolute inset-0 bg-slate-700/50 flex justify-center items-center">
						<ActivityIndicator size="large" color="#ffffff" />
					</View>
				)}
    </SafeAreaView>
  )
}

export default ProductDetails