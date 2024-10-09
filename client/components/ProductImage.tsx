import { MyText } from '@/ui';
import React from 'react';
import { Dimensions, Image, Pressable, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

const ProductImage = ({
  item,
  index,
  onTouchMove,
  onPress,
  onPressOut,
  height,
}: {
  item: IProduct;
  index: number;
  onPress?: () => void;
  onTouchMove?: () => void;
  onPressOut?: () => void;
  height?: number;
}) => {
  // const { height, width } = Dimensions.get("window");

  return (
    <Animated.View
      style={{ flex: 1 }}
      entering={FadeInDown.delay(index % 3 === 0 ? 500 : 600).springify()}
    >
      <Pressable
        // onLongPress={() => item?.onLongPress(item?.item?.id)}
        // onPressOut={item?.onPressOut}
        onLongPress={onPress}
        onPressOut={onPressOut}
        onTouchMove={onTouchMove}
        style={{ flex: 1 }}
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
