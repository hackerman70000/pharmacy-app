import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native'

import { Link, router, useLocalSearchParams } from 'expo-router'
import CustomButton from '../../components/CustomButton'
import FormField from '../../components/FormField'
import { useGlobalContext } from '../../context/GlobalProvider'
import { API_URL } from '../_layout'

const SignIn = () => {
  const [form, setForm] = useState({
    username: '',
    password: ''
  })

  const isWeb = Platform.OS === 'web'

  const [isSubmitting, setisSubmitting] = useState(false)

  const [message, setMessage] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const { isLoggedIn, setIsLoggedIn, setState } = useGlobalContext()

  const { username } = useLocalSearchParams()

  useEffect(() => {

    if (isLoggedIn) {
      if (isWeb)
        window.location.href = '/home'
      else 
        router.replace('/home');
    }

    if (username) {
      setForm({
        ...form,
        username
      })
    }
  }, [])

  const submit = () => {

    setIsLoading(true)
    
    fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    }).then(res => res.json())
      .then(data => {
        setIsLoading(false)

        if (data.token) {
          setIsLoggedIn(true)
          setState({
            token: data.token,
          })
          setMessage('')
          router.replace('/home')
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
          password: ''
        })

        const message = 'Internal Server Error. Try again later'
        if (isWeb) {
          window.alert(message)
        } else {
          Alert.alert(message)
        }
      })
  }

  return (
    <KeyboardAvoidingView
      className='bg-primary h-full bg-slate-100'
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView>
        <View className='w-full justify-center min-h-[85vh] px-8 my-6 max-w-[800px] self-center'>
          <Text className='text-2xl text-red mt-10 font-psemibold'>Log in to Your Pharmacy</Text>
          <Text className='text-lg text-red text-center font-bold -mb-5 mt-2'>{message}</Text>
          <FormField
            title='Username'
            value={form.username}
            handleChangeText={e => setForm({...form, username: e})}
            otherStyles='mt-7'
          />
          <FormField
            title='Password'
            value={form.password}
            handleChangeText={e => setForm({...form, password: e})}
            otherStyles='mt-7'
          />
          <CustomButton
            title='Sign In'
            handlePress={submit}
            containerStyles='mt-7'
            isLoading={isSubmitting}
          />
          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-lg text-red font-pregular'>
              Don't have an account?
            </Text>
            <Link href='/sign-up' className='text-lg font-bold text-secondary'>
              Sign Up
            </Link>
          </View>
          <CustomButton
            title='Go back to Home'
            handlePress={() => router.push('/home')}
            containerStyles='mt-7 w-48 self-center'
            isLoading={isSubmitting}
          />
        </View>
      </ScrollView>
      {isLoading && (
        <View className="absolute inset-0 bg-slate-700/50 flex justify-center items-center">
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      )}
    </KeyboardAvoidingView>
  )
}

export default SignIn