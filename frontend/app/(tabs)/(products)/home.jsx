import { router } from 'expo-router';
import { Grid, List } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ImageBackground, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Item from '../../../components/Item';
import ListItem from '../../../components/ListItem';
import ToastMessage from '../../../components/ToastMessage';
import { useGlobalContext } from '../../../context/GlobalProvider';
import { API_URL } from '../../_layout';

const Home = () => {
  const isWeb = Platform.OS === 'web';
  const { isLoggedIn, state, triggerRefreshViews } = useGlobalContext();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState('list');
  const [toast, setToast] = useState(null);

  const handleAddToCart = async (productId) => {
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
        body: JSON.stringify({ product_id: productId, quantity: 1 })
      });
      triggerRefreshViews();
      setToast({
        message: 'Added to cart',
        type: 'success'
      });
    } catch (err) {
      setToast({
        message: 'Could not add to cart',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

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
        setToast({
          message: 'Error loading products',
          type: 'error'
        });
      })
      .finally(() => setIsLoading(false));
  }, []);

  const toggleViewMode = () => {
    setViewMode(viewMode === 'grid' ? 'list' : 'grid');
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
          <View className="w-full px-6 pt-8">
            <Text className="text-4xl font-bold text-white text-center">Your Pharmacy</Text>
          </View>

          <View className="w-full justify-center min-h-[85vh] px-6 my-6 max-w-[1000px] self-center">
            <View className="bg-black/20 backdrop-blur-sm p-6 rounded-3xl">
              <View className="flex-row justify-between items-center mb-8">
                <Text className="text-2xl font-medium text-white">
                  {products.length > 0 ? 'Available Products' : 'No products available'}
                </Text>
                <TouchableOpacity 
                  onPress={toggleViewMode}
                  activeOpacity={0.7}
                >
                  {viewMode === 'grid' ? (
                    <List size={24} color="#FFFFFF" />
                  ) : (
                    <Grid size={24} color="#FFFFFF" />
                  )}
                </TouchableOpacity>
              </View>
              
              {viewMode === 'grid' ? (
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
              ) : (
                <View className="space-y-4">
                  {products.map(product => (
                    <ListItem
                      key={product.id}
                      name={product.name}
                      price={product.price}
                      image={product.image_url}
                      manufacturer={product.manufacturer}
                      onClick={() => router.push(`product-details?productId=${product.id}`)}
                      onAddToCart={() => handleAddToCart(product.id)}
                    />
                  ))}
                </View>
              )}
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