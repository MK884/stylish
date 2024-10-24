import { View, Text, Dimensions } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const OrderPlacedAnimation = () => {
  const { height, width } = Dimensions.get('screen');

  return (
    <View
      style={{ height, width }}
      className="flex-1 items-center justify-center"
    >
      <LottieView
        source={require('@/assets/orderPlaced.json')}
        style={{ width: '100%', height: '100%' }}
        autoPlay
      />
    </View>
  );
};

export default OrderPlacedAnimation;
