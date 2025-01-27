import React, { useEffect } from 'react';
import { Animated, Text, View } from 'react-native';

const ToastMessage = ({ message, onHide, type = 'success' }) => {
  const opacity = new Animated.Value(0);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide();
    });
  }, []);

  const getBackgroundColor = () => {
    switch (type) {
      case 'error':
        return 'bg-red-500/90';
      case 'success':
        return 'bg-emerald-500/90';
      default:
        return 'bg-emerald-500/90';
    }
  };

  return (
    <Animated.View 
      style={{ 
        opacity,
        position: 'absolute',
        top: 20,
        left: 0,
        right: 0,
        zIndex: 9999,
        elevation: 5,
        pointerEvents: 'none'
      }}
    >
      <View className={`mx-auto px-6 py-3 rounded-lg backdrop-blur-sm max-w-sm ${getBackgroundColor()}`}>
        <Text className="text-white text-base font-medium text-center">
          {message}
        </Text>
      </View>
    </Animated.View>
  );
};

export default ToastMessage;