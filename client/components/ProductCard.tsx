import { View, Image } from 'react-native';
import React from 'react';
import { MyText } from '@/ui';
import { Link } from 'expo-router';

const ProductCard = ({
  item,
  width = 200,
  height = 250,
  tailwindClass,
}: ProductCard) => {
  const getSalePrice = (disscount: number, price: number) => {
    const finalPrice = (disscount / 100) * price;
    return price - finalPrice;
  };

  return (
    <Link
      href={{
        pathname: '/(app)/(screen)/[productId]',
        params: { productId: item?._id },
      }}
    >
      <View
        className={`flex space-y-3 p-1 bg-white rounded-lg ${tailwindClass}`}
      >
        <View
          className="rounded-xl overflow-hidden relative"
          style={{ height, width }}
        >
          <Image
            source={{ uri: item?.productImg?.[0]?.src }}
            style={{ resizeMode: 'cover', flex: 1 }}
          />
        </View>
        <View className="">
          <MyText numberOfLines={1} className="font-normal max-w-[200px]">
            {item?.title}
          </MyText>
        </View>
        <View className="flex-row ">
          {item?.discount ? (
            <>
              <MyText
                style={{
                  color: '#dadada',
                  textDecorationLine: 'line-through',
                  marginRight: 4,
                  fontSize: 14,
                }}
              >
                ${item?.price}
              </MyText>
              <MyText
                style={{
                  color: 'green',
                  fontSize: 14,
                }}
              >
                ${getSalePrice(item?.discount, item?.price)}
              </MyText>
            </>
          ) : (
            <>
              <MyText
                style={{
                  color: 'green',
                  fontSize: 14,
                }}
              >
                ${item?.price}
              </MyText>
            </>
          )}
        </View>
      </View>
    </Link>
  );
};

export default ProductCard;
