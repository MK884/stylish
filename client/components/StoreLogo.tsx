import { MyText } from '@/ui';
import React from 'react';
import { Image } from 'react-native';
import { Pressable, View } from 'react-native';

interface StoreLogoProps {
  src: string;
  name: string;
}

const StoreLogo = ({ name, src }: StoreLogoProps) => {
  return (
    <View>
      <Pressable
        style={{ flex: 1 }}
        className="flex items-center justify-center gap-4 mx-2"
      >
        <View className="h-24 w-24 rounded-full  overflow-hidden border border-[#dadada]">
          <Image
            source={{ uri: src }}
            style={{
              resizeMode: 'contain',
              flex: 1,
            }}
          />
        </View>
        <View>
          <MyText className="text-neutral-600 font-normal tracking-widest text-center">
            {name}
          </MyText>
        </View>
      </Pressable>
    </View>
  );
};

export default StoreLogo;
