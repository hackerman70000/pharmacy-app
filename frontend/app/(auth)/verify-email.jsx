import { router, useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native'
import CustomButton from '../../components/CustomButton'
import ToastMessage from '../../components/ToastMessage'
import { API_URL } from '../_layout'

const VerifyEmail = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [toast, setToast] = useState(null)
  const { email, token } = useLocalSearchParams()
  const isWeb = Platform.OS === 'web'

  useEffect(() => {
    if (!email && !token) {
      router.push('/sign-up')
      return
    }

    if (token) {
      verifyToken()
    }
  }, [email, token])

  const verifyToken = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`${API_URL}/auth/verify-email/${token}`)
      const data = await response.json()
      
      if (response.ok) {
        setToast({
          message: 'Email verified successfully! You can now sign in',
          type: 'success'
        })
        setTimeout(() => {
          router.replace('/sign-in')
        }, 2000)
      } else {
        setMessage(`${data.message}! ${data.details}`)
      }
    } catch (err) {
      console.log(err)
      setMessage('Failed to verify email. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }
  
  const resendVerification = () => {
    setIsLoading(true)
    fetch(`${API_URL}/auth/resend-verification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    })
      .then(res => res.json())
      .then(data => {
        setIsLoading(false)
        if (data.message === 'Verification email sent') {
          setToast({
            message: 'Verification email sent! Please check your inbox',
            type: 'success'
          })
        } else {
          setMessage(`${data.message}! ${data.details}`)
        }
      })
      .catch(err => {
        console.log(err)
        setIsLoading(false)
        setToast({
          message: 'Error sending verification email. Please try again later',
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
              <Text className='text-3xl font-bold text-white mb-8 text-center'>Verify Your Email</Text>
              
              {message && (
                <View className='bg-red-500/20 backdrop-blur-sm p-4 rounded-xl mb-6'>
                  <Text className='text-white text-center'>{message}</Text>
                </View>
              )}

              <View className='space-y-6'>
                {token ? (
                  <Text className='text-white text-center text-lg'>
                    Verifying your email...
                  </Text>
                ) : (
                  <>
                    <Text className='text-white text-center text-lg'>
                      We've sent a verification email to:
                    </Text>
                    <Text className='text-emerald-400 text-center text-lg font-semibold'>
                      {email}
                    </Text>
                    <Text className='text-white text-center'>
                      Please check your email and click the verification link to activate your account.
                    </Text>

                    <View className='pt-4'>
                      <Text className='text-white text-center mb-4'>
                        Didn't receive the email?
                      </Text>
                      <CustomButton
                        title='Resend Verification Email'
                        handlePress={resendVerification}
                        containerStyles='bg-emerald-500 py-4 rounded-xl shadow-sm'
                        textStyles='text-white font-semibold text-lg'
                        isLoading={isLoading}
                      />
                    </View>
                  </>
                )}

                <CustomButton
                  title='Back to Sign In'
                  handlePress={() => router.push('/sign-in')}
                  variant='outline'
                  containerStyles='border border-white py-3 rounded-xl mt-4'
                  textStyles='text-white'
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

export default VerifyEmail