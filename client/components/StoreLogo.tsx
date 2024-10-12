import { MyText } from '@/ui';
import React from 'react';
import { Image } from 'react-native';
import { Pressable, View } from 'react-native';

interface StoreLogoProps {
  src: string;
  name?: string;
  height?: number;
  width?: number;
}

const StoreLogo = ({ name, src, height = 96, width = 96 }: StoreLogoProps) => {
  return (
    <View style={{ height, width }}>
      <Pressable
        style={{ flex: 1 }}
        className="flex items-center justify-center gap-4 mx-2"
      >
        <View
          className="rounded-full  overflow-hidden border bg-white border-[#dadada]"
          style={{ height, width }}
        >
          <Image
            source={{ uri: src }}
            style={{
              resizeMode: 'contain',
              flex: 1,
            }}
          />
        </View>
        {name && (
          <View>
            <MyText className="text-neutral-600 font-normal tracking-widest text-center">
              {name}
            </MyText>
          </View>
        )}
      </Pressable>
    </View>
  );
};

export default StoreLogo;
