import {
  View,
  FlatList,
  Pressable,
  Dimensions,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getProductById, usePrivateAxios } from '@/services';
import Feather from '@expo/vector-icons/Feather';
import { Image } from 'react-native';
import { MyText } from '@/ui';
import { Accordion, Divider, StoreLogo } from '@/components';
import { colorCode } from '@/constants';

const { width, height } = Dimensions.get('window');

const MAX_IMAGE_WIDTH = width - 32;
const MIN_IMAGE_WIDTH = width / 3;
const MAX_IMAGE_HEIGHT = 500;
const MIN_IMAGE_HEIGHT = 120;

const ImageBox = ({
  src,
  total,
  index,
  height = MAX_IMAGE_HEIGHT,
  width = MAX_IMAGE_WIDTH,
}: {
  src: string;
  total: number;
  index: number;
  height?: number;
  width?: number;
}) => {
  const radius = 25;

  return (
    <View
      style={{
        width,
        height,
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
  const [selectedSize, setSelectedSize] = React.useState<size | 'size'>('size');
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
          <View className="flex-1">
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
                bounces={false}
                keyExtractor={(item) => item.src}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingHorizontal,
                  gap: 4,
                }}
              />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View
                className="flex-row items-center justify-between min-h-20 gap-1 my-2"
                style={{ paddingHorizontal, width, flex: 1 }}
              >
                <View className="flex-1">
                  <MyText
                    className="capitalize text-[16px] font-[300]"
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
                        fontSize: 22,
                        fontWeight: 600,
                      }}
                    >
                      ${product?.price}
                    </MyText>
                    <MyText
                      style={{
                        color: 'green',
                        fontSize: 24,
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
                        fontSize: 24,
                        fontWeight: 600,
                      }}
                    >
                      ${product?.price}
                    </MyText>
                  </>
                )}
              </View>
              <View style={{ paddingHorizontal }}>
                <View className="flex flex-row items-center justify-center gap-4 py-8">
                  <View className="flex-1">
                    <Pressable
                      disabled
                      className="h-14 flex-row justify-center space-x-2 opacity-50 items-center rounded-xl border bg-[#eee] border-[#dadada] overflow-hidden"
                    >
                      <View
                        className="h-5 w-5 rounded-full border border-[#dadada]"
                        style={{
                          backgroundColor: product
                            ? colorCode[product.color[0]]
                            : 'black',
                        }}
                      />
                      <MyText className="text-black text-[16px] font-bold capitalize">
                        {product?.color[0]}
                      </MyText>
                    </Pressable>
                  </View>
                  <View className="flex-1">
                    <Pressable className="h-14 flex justify-center items-center rounded-xl border bg-white border-[#dadada] overflow-hidden">
                      <MyText className="text-black text-[16px] font-bold capitalize">
                        {selectedSize}
                      </MyText>
                    </Pressable>
                  </View>
                </View>
              </View>
              <View>
                <Accordion
                  data={<MyText>{product?.description}</MyText>}
                  title="description"
                />
                <Accordion
                  data={<MyText>{product?.store[0].description}</MyText>}
                  title="about brand"
                />
                <Accordion
                  data={
                    <MyText>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Totam exercitationem porro saepe a veniam odit dolores
                      expedita odio doloribus iusto, accusantium dignissimos
                      voluptas sint blanditiis libero tempora quibusdam
                      molestiae quo? Pariatur eligendi ducimus officia, quos
                      repellat eveniet alias facere esse.
                    </MyText>
                  }
                  title="shipping and return policies"
                />
              </View>
            </ScrollView>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ProductPage;
