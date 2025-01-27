import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, ImageBackground, Platform, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../../../components/CustomButton'
import IconButton from '../../../components/IconButton'
import OrderItem from '../../../components/OrderItem'
import ToastMessage from '../../../components/ToastMessage'
import { useGlobalContext } from '../../../context/GlobalProvider'
import { API_URL } from '../../_layout'

const formatDate = (initialDate) => {
  const date = new Date(initialDate);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  
  return `${hours}:${minutes} ${day}-${month}-${year}`;
}

const Profile = () => {
  const [orders, setOrders] = useState([])
  const isWeb = Platform.OS === 'web'
  const [profileInfo, setProfileInfo] = useState({
    username: '',
    email: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [toast, setToast] = useState(null)
  const { isLoggedIn, setIsLoggedIn, state, setState, refreshViews } = useGlobalContext()

  useEffect(() => {
    if (!isLoggedIn) return;
    setIsLoading(true)

    Promise.all([
      fetch(`${API_URL}/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${state.token}`
        },
      }).then(res => res.json()),
      fetch(`${API_URL}/payment/orders`, {
        headers: {
          'Authorization': `Bearer ${state.token}`
        },
      }).then(res => res.json())
    ])
    .then(([profileData, ordersData]) => {
      setProfileInfo({
        username: profileData.username,
        email: profileData.email,
      })
      setOrders(ordersData.orders)
      setIsLoading(false)
    })
    .catch(err => {
      console.log(err)
      setIsLoading(false)
      setToast({
        message: 'Error loading profile data',
        type: 'error'
      })
    })
  }, [refreshViews])

  const handleSignOut = () => {
    setToast({
      message: 'Signing out...',
      type: 'success'
    })
    setTimeout(() => {
      setIsLoggedIn(false)
      setState({ token: '' })
      router.replace('/home')
    }, 1000)
  }

  return (
    <ImageBackground 
      source={require('../../../assets/images/index-background.jpg')}
      resizeMode="cover"
      style={{
        flex: 1,
        width: '100%',
        height: '100%'
      }}
    >
      <SafeAreaView className='h-full'>
        <View className='absolute inset-0 bg-black/60' />
        {toast && (
          <ToastMessage
            message={toast.message}
            type={toast.type}
            onHide={() => setToast(null)}
          />
        )}
        <ScrollView contentContainerStyle={!isLoggedIn && {height: '100%'}}>
          {isLoggedIn ? (
            <View className='w-full justify-center min-h-[85vh] px-6 my-6 max-w-[800px] self-center'>
              <View className='bg-black/20 backdrop-blur-sm p-8 rounded-3xl'>
                <View className='flex-row justify-between items-center mb-6'>
                  <Text className='text-3xl font-bold text-white'>Profile</Text>
                  <IconButton
                    icon="logout"
                    size={32}
                    color="#10B981"
                    handlePress={handleSignOut}
                  />
                </View>

                <View className='space-y-6'>
                  {/* User Info Banner */}
                  <View className='bg-emerald-600/20 backdrop-blur-sm rounded-3xl p-8'>
                    <View className='flex-row items-center gap-6'>
                      <View className='h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm items-center justify-center'>
                        <Text className='text-white text-2xl font-bold'>{profileInfo.username[0]?.toUpperCase()}</Text>
                      </View>
                      <View>
                        <Text className='text-white text-2xl font-bold'>{profileInfo.username}</Text>
                        <Text className='text-white/70'>{profileInfo.email}</Text>
                      </View>
                    </View>
                  </View>

                  {/* Orders Panel */}
                  <View className='bg-white/10 backdrop-blur-sm rounded-3xl'>
                    <View className='p-6 border-b border-white/10 flex-row justify-between items-center'>
                      <Text className='text-xl font-bold text-white'>Recent Orders</Text>
                      <View className='bg-white/10 px-3 py-1 rounded-full'>
                        <Text className='text-white/80 text-sm'>{orders.length} total</Text>
                      </View>
                    </View>
                    <View className='p-4 space-y-4'>
                      {orders.map(order => (
                        <OrderItem
                          key={order.id}
                          orderId={order.order_number}
                          status={order.status}
                          total={order.amount}
                          date={formatDate(order.created_at)}
                          onClick={() => router.push(`order-details?orderId=${order.id}`)}
                        />
                      ))}
                      {orders.length === 0 && (
                        <View className='py-12 px-6'>
                          <Text className='text-white/80 text-center text-lg'>No orders found</Text>
                          <Text className='text-white/60 text-center mt-2'>Start shopping to see your orders here</Text>
                        </View>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ) : (
            <View className='flex-1 items-center justify-center p-6'>
              <View className='bg-black/20 backdrop-blur-sm p-8 rounded-3xl w-full max-w-[400px]'>
                <Text className='text-2xl font-bold text-white text-center mb-6'>
                  Sign in to view your profile
                </Text>
                <CustomButton
                  title='Sign in'
                  containerStyles='bg-emerald-500 py-4 rounded-xl shadow-sm'
                  textStyles='text-white font-semibold text-lg'
                  handlePress={() => router.push('/sign-in')}
                />
              </View>
            </View>
          )}
        </ScrollView>
        
        {isLoading && (
          <View className="absolute inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center">
            <ActivityIndicator size="large" color="#FFFFFF" />
          </View>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Profile;