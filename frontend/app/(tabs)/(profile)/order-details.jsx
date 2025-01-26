import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ImageBackground, Platform, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import OrderedProductItem from '../../../components/OrderedProductItem';
import { useGlobalContext } from '../../../context/GlobalProvider';
import { API_URL } from '../../_layout';

const formatDate = (initialDate) => {
  const date = new Date(initialDate);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  
  return `${hours}:${minutes} ${day}-${month}-${year}`;
};

const OrderDetails = () => {
  const { orderId } = useLocalSearchParams();
  const isWeb = Platform.OS === 'web';
  const { state, isLoggedIn, refreshViews } = useGlobalContext();
  const [orderInfo, setOrderInfo] = useState({
    orderNumber: '',
    status: '',
    total: 0,
    date: '',
  });
  const [orderedProducts, setOrderedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      if (isWeb)
        window.location.href = '/home';
      else 
        router.replace('/home');
      return;
    }

    setIsLoading(true);
    fetch(`${API_URL}/payment/orders/${orderId}`, {
      headers: {
        'Authorization': `Bearer ${state.token}`
      },
    }).then(res => res.json())
      .then(data => {
        setOrderInfo({
          orderNumber: data.order.order_number,
          status: data.order.status,
          total: data.order.amount,
          date: formatDate(data.order.created_at)
        });
        setOrderedProducts(data.order.items);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
        const message = 'Internal Server Error. Try again later';
        if (isWeb) {
          window.alert(message);
        } else {
          Alert.alert(message);
        }
      });
  }, [refreshViews]);

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'completed':
        return 'text-emerald-400';
      case 'pending':
        return 'text-amber-400';
      case 'processing':
        return 'text-blue-400';
      case 'cancelled':
        return 'text-red-400';
      default:
        return 'text-white';
    }
  };

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
      <SafeAreaView className="h-full">
        <View className="absolute inset-0 bg-black/60" />
        <ScrollView>
          <View className="w-full justify-center min-h-[85vh] px-6 my-6 max-w-[800px] self-center">
            <View className="bg-black/20 backdrop-blur-sm p-8 rounded-3xl">
              {/* Order Header */}
              <View className="flex flex-row justify-between items-center mb-8">
                <View>
                  <Text className="text-3xl font-bold text-white">Order #{orderInfo.orderNumber}</Text>
                  <Text className="text-white/60 mt-2">{orderInfo.date}</Text>
                </View>
                <Text className={`text-lg font-medium ${getStatusColor(orderInfo.status)}`}>
                  {orderInfo.status}
                </Text>
              </View>
              
              {/* Order Summary Card */}
              <View className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 mb-8">
                <Text className="text-xl font-bold text-white mb-4">Order Summary</Text>
                <View className="space-y-3">
                  <View className="flex flex-row justify-between">
                    <Text className="text-white/60">Subtotal</Text>
                    <Text className="text-white">${orderInfo.total}</Text>
                  </View>
                  <View className="flex flex-row justify-between">
                    <Text className="text-white/60">Shipping</Text>
                    <Text className="text-white">Free</Text>
                  </View>
                  <View className="h-px bg-white/10 my-2" />
                  <View className="flex flex-row justify-between">
                    <Text className="text-white font-medium">Total</Text>
                    <Text className="text-emerald-400 font-bold text-lg">
                      ${orderInfo.total}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Ordered Products */}
              <View>
                <Text className="text-xl font-bold text-white mb-4">Ordered Products</Text>
                <View className="space-y-4">
                  {orderedProducts.map(product => (
                    <OrderedProductItem
                      key={product.product_id}
                      name={product.name}
                      quantity={product.quantity}
                      price={product.unit_price}
                      total={product.total}
                      image={product.image_url}
                      onClick={() => router.push(`product-details?productId=${product.product_id}`)}
                    />
                  ))}
                </View>
              </View>
            </View>
          </View>
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

export default OrderDetails;