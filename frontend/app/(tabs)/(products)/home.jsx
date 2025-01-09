import { View, Text, ScrollView, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../../constants'
import Item from '../../../components/Item'
import { router } from 'expo-router'
import { useGlobalContext } from '../../../context/GlobalProvider'
import { API_URL } from '../../_layout'

const Home = () => {
	const [ products, setProducts ] = useState([])

	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {

		setIsLoading(true)

		fetch(`${API_URL}/products`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
		}).then(res => res.json())
			.then(data => {
				setProducts(data)
			})
			.catch(err => {
				console.log(err)
				Alert.alert('Internal Server Error. Try again later')
			})

		setIsLoading(false)
		
	}, [])

	const productItems = products.map(product => (
		<Item
			key={product.id}
			name={product.name}
			price={product.price}
			image={product.image_url}
			onClick={() => router.push(`product-details?productId=${product.id}`)}
		/>
	))

  return (
    <SafeAreaView className='bg-slate-100 h-full'>
        <ScrollView>
            <Text className={`pt-4 px-8 text-3xl text-red font-bold self-start ${products.length == 0 && 'self-center'}`}>
							{products.length > 0 ? 'All products:' : 'No products available'}
						</Text>
            <View className='w-full items-start justify-center h-full flex-row flex-wrap gap-6 pt-4'>
							{productItems}
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

export default Home