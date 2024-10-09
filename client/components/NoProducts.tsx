import { View, Text, Image } from 'react-native';
import React from 'react';
import { MyText } from '@/ui';

const bg = require('@/assets/images/no_products.png');

const NoProducts = () => {
  return (
    <View className="h-screen flex-1 items-center pt-60">
      <Image
        source={bg}
        style={{
          height: 200,
          width: 200,
        }}
      />
    </View>
  );
};

export default NoProducts;
