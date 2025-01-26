import { Tabs } from 'expo-router'
import { Home, ShoppingCart, User } from 'lucide-react'
import { Platform, Text, View } from 'react-native'
import { useGlobalContext } from '../../context/GlobalProvider'

const TabIcon = ({ icon: Icon, color, name, focused }) => {
  return (
    <View className='items-center justify-center gap-2 w-16'>
      <Icon size={24} color={color} />
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{color}}>
        {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {
  const { isLoggedIn } = useGlobalContext()

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#10B981',
        tabBarInactiveTintColor: '#1E293B',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#F1F5F9',
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
            icon={Home}
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
            icon={ShoppingCart}
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
            icon={User}
            color={color}
            name='Profile'
            focused={focused}
          />
        )
      }} />
    </Tabs>
  )
}

export default TabsLayout