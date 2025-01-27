import { Minus, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native';

const CartItem = ({ cartId, name, price, quantity, image, handleDelete, handleAdd }) => {
  const [value, setValue] = useState(quantity.toString());
  const [increaseDisabled, setIncreaseDisabled] = useState(parseInt(quantity) === 999);
  const [decreaseDisabled, setDecreaseDisabled] = useState(parseInt(quantity) === 1);

  useEffect(() => {
    setValue(quantity.toString());
    setIncreaseDisabled(parseInt(quantity) === 999);
    setDecreaseDisabled(parseInt(quantity) === 1);
  }, [quantity]);

  const handleIncrement = () => {
    handleAdd();
  };

  const handleDecrement = () => {
    if (parseInt(value) > 1) {
      handleDelete('1', false);
    }
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

        {/* Quantity Controls */}
        <View className="flex-row items-center gap-2">
          <TouchableOpacity 
            onPress={handleDecrement}
            disabled={decreaseDisabled}
            className={"p-1 rounded-lg bg-white/10 " + (decreaseDisabled ? "opacity-30" : "")}
          >
            <Minus size={16} color="#FFFFFF" />
          </TouchableOpacity>
          
          <Text className="text-white text-base font-medium min-w-[24px] text-center">
            {value}
          </Text>
          
          <TouchableOpacity 
            onPress={handleIncrement}
            disabled={increaseDisabled}
            className={"p-1 rounded-lg bg-white/10 " + (increaseDisabled ? "opacity-30" : "")}
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