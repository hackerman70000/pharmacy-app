import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ImageBackground, Platform, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Item from '../../../components/Item';
import { API_URL } from '../../_layout';

const Home = () => {
  const isWeb = Platform.OS === 'web';
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${API_URL}/products/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(res => res.json())
      .then(data => {
        setProducts(data);
      })
      .catch(err => {
        console.log(err);
        const message = 'Internal Server Error. Try again later';
        if (isWeb) {
          window.alert(message);
        } else {
          Alert.alert(message);
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

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
          <View className="w-full px-6 pt-8">
            <Text className="text-4xl font-bold text-white text-center">Your Pharmacy</Text>
          </View>

          <View className="w-full justify-center min-h-[85vh] px-6 my-6 max-w-[1200px] self-center">
            <View className="bg-black/20 backdrop-blur-sm p-8 rounded-3xl">
              <Text className="text-2xl font-medium text-white mb-8">
                {products.length > 0 ? 'Available Products' : 'No products available'}
              </Text>
              
              <View className="flex-row flex-wrap justify-center md:justify-start gap-4">
                {products.map(product => (
                  <Item
                    key={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.image_url}
                    onClick={() => router.push(`product-details?productId=${product.id}`)}
                  />
                ))}
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

export default Home;