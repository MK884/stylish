import {
  View,
  FlatList,
  Pressable,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getProductById, usePrivateAxios } from '@/services';
import Feather from '@expo/vector-icons/Feather';
import { Image } from 'react-native';
import { MyText } from '@/ui';
import { StoreLogo } from '@/components';

const { width, height } = Dimensions.get('window');

const ImageBox = ({
  src,
  total,
  index,
}: {
  src: string;
  total: number;
  index: number;
}) => {
  const radius = 25;

  return (
    <View
      style={{
        width: width - 32,
        height: 500,
        borderTopLeftRadius: index === 0 ? radius : 0,
        borderBottomLeftRadius: index === 0 ? radius : 0,
        borderTopRightRadius: index === total - 1 ? radius : 0,
        borderBottomRightRadius: index === total - 1 ? radius : 0,
        overflow: 'hidden',
      }}
    >
      <Image source={{ uri: src }} style={{ resizeMode: 'cover', flex: 1 }} />
    </View>
  );
};

const ProductPage = () => {
  const { productId } = useLocalSearchParams();
  let paddingHorizontal = 22;
  const axios = usePrivateAxios();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [product, setProduct] = React.useState<IProduct | null>(null);

  const getProduct = async () => {
    if (!productId) return;

    setIsLoading(true);
    try {
      const response = (await getProductById({
        axios,
        id: productId.toString(),
      })) as IProduct[];
      setProduct(response[0]);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      }
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getProduct();
  }, []);

  const getSalePrice = (disscount: number, price: number) => {
    const finalPrice = (disscount / 100) * price;
    return price - finalPrice;
  };

  return (
    <SafeAreaView className="bg-white  flex-1">
      <View className="my-4" style={{ width, paddingHorizontal }}>
        <Pressable onPress={() => router.back()}>
          <Feather name="arrow-left" size={28} color="black" />
        </Pressable>
      </View>
      <View style={{ flex: 1 }}>
        {isLoading ? (
          <MyText>Loading...</MyText>
        ) : (
          <View>
            <FlatList
              data={product?.productImg}
              pagingEnabled
              renderItem={({ item, index }) => (
                <ImageBox
                  src={item.src}
                  index={index}
                  total={product ? product.productImg.length : 0}
                />
              )}
              keyExtractor={(item) => item.src}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal,
                gap: 4,
              }}
            />
            <View
              className="flex-row items-center justify-between h-28 gap-1"
              style={{ paddingHorizontal, width }}
            >
              <View className="flex-1">
                <MyText
                  className="capitalize text-lg font-[300]"
                  textBreakStrategy="highQuality"
                >
                  {product?.title}
                </MyText>
              </View>
              <View>
                <StoreLogo
                  src={product?.store[0].avatarUrl}
                  height={44}
                  width={44}
                />
              </View>
            </View>
            <View style={{ paddingHorizontal }}>
              {product?.discount ? (
                <View className="flex-row items-center">
                  <MyText
                    style={{
                      color: '#dadada',
                      textDecorationLine: 'line-through',
                      marginRight: 4,
                      fontSize: 24,
                      fontWeight: 600,
                    }}
                  >
                    ${product?.price}
                  </MyText>
                  <MyText
                    style={{
                      color: 'green',
                      fontSize: 28,
                      fontWeight: 600,
                    }}
                  >
                    ${getSalePrice(product?.discount, product?.price)}
                  </MyText>
                </View>
              ) : (
                <>
                  <MyText
                    style={{
                      color: 'green',
                      fontSize: 28,
                      fontWeight: 600,
                    }}
                  >
                    ${product?.price}
                  </MyText>
                </>
              )}
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ProductPage;
