import { MyText } from '@/ui';
import { Router } from 'expo-router';
import React from 'react';
import { Image, StyleProp, ViewStyle } from 'react-native';
import { Pressable, View } from 'react-native';

interface StoreLogoProps {
  src: string;
  name?: string;
  size?: number;
  router: Router;
  storeId: string;
  styles?: StyleProp<ViewStyle>;
}

const StoreLogo = ({
  name,
  src,
  size = 96,
  router,
  storeId,
  styles,
}: StoreLogoProps) => {
  // const imageS = name ? size - size / 3 : size;

  return (
    <View style={styles}>
      <Pressable
        className="flex items-center justify-center"
        onPress={() =>
          router.push({
            pathname: '/(app)/(screen)/storePage',
            params: { storeId },
          })
        }
      >
        <View
          className="rounded-full  overflow-hidden border bg-white border-[#dadada]"
          style={{ height: size, aspectRatio: 1 }}
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
          <View
            style={{
              height: size / 3,
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <MyText className="text-neutral-600 font-normal tracking-widest">
              {name}
            </MyText>
          </View>
        )}
      </Pressable>
    </View>
  );
};

export default StoreLogo;
