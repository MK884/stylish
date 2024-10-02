import { productPorps } from "@/db";
import { MyText } from "@/ui";
import React from "react";
import { FlatListProps, Image, Text, View } from "react-native";

interface DisplayProductsProps extends FlatListProps<any> {
  title: string;
  imgHeight?: number;
  imgWidth?: number;
  isStore?: boolean;
  [key: string]: any;
}

const DisplayProducts = ({
  title,
  imgHeight,
  imgWidth,
  isStore,
  ...rest
}: DisplayProductsProps) => {
  return (
    <View>
      <View>
        <Text>DisplayProducts</Text>
      </View>
    </View>
  );
};

interface renderItemProps {
  imgHeight?: number;
  imgWidth?: number;
  isStore?: boolean;
  data: productPorps;
}

export const RenderItem = ({
  imgHeight = 160,
  imgWidth = 256,
  isStore = false,
  data,
}: renderItemProps) => {
  const ImgSource = isStore ? data?.bg : data?.ImgSrc;

  return (
    <>
      <View className="flex space-y-3 bg-white p-3 rounded-lg shadow">
        <View
          className={`rounded-xl overflow-hidden relative`}
          style={{
            height: imgHeight,
            width: imgWidth,
          }}
        >
          <Image
            source={ImgSource}
            style={{ resizeMode: "cover", height: "100%", width: "100%" }}
          />
          {isStore && (
            <View className="absolute bg-white rounded-full w-12 h-12 bottom-2 left-2 overflow-hidden">
              <Image
                source={data?.logo}
                style={{ resizeMode: "contain", height: "100%", width: "100%" }}
              />
            </View>
          )}
        </View>
        <View className="flex-1 space-y-2">
          <MyText className="font-normal max-w-[200px]" numberOfLines={2}>
            {data?.title}
          </MyText>
          {!isStore && (
            <View className="flex-row ">
              <MyText
                style={{
                  color: "#dadada",
                  textDecorationLine: "line-through",
                  marginRight: 4,
                  fontSize: 14,
                }}
              >
                ${data?.price}
              </MyText>
              <MyText
                style={{
                  color: "green",
                  fontSize: 14,
                }}
              >
                ${data?.salePrice}
              </MyText>
            </View>
          )}
        </View>
      </View>
    </>
  );
};

export default DisplayProducts;
