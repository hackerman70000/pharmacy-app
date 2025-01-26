import { Minus, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native';

const CartItem = ({ name, price, quantity, image, handleDelete, handleAdd }) => {
  const [value, setValue] = useState(quantity.toString());
  const [increaseDisabled, setIncreaseDisabled] = useState(parseInt(quantity) == 999);
  const [decreaseDisabled, setDecreaseDisabled] = useState(parseInt(quantity) == 1);

  useEffect(() => {
    setValue(quantity.toString());
  }, [quantity]);

  const handleInputChange = (text) => {
    if (/^\d{1,3}$/.test(text) && parseInt(text) >= 1 && parseInt(text) <= 999) {
      setValue(text);
    }
    setIncreaseDisabled(text == '999');
    setDecreaseDisabled(text == '1');
  };

  const increaseValue = () => {
    const newValue = parseInt(value, 10) + 1;
    setValue(newValue.toString());
    setIncreaseDisabled(newValue == '999');
    setDecreaseDisabled(newValue == '1');
    handleAdd();
  };

  const decreaseValue = () => {
    const newValue = parseInt(value, 10) - 1;
    setValue(newValue.toString());
    setIncreaseDisabled(newValue == '999');
    setDecreaseDisabled(newValue == '1');
    handleDelete('1', false);
  };

  return (
    <View className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden">
      <View className="p-4 flex-row items-center gap-4">
        {/* Product Image */}
        <View className="bg-white/10 rounded-xl overflow-hidden">
          {image ? (
            <Image
              source={{ uri: image }}
              resizeMode="contain"
              className="w-[60px] h-[60px]"
            />
          ) : (
            <View className="w-[60px] h-[60px] items-center justify-center">
              <ActivityIndicator size="small" color="#FFFFFF" />
            </View>
          )}
        </View>

        {/* Product Details */}
        <View className="flex-1">
          <Text className="text-white font-medium text-base" numberOfLines={1}>
            {name}
          </Text>
          
          <Text className="text-emerald-400 font-bold text-lg mt-1">
            ${price}
          </Text>
        </View>

        {/* Quantity Controls*/}
        <View className="flex-row items-center gap-2">
          <TouchableOpacity 
            onPress={decreaseValue}
            disabled={decreaseDisabled}
            className={`p-1 rounded-lg bg-white/10 ${decreaseDisabled ? 'opacity-30' : ''}`}
          >
            <Minus size={16} color="#FFFFFF" />
          </TouchableOpacity>
          
          <Text className="text-white text-base font-medium min-w-[24px] text-center">
            {value}
          </Text>
          
          <TouchableOpacity 
            onPress={increaseValue}
            disabled={increaseDisabled}
            className={`p-1 rounded-lg bg-white/10 ${increaseDisabled ? 'opacity-30' : ''}`}
          >
            <Plus size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Delete button */}
        <TouchableOpacity 
          onPress={() => handleDelete(value, true)}
          className="ml-2 p-2 rounded-lg bg-red-500/10"
        >
          <Trash2 size={16} color="#EF4444" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartItem;