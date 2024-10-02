import { MyText } from "@/ui";
import React from "react";
import { Dimensions, Image, Pressable, View } from "react-native";

const ProductImage = (item: any) => {
  const { height, width } = Dimensions.get("window");

  return (
    <>
      <Pressable
        onLongPress={() => item?.onLongPress(item?.item?.id)}
        onPressOut={item?.onPressOut}
        className="flex-1"
      >
        <>
          <View
            key={item?.item?.id}
            className="flex-1 rounded-xl mb-4 p-2 overflow-hidden mx-1 bg-white space-y-1"
            style={{
              height: item?.item?.id % 3 === 0 ? 430 : 230,
              width: 180,
              shadowColor: "#111",
              shadowOpacity: 1,
              shadowOffset: {
                width: 1,
                height: 1,
              },
            }}
          >
            <Image
              source={{
                uri: item?.item?.image,
              }}
              style={{
                resizeMode: "contain",
                flex: 1,
              }}
            />
            {item?.item?.title && (
              <View>
                <MyText numberOfLines={1} className="text-bold">
                  {item.item.title}
                </MyText>
              </View>
            )}
            {item?.item?.price && (
              <View className="flex-row">
                <MyText className="text-green-700 bg-green-100 p-1 flex-grow-0 rounded-md text-xs">
                  ${item.item.price}
                </MyText>
                <View className="flex-1" />
              </View>
            )}
          </View>
        </>
      </Pressable>
    </>
  );
};

export default ProductImage;
