import { View, Text, ScrollView, ActivityIndicator, Alert, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router'
import CartItem from '../../components/CartItem'
import { useGlobalContext } from '../../context/GlobalProvider'
import { API_URL } from '../_layout'
import CustomButton from '../../components/CustomButton'

const Cart = () => {

  const router = useRouter()

  const isWeb = Platform.OS === 'web'

	const { isLoggedIn, state, refreshViews, triggerRefreshViews } = useGlobalContext()

  const [isLoading, setIsLoading] = useState(false)

	const [products, setProducts] = useState([])

  const [total, setTotal] = useState('')


  useEffect(() => {

    setIsLoading(true)

    if (!isLoggedIn) {

      if (isWeb)
        window.location.href = '/home'
      else 
        router.replace('/home');

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
        setProducts(data.items)
        setTotal(data.total.toString())
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

  const handleDelete = (cartId, quantity, showAlert) => {

    if (showAlert) {

      const message = "Are you sure you want to remove this product from cart?"

      if (isWeb) {
        const confirm = window.confirm(message)

        if (confirm) {
          setIsLoading(true)
  
          fetch(`${API_URL}/cart/remove/${cartId}?quantity=${quantity}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${state.token}`
            },
          }).then(res => res.json())
            .then(data => {
              triggerRefreshViews()
            })
            .catch(err => {
              console.log(err)

              const errorMessage = 'Internal Server Error. Try again later'
              if (isWeb) {
                window.alert(errorMessage)
              } else {
                Alert.alert(errorMessage)
              }
            })

          setIsLoading(false)
        }
      } else {
        Alert.alert(
          "Remove Product",
          message,
          [
            {
              text: "No",
              onPress: () => {}
            },
            {
              text: "Yes",
              onPress: () => {
                setIsLoading(true)
  
                fetch(`${API_URL}/cart/remove/${cartId}?quantity=${quantity}`, {
                  method: 'DELETE',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${state.token}`
                  },
                }).then(res => res.json())
                  .then(data => {
                    triggerRefreshViews()
                  })
                  .catch(err => {
                    console.log(err)
                    
                    const errorMessage = 'Internal Server Error. Try again later'
                    if (isWeb) {
                      window.alert(errorMessage)
                    } else {
                      Alert.alert(errorMessage)
                    }
                  })
  
                setIsLoading(false)
              }
            },
          ],
          { cancelable: true }
        );
      }


    } else {

      setIsLoading(true)

      fetch(`${API_URL}/cart/remove/${cartId}?quantity=${quantity}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.token}`
        },
      }).then(res => res.json())
        .then(data => {
          triggerRefreshViews()
        })
        .catch(err => {
          console.log(err)

          const errorMessage = 'Internal Server Error. Try again later'
          if (isWeb) {
            window.alert(message)
          } else {
            Alert.alert(message)
          }
        })

        setIsLoading(false)

    }

  }

  const handleAdd = (productId) => {
    
    setIsLoading(true)

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
      .then(data => {

        triggerRefreshViews();

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

  }

  const handleCheckout = () => {

    const message = "Are you sure you want to checkout?"

    if (isWeb) {
      const confirm = window.confirm(message)

      if (confirm) {
        setIsLoading(true)
  
        fetch(`${API_URL}/payment/checkout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${state.token}`
          },
        }).then(res => res.json())
          .then(data => {
    
            triggerRefreshViews();

            const infoMessage = 'Checkout successful. Check your email for order details or go to Profile'

            if (isWeb) {
              window.alert(infoMessage)
            } else {
              Alert.alert(infoMessage);
            }
    
          })
          .catch(err => {
            console.log(err)

            const errorMesssage = 'Internal Server Error. Try again later'
            if (isWeb) {
              window.alert(errorMesssage)
            } else {
              Alert.alert(errorMesssage)
            }
          })

          setIsLoading(false)
      }
    } else {
      Alert.alert(
        "Confirm Checkout",
        message,
        [
          {
            text: "No",
            onPress: () => {}
          },
          {
            text: "Yes",
            onPress: () => {
              setIsLoading(true)
  
              fetch(`${API_URL}/payment/checkout`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${state.token}`
                },
              }).then(res => res.json())
                .then(data => {
          
                  triggerRefreshViews();

                  const infoMessage = 'Checkout successful. Check your email for order details or go to Profile'

                  if (isWeb) {
                    window.alert(infoMessage)
                  } else {
                    Alert.alert(infoMessage);
                  }
          
                })
                .catch(err => {
                  console.log(err)

                  const errorMesssage = 'Internal Server Error. Try again later'
                  if (isWeb) {
                    window.alert(errorMesssage)
                  } else {
                    Alert.alert(errorMesssage)
                  }
                })
  
                setIsLoading(false)
            }
          },
        ],
        { cancelable: true }
      );
    }


  }

  const cartItems = products.map(product => (
    <CartItem
      key={product.id}
      cartId={product.id}
      name={product.product.name}
      price={product.product.price}
      quantity={product.quantity}
      image={product.product.image_url}
      handleDelete={(quantity, showAlert) => handleDelete(product.id, quantity, showAlert)}
      handleAdd={() => handleAdd(product.product.id)}
    />
  ))

  return (
    <SafeAreaView className='bg-slate-100 h-full'>
        <ScrollView>
            <View className='w-full items-center justify-center h-full gap-6 pt-4 px-8 max-w-[1000px] self-center'>
              <Text className='text-3xl text-red font-bold self-start'>Your cart:</Text>
              {cartItems}
              {products.length === 0 ?
                <Text className='text-xl text-slate-500 font-semibold text-center'>Add products to cart and they will appear here!</Text>
                :
                <View className='w-full items-center justify-center gap-6'>
                  <View className='w-full items-center justify-end flex-row'>
                    <Text className='text-xl font-semibold'>Total: </Text>
                    <Text className='text-xl text-green-500 font-semibold ml-auto'>{total} zł</Text>
                  </View>
                  <CustomButton
                    title='Checkout'
                    handlePress={handleCheckout}
                    containerStyles='w-full'
                  />
                </View>
              }
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

export default Cart