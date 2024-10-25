import { MyText } from '@/ui';
import { Router } from 'expo-router';
import React from 'react';
import { Image, Pressable, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

const ProductImage = ({
  item,
  index,
  height,
  router,
}: {
  item: IProduct;
  index: number;
  height?: number;
  router: Router;
}) => {
  return (
    <Animated.View
      style={{ flex: 1 }}
      entering={FadeInDown.delay(index % 3 === 0 ? 500 : 600).springify()}
    >
      <Pressable
        style={{ flex: 1 }}
        onPress={() =>
          router.push({ pathname: '/(app)/[id]', params: { id: item._id } })
        }
      >
        <>
          <View
            key={item._id}
            className=" rounded-xl mb-2 overflow-hidden mx-1"
            style={{
              width: 180,
              shadowColor: '#111',
              flex: 1,
              shadowOpacity: 1,
              shadowOffset: {
                width: 1,
                height: 1,
              },
            }}
          >
            <View
              style={{
                flex: 1,
                height: index % 3 === 0 ? 300 : 200,
                // height,
              }}
              className="bg-white p-1 rounded-xl"
            >
              <Image
                source={{
                  uri: item.productImg[0].src,
                }}
                style={{
                  resizeMode: 'cover',
                  flex: 1,
                }}
                className="rounded-xl"
              />
            </View>
            <View className="my-2 space-y-2">
              {item?.title && (
                <View>
                  <MyText numberOfLines={1} className="text-bold">
                    {item.title}
                  </MyText>
                </View>
              )}
              {item?.price && (
                <View className="flex-row">
                  <MyText className="text-green-700 bg-green-100 p-1 flex-grow-0 rounded-md text-xs">
                    ${item.price}
                  </MyText>
                  <View className="flex-1" />
                </View>
              )}
            </View>
          </View>
        </>
      </Pressable>
    </Animated.View>
  );
};

export default ProductImage;
