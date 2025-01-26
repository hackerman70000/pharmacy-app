import {
    Eye,
    EyeOff,
    Home,
    LogOut,
    Minus,
    Plus,
    ShoppingCart,
    Trash,
    User
} from 'lucide-react';
import React from 'react';
import { TouchableOpacity } from 'react-native';

const iconComponents = {
  home: Home,
  cart: ShoppingCart,
  user: User,
  logout: LogOut,
  plus: Plus,
  minus: Minus,
  trash: Trash,
  eye: Eye,
  eyeOff: EyeOff
};

const IconButton = ({ 
  icon, 
  size = 24,
  color = '#4F46E5',
  containerStyles = '',
  handlePress,
  disabled = false
}) => {
  const IconComponent = iconComponents[icon];

  if (!IconComponent) return null;

  return (
    <TouchableOpacity
      className={`justify-center items-center ${containerStyles} ${disabled ? 'opacity-50' : ''}`}
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={disabled}
    >
      <IconComponent size={size} color={color} />
    </TouchableOpacity>
  );
};

export default IconButton;