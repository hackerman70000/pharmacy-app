import { router, useLocalSearchParams } from 'expo-router';
import { Minus, Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ImageBackground, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ToastMessage from '../../../components/ToastMessage';
import { useGlobalContext } from '../../../context/GlobalProvider';
import { API_URL } from '../../_layout';

const ProductDetails = () => {
  const { productId } = useLocalSearchParams();
  const isWeb = Platform.OS === 'web';
  const { isLoggedIn, state, triggerRefreshViews } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [toast, setToast] = useState(null);
  const [productInfo, setProductInfo] = useState({
    name: '',
    price: 0,
    manufacturer: '',
    description: '',
    imageUrl: '',
  });

  useEffect(() => {
    if (!productId) return;
    
    setIsLoading(true);
    fetch(`${API_URL}/products/${productId}`)
      .then(res => res.json())
      .then(data => {
        setProductInfo({
          name: data.name,
          price: data.price,
          manufacturer: data.manufacturer,
          description: data.description,
          imageUrl: data.image_url
        });
      })
      .catch(() => {
        setToast({
          message: 'Error loading product',
          type: 'error'
        });
      })
      .finally(() => setIsLoading(false));
  }, [productId]);

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      setToast({
        message: 'Please sign in to add items to cart',
        type: 'error'
      });
      setTimeout(() => {
        router.push('/sign-in');
      }, 1500);
      return;
    }

    setIsLoading(true);
    try {
      await fetch(`${API_URL}/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.token}`
        },
        body: JSON.stringify({ product_id: productId, quantity })
      });
      
      triggerRefreshViews();
      setToast({
        message: 'Added to cart',
        type: 'success'
      });
      
      setTimeout(() => {
        router.push('/cart');
      }, 1500);
    } catch (err) {
      setToast({
        message: 'Could not add to cart',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
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
        {toast && (
          <ToastMessage
            message={toast.message}
            type={toast.type}
            onHide={() => setToast(null)}
          />
        )}
        <ScrollView>
          <View className="w-full max-w-xl mx-auto p-5">
            {/* Header with product info */}
            <View className="flex-row justify-between items-center mb-6">
              <View>
                <Text className="text-2xl text-white font-medium">{productInfo.name}</Text>
                <Text className="text-white/60 mt-1">by {productInfo.manufacturer}</Text>
              </View>
              <Text className="text-emerald-400 text-2xl font-medium">
                ${productInfo.price}
              </Text>
            </View>

            {/* Product Image */}
            <View className="bg-black/20 backdrop-blur-sm rounded-xl p-4 mb-4">
              <Image
                source={{ uri: productInfo.imageUrl }}
                className="w-full h-48 rounded-lg bg-white/5"
                resizeMode="contain"
              />
            </View>

            {/* Purchase Controls */}
            <View className="bg-black/20 backdrop-blur-sm rounded-xl p-4 space-y-4">
              <View className="flex-row items-center justify-between">
                <Text className="text-white">Quantity</Text>
                <View className="flex-row items-center gap-4 bg-white/5 rounded-lg px-4 py-2">
                  <TouchableOpacity 
                    onPress={() => setQuantity(q => Math.max(1, q - 1))}
                    disabled={quantity === 1}
                  >
                    <Minus size={18} color={quantity === 1 ? "#666666" : "#FFFFFF"} />
                  </TouchableOpacity>
                  <Text className="text-white text-lg min-w-[24px] text-center">
                    {quantity}
                  </Text>
                  <TouchableOpacity 
                    onPress={() => setQuantity(q => Math.min(999, q + 1))}
                    disabled={quantity === 999}
                  >
                    <Plus size={18} color={quantity === 999 ? "#666666" : "#FFFFFF"} />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity 
                onPress={handleAddToCart}
                className="bg-emerald-500 py-3 rounded-lg"
              >
                <Text className="text-white text-center text-lg">
                  Add to Cart
                </Text>
              </TouchableOpacity>
            </View>

            {/* Product Description */}
            {productInfo.description && (
              <View className="bg-black/20 backdrop-blur-sm rounded-xl p-4 mt-4">
                <Text className="text-lg text-white mb-2">About this product</Text>
                <Text className="text-white/80 leading-relaxed">
                  {productInfo.description}
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
        
        {isLoading && (
          <View className="absolute inset-0 bg-black/20 items-center justify-center">
            <ActivityIndicator color="#FFFFFF" />
          </View>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
};

export default ProductDetails;