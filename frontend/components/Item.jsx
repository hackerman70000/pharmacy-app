import React, { memo, useState } from 'react';
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native';

const Item = memo(({ name, price, image, onClick }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);

  return (
    <TouchableOpacity
      className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden w-[160px] md:w-[180px] lg:w-[200px]"
      onPress={onClick}
      activeOpacity={0.7}
    >
      <View className="p-4 space-y-3">
        <View className="bg-white/10 rounded-xl overflow-hidden p-2 aspect-square">
          {isImageLoading && (
            <View className="absolute inset-0 items-center justify-center">
              <ActivityIndicator size="small" color="#FFFFFF" />
            </View>
          )}
          <Image
            source={{ uri: image }}
            resizeMode="contain"
            className="w-full h-full"
            onLoadStart={() => setIsImageLoading(true)}
            onLoadEnd={() => setIsImageLoading(false)}
          />
        </View>
        
        <View className="space-y-2">
          <Text className="text-white font-medium text-base" numberOfLines={2}>
            {name}
          </Text>
          <Text className="text-emerald-400 font-bold text-lg">
            ${price}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});

Item.displayName = 'Item';

export default Item;