import { View, Text, Image, Platform } from 'react-native'
import { Tabs, Redirect } from 'expo-router'
import icons from '../../constants/icons'
import { useGlobalContext } from '../../context/GlobalProvider'

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className='items-center justify-center gap-2 w-16'>
      <Image
        source={icon}
        resizeMode='contain'
        tintColor={color}
        className='w-6 h-6 max-w-[50px] max-h-[50px]'
      />
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{color: color}}>
        {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {

  const { isLoggedIn } = useGlobalContext()

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#d72638',
          tabBarInactiveTintColor: '#000000',
          tabBarStyle: {
            backgroundColor: '#ffffff',
            borderTopWidth: 1,
            borderTopColor: '#ffffff',
            height: Platform.OS === 'web' ? 120 : 84,
            paddingTop: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 2,
          }
        }}
      >
        <Tabs.Screen name='(products)' options={{
          title: 'Home',
          href: '/home',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.home}
              color={color}
              name='Home'
              focused={focused}
            />
          )
        }} />
        <Tabs.Screen name='cart' options={{
          title: 'Cart',
          href: isLoggedIn ? '/cart' : null,
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.cart}
              color={color}
              name='Cart'
              focused={focused}
            />
          )
        }} />
        <Tabs.Screen name='(profile)' options={{
          title: 'Profile',
          href: '/profile',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.profile}
              color={color}
              name='Profile'
              focused={focused}
            />
          )
        }} />
      </Tabs>
    </>
  )
}

export default TabsLayout