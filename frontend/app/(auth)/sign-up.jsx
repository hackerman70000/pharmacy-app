import { Link, router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native'
import CustomButton from '../../components/CustomButton'
import FormField from '../../components/FormField'
import ToastMessage from '../../components/ToastMessage'
import { useGlobalContext } from '../../context/GlobalProvider'
import { API_URL } from '../_layout'

const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const isWeb = Platform.OS === 'web'
  const [isSubmitting, setisSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [toast, setToast] = useState(null)
  const { isLoggedIn } = useGlobalContext()

  useEffect(() => {
    if (isLoggedIn) {
      if (isWeb)
        window.location.href = '/home'
      else 
        router.replace('/home');
    }
  }, [])

  const register = () => {
    setIsLoading(true)
    fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    }).then(res => res.json())
      .then(data => {
        setIsLoading(false)
        if (data.message == 'Registration successful') {
          setToast({
            message: 'Account created successfully',
            type: 'success'
          })
          setTimeout(() => {
            router.replace(`/sign-in?username=${form.username}`)
          }, 1500)
        } else {
          setMessage(`${data.message}! ${data.details}`)
          setForm({
            ...form,
            password: ''
          })
        }
      })
      .catch(err => {
        console.log(err)
        setIsLoading(false)
        setForm({
          username: '',
          email: '',
          password: ''
        })
        setToast({
          message: 'Error creating account. Please try again later',
          type: 'error'
        })
      })
  }

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
      <KeyboardAvoidingView
        className='h-full'
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View className='absolute inset-0 bg-black/60' />
        {toast && (
          <ToastMessage
            message={toast.message}
            type={toast.type}
            onHide={() => setToast(null)}
          />
        )}
        <ScrollView>
          <View className='w-full justify-center min-h-[85vh] px-6 my-6 max-w-[500px] self-center'>
            <View className='bg-black/20 backdrop-blur-sm p-8 rounded-3xl'>
              <Text className='text-3xl font-bold text-white mb-8 text-center'>Sign Up to Your Pharmacy</Text>
              
              {message && (
                <View className='bg-red-500/20 backdrop-blur-sm p-4 rounded-xl mb-6'>
                  <Text className='text-white text-center'>{message}</Text>
                </View>
              )}

              <View className='space-y-6'>
                <View>
                  <Text className='text-white mb-1'>Username</Text>
                  <FormField
                    value={form.username}
                    handleChangeText={e => setForm({...form, username: e})}
                    placeholder="Enter your username"
                    containerStyle='bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4'
                    inputStyle='text-white placeholder:text-white/50'
                  />
                </View>

                <View>
                  <Text className='text-white mb-1'>Email</Text>
                  <FormField
                    value={form.email}
                    handleChangeText={e => setForm({...form, email: e})}
                    placeholder="Enter your email"
                    keyboardType='email-address'
                    containerStyle='bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4'
                    inputStyle='text-white placeholder:text-white/50'
                  />
                </View>
                
                <View>
                  <Text className='text-white mb-2'>Password</Text>
                  <FormField
                    value={form.password}
                    handleChangeText={e => setForm({...form, password: e})}
                    placeholder="Enter your password"
                    secureTextEntry={true}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    containerStyle='bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4'
                    inputStyle='text-white placeholder:text-white/50'
                  />
                </View>

                <CustomButton
                  title='Sign Up'
                  handlePress={register}
                  containerStyles='bg-emerald-500 py-4 rounded-xl shadow-sm'
                  textStyles='text-white font-semibold text-lg'
                  isLoading={isSubmitting}
                />

                <View className='flex-row justify-center items-center gap-2 mt-4'>
                  <Text className='text-white'>
                    Already have an account?
                  </Text>
                  <Link href='/sign-in' className='text-emerald-400 font-semibold'>
                    Sign In
                  </Link>
                </View>

                <CustomButton
                  title='Go back to Home'
                  handlePress={() => router.push('/home')}
                  variant='outline'
                  containerStyles='border border-white py-3 rounded-xl mt-4'
                  textStyles='text-white'
                  isLoading={isSubmitting}
                />
              </View>
            </View>
          </View>
        </ScrollView>
        
        {isLoading && (
          <View className="absolute inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center">
            <ActivityIndicator size="large" color="#FFFFFF" />
          </View>
        )}
      </KeyboardAvoidingView>
    </ImageBackground>
  )
}

export default SignUp