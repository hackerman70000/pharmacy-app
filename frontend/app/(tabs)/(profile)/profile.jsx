import { View, Text, ScrollView, Alert, ActivityIndicator, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useEffect, useState } from 'react'
import { router } from 'expo-router'
import OrderItem from '../../../components/OrderItem'
import { API_URL } from '../../_layout'
import { useGlobalContext } from '../../../context/GlobalProvider'
import CustomButton from '../../../components/CustomButton'
import { icons } from '../../../constants'
import ImageButton from '../../../components/ImageButton'

const Profile = () => {

  const [orders, setOrders] = useState([])

  const isWeb = Platform.OS === 'web'

  const [profileInfo, setProfileInfo] = useState({
    username: '',
    email: '',
  })

  const [isLoading, setIsLoading] = useState(false)

  const { isLoggedIn, setIsLoggedIn, state, setState, refreshViews } = useGlobalContext()

  useEffect(() => {

    if (!isLoggedIn) return;

    setIsLoading(true)

    fetch(`${API_URL}/auth/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.token}`
      },
    }).then(res => res.json())
      .then(data => {
        setProfileInfo({
          username: data.username,
          email: data.email,
        })
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

    fetch(`${API_URL}/payment/orders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.token}`
      },
    }).then(res => res.json())
      .then(data => {
        setOrders(data.orders)
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

  const handleSignOut = () => {

    const message = "Are you sure you want to sign out?"

    if (isWeb) {
      const confirm = window.confirm(message)

      if (confirm) {
        setIsLoggedIn(false)
        setState({
          token: '',
        })
    
        router.replace('/home')
      }
    } else {
      Alert.alert(
        "Confirm SignOut",
        message,
        [
          {
            text: "No",
            onPress: () => {}
          },
          {
            text: "Yes",
            onPress: () => {
              setIsLoggedIn(false)
              setState({
                token: '',
              })
          
              router.replace('/home')
            }
          },
        ],
        { cancelable: true }
      );
    }
  }

  const orderItems = orders.map(order => (
    <OrderItem
      key={order.id}
      orderId={order.order_number}
      status={order.status}
      total={order.amount}
      date={formatDate(order.created_at)}
      onClick={() => router.push(`order-details?orderId=${order.id}`)}
    />
  ))

  return (
    <SafeAreaView className='bg-slate-100 h-full'>
        <ScrollView contentContainerStyle={!isLoggedIn && {height: '100%'}}>
            {isLoggedIn ?
              <View className='w-full items-center justify-center h-full gap-6 pt-4 px-8 max-w-[1000px] self-center'>
                <View className='w-full flex-row items-center justify-between'>
                  <Text className='text-3xl text-red font-bold self-start'>Your profile:</Text>
                  <ImageButton
                      image={icons.logout}
                      imageStyles={`${isWeb && 'max-w-8 max-h-8'} w-8 h-8`}
                      containerStyles={'-mb-5'}
                      handlePress={handleSignOut}
                  />
                </View>
                <View className='w-full items-start justify-center gap-2'>
                  <Text className='text-xl font-bold self-start'>Username:</Text>
                  <Text className='text-xl text-slate-500 font-semibold self-start'>{profileInfo.username}</Text>
                  <Text className='text-xl font-bold self-start'>Email:</Text>
                  <Text className='text-xl text-slate-500 font-semibold self-start'>{profileInfo.email}</Text>
                </View>
                <Text className='text-3xl text-red font-bold self-start'>Your orders:</Text>
                {orderItems}
                {orders.length === 0 &&
                  <Text className='text-xl text-slate-500 font-semibold text-center'>Place your first order and it will appear here!</Text>
                }
              </View>
              :
              <View className='w-full items-center justify-center h-full gap-2 max-w-[1000px] self-center'>
                <CustomButton
                    title='Sign in'
                    containerStyles={'w-[200px]'}
                    textStyles={'text-xl'}
                    handlePress={() => router.push('/sign-in')}
                />
              </View>}
        </ScrollView>
        {isLoading && (
          <View className="absolute inset-0 bg-slate-700/50 flex justify-center items-center">
            <ActivityIndicator size="large" color="#ffffff" />
          </View>
        )}
    </SafeAreaView>
  )
}

export default Profile

export const formatDate = (initialDate) => {
  const date = new Date(initialDate);

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  const formattedDate = `${hours}:${minutes} ${day}-${month}-${year}`;

  return formattedDate;
}