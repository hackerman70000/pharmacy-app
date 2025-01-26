import { Eye, EyeOff } from 'lucide-react'
import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  containerStyle,
  inputStyle,
  secureTextEntry,
  showPassword: externalShowPassword,
  setShowPassword: externalSetShowPassword,
  ...props
}) => {
  const [internalShowPassword, setInternalShowPassword] = useState(false)
  const showPassword = externalShowPassword !== undefined ? externalShowPassword : internalShowPassword
  const setShowPassword = externalSetShowPassword || setInternalShowPassword
  
  return (
    <View>
      {title && (
        <Text className="text-white mb-1">{title}</Text>
      )}
      
      <View className={`relative flex-row items-center ${containerStyle}`}>
        <TextInput
          className={`flex-1 ${inputStyle}`}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          onChangeText={handleChangeText}
          secureTextEntry={secureTextEntry && !showPassword}
          {...props}
        />

        {secureTextEntry && (
          <TouchableOpacity 
            className="absolute right-4" 
            onPress={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff size={20} color="#6B7280" />
            ) : (
              <Eye size={20} color="#6B7280" />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField