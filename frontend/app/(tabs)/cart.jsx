import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ImageBackground, Platform, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CartItem from '../../components/CartItem';
import CustomButton from '../../components/CustomButton';
import { useGlobalContext } from '../../context/GlobalProvider';
import { API_URL } from '../_layout';

const Cart = () => {
  const router = useRouter();
  const isWeb = Platform.OS === 'web';
  const { isLoggedIn, state, refreshViews, triggerRefreshViews } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState('');

  useEffect(() => {
    setIsLoading(true);
    if (!isLoggedIn) {
      if (isWeb) window.location.href = '/home';
      else router.replace('/home');
      return;
    }

    fetch(`${API_URL}/cart/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.token}`
      },
    }).then(res => res.json())
      .then(data => {
        setProducts(data.items);
        setTotal(data.total.toString());
      })
      .catch(err => {
        console.log(err);
        const message = 'Internal Server Error. Try again later';
        if (isWeb) window.alert(message);
        else Alert.alert(message);
      });

    setIsLoading(false);
  }, [refreshViews]);

  const handleDelete = (cartId, quantity, showAlert) => {
    if (showAlert) {
      const message = "Are you sure you want to remove this product from cart?";
      if (isWeb) {
        const confirm = window.confirm(message);
        if (confirm) deleteItem(cartId, quantity);
      } else {
        Alert.alert(
          "Remove Product",
          message,
          [
            { text: "No", onPress: () => {} },
            { text: "Yes", onPress: () => deleteItem(cartId, quantity) }
          ],
          { cancelable: true }
        );
      }
    } else {
      deleteItem(cartId, quantity);
    }
  };

  const deleteItem = (cartId, quantity) => {
    setIsLoading(true);
    fetch(`${API_URL}/cart/remove/${cartId}?quantity=${quantity}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.token}`
      },
    }).then(res => res.json())
      .then(() => triggerRefreshViews())
      .catch(err => {
        console.log(err);
        const message = 'Internal Server Error. Try again later';
        if (isWeb) window.alert(message);
        else Alert.alert(message);
      })
      .finally(() => setIsLoading(false));
  };

  const handleAdd = (productId) => {
    setIsLoading(true);
    fetch(`${API_URL}/cart/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.token}`
      },
      body: JSON.stringify({
        product_id: productId,
        quantity: 1
      })
    }).then(res => res.json())
      .then(() => triggerRefreshViews())
      .catch(err => {
        console.log(err);
        const message = 'Internal Server Error. Try again later';
        if (isWeb) window.alert(message);
        else Alert.alert(message);
      })
      .finally(() => setIsLoading(false));
  };

  const handleCheckout = () => {
    const message = "Are you sure you want to checkout?";
    if (isWeb) {
      const confirm = window.confirm(message);
      if (confirm) processCheckout();
    } else {
      Alert.alert(
        "Confirm Checkout",
        message,
        [
          { text: "No", onPress: () => {} },
          { text: "Yes", onPress: () => processCheckout() }
        ],
        { cancelable: true }
      );
    }
  };

  const processCheckout = () => {
    setIsLoading(true);
    fetch(`${API_URL}/payment/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.token}`
      },
    }).then(res => res.json())
      .then(() => {
        triggerRefreshViews();
        const infoMessage = 'Checkout successful. Check your email for order details or go to Profile';
        if (isWeb) window.alert(infoMessage);
        else Alert.alert(infoMessage);
      })
      .catch(err => {
        console.log(err);
        const message = 'Internal Server Error. Try again later';
        if (isWeb) window.alert(message);
        else Alert.alert(message);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <ImageBackground 
      source={require('../../assets/images/index-background.jpg')}
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
              <Text className="text-3xl font-bold text-white mb-8">Your Cart</Text>
              
              {products.length === 0 ? (
                <View className="bg-white/5 backdrop-blur-sm rounded-2xl p-8">
                  <Text className="text-xl text-white/60 text-center">
                    Add products to cart and they will appear here!
                  </Text>
                </View>
              ) : (
                <>
                  {/* Cart Items */}
                  <View className="space-y-4 mb-8">
                    {products.map(product => (
                      <CartItem
                        key={product.id}
                        cartId={product.id}
                        name={product.product.name}
                        price={product.product.price}
                        quantity={product.quantity}
                        image={product.product.image_url}
                        handleDelete={(quantity, showAlert) => 
                          handleDelete(product.id, quantity, showAlert)}
                        handleAdd={() => handleAdd(product.product.id)}
                      />
                    ))}
                  </View>

                  {/* Cart Summary */}
                  <View className="bg-white/5 backdrop-blur-sm rounded-2xl p-6">
                    <View className="flex-row justify-between items-center mb-6">
                      <Text className="text-white/60 text-lg">Subtotal</Text>
                      <Text className="text-white text-lg">${total}</Text>
                    </View>
                    
                    <View className="flex-row justify-between items-center mb-6">
                      <Text className="text-white/60 text-lg">Shipping</Text>
                      <Text className="text-white text-lg">Free</Text>
                    </View>

                    <View className="h-px bg-white/10 mb-6" />
                    
                    <View className="flex-row justify-between items-center mb-6">
                      <Text className="text-white text-xl font-medium">Total</Text>
                      <Text className="text-emerald-400 text-xl font-bold">
                        ${total}
                      </Text>
                    </View>

                    <CustomButton
                      title="Checkout"
                      handlePress={handleCheckout}
                      containerStyles="bg-emerald-500 py-4 rounded-xl"
                      textStyles="text-white font-semibold text-lg text-center"
                    />
                  </View>
                </>
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

export default Cart;