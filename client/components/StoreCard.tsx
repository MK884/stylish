import { View, Text, Image } from 'react-native';
import React from 'react';
import { MyText } from '@/ui';

const StoreCard = ({ item, height = 160, width = 256 }: StoreCardProps) => {
  return (
    <View className="flex space-y-2">
      <View
        className="rounded-xl overflow-hidden relative bg-white p-1"
        style={{ height, width }}
      >
        <Image
          source={{ uri: item.thumbnailUrl }}
          style={{
            resizeMode: 'cover',
            flex: 1,
          }}
          className="rounded-xl"
        />
        {/* <View className="absolute bg-black/30 top-0 bottom-0 left-0 right-0" /> */}
        <View className="absolute bg-white rounded-full w-12 h-12 bottom-2 left-2 overflow-hidden">
          <Image
            source={{ uri: item?.avatarUrl }}
            style={{ resizeMode: 'contain', height: '100%', width: '100%' }}
          />
        </View>
      </View>
      <View className="flex-1">
        <MyText className="font-[400] text-md" numberOfLines={1}>
          {item?.name}
        </MyText>
      </View>
    </View>
  );
};

export default StoreCard;
