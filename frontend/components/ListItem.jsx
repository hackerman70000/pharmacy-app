import { Plus } from 'lucide-react';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const ListItem = ({ name, price, image, manufacturer, onClick, onAddToCart }) => {
  return (
    <View className="bg-white/5 rounded-xl p-4 flex-row items-center space-x-4">
      <TouchableOpacity 
        onPress={onClick}
        className="flex-row flex-1 items-center space-x-4"
        activeOpacity={0.7}
      >
        <Image
          source={{ uri: image }}
          className="w-20 h-20 rounded-lg bg-white/5"
          resizeMode="contain"
        />
        <View className="flex-1">
          <Text className="text-lg font-medium text-white">{name}</Text>
          <Text className="text-white/60 text-sm mt-1">by {manufacturer}</Text>
          <Text className="text-emerald-400 text-lg font-medium mt-2">
            ${price}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onAddToCart}
        activeOpacity={0.7}
      >
        <Plus size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

export default ListItem;