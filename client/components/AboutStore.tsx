import { MyText } from '@/ui';
import React from 'react';
import { View } from 'react-native';

const AboutStore = ({ store, total = 0 }: AboutStore) => {
  const paddingHorizontal = 22;

  const registerDate = new Date(store.createdAt).toLocaleString('en-GB', {
    month: 'long',
    year: 'numeric',
    day: '2-digit',
  });

  return (
    <View className="space-y-8" style={{ padding: paddingHorizontal }}>
      <View className="space-y-4">
        <MyText className="text-black font-[400] text-xl">Description</MyText>
        <MyText className="text-sm text-[#868687]">{store.description}</MyText>
      </View>
      <View className="space-y-4">
        <MyText className="text-black font-[400] text-xl">
          Total Products
        </MyText>
        <MyText className="text-sm text-[#868687]">{total} Products</MyText>
      </View>
      <View className="space-y-4">
        <MyText className="text-black font-[400] text-xl">Register on</MyText>
        <MyText className="text-sm text-[#868687]">{registerDate}</MyText>
      </View>
      {/* jus to make some scrollable */}
      <View style={{ height: 500 }} />
    </View>
  );
};

export default AboutStore;
