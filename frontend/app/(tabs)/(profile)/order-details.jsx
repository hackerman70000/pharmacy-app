import { View, Text, ScrollView, ActivityIndicator, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState, useEffect } from 'react'
import OrderedProductItem from '../../../components/OrderedProductItem'
import { useLocalSearchParams, router } from 'expo-router'
import { API_URL } from '../../_layout'
import { formatDate } from './profile'
import { useGlobalContext } from '../../../context/GlobalProvider'

const OrderDetails = () => {

  const { orderId } = useLocalSearchParams()

  const isWeb = Platform.OS === 'web'

  const { state, isLoggedIn, refreshViews } = useGlobalContext()

  const [orderInfo, setOrderInfo] = useState({
    orderNumber: '',
    status: '',
    total: 0,
    date: '',
  })

  const [orderedProducts, setOrderedProducts] = useState([])

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {

    if (!isLoggedIn) {
      if (isWeb)
        window.location.href = '/home'
      else 
        router.replace('/home');

      return
    }

    setIsLoading(true)

    fetch(`${API_URL}/payment/orders/${orderId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.token}`
      },
    }).then(res => res.json())
      .then(data => {
        setOrderInfo({
          orderNumber: data.order.order_number,
          status: data.order.status,
          total: data.order.amount,
          date: formatDate(data.order.created_at)
        })

        setOrderedProducts(data.order.items)
      })
      .catch(err => {
        console.log(err)

        const message = 'Internal Server Error. Try again later'
        if (isWeb) { 
          window.alert(message)
        } else {
          Alert.alert(message)
        }
      })

    setIsLoading(false)
    
  }, [refreshViews])

  const orderedProductItems = orderedProducts.map(product => (
    <OrderedProductItem
      key={product.product_id}
      name={product.name}
      quantity={product.quantity}
      price={product.unit_price}
      total={product.total}
      image={product.image_url}
      onClick={() => router.push(`product-details?productId=${product.product_id}`)}
    />
  ))

  return (
    <SafeAreaView className='bg-slate-100 h-full'>
        <ScrollView>
            <View className='w-full items-center justify-center h-full gap-4 px-8 max-w-[1000px] self-center'>
              <Text className='text-3xl text-red font-bold self-start'>Order information:</Text>
              <View className='w-full items-start justify-center gap-2'>
                <Text className='text-xl font-bold self-start'>Order number:</Text>
                <Text className='text-xl text-slate-500 font-semibold self-start'>{orderInfo.orderNumber}</Text>
                <Text className='text-xl font-bold self-start'>Status:</Text>
                <Text className='text-xl text-slate-500 font-semibold self-start'>{orderInfo.status}</Text>
                <Text className='text-xl font-bold self-start'>Total:</Text>
                <Text className='text-xl text-slate-500 font-semibold self-start'>{orderInfo.total} zł</Text>
                <Text className='text-xl font-bold self-start'>Date:</Text>
                <Text className='text-xl text-slate-500 font-semibold self-start'>{orderInfo.date}</Text>
              </View>
              <Text className='text-3xl text-red font-bold self-start'>Ordered products:</Text>
              {orderedProductItems}
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

export default OrderDetails