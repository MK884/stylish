import {
  View,
  FlatList,
  Pressable,
  Dimensions,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAllProducts, getProductById, usePrivateAxios } from '@/services';
import Feather from '@expo/vector-icons/Feather';
import { Image } from 'react-native';
import { Button, MyText } from '@/ui';
import {
  Accordion,
  BottomSheet,
  ImageBox,
  ImageModal,
  ProductCard,
  StoreLogo,
} from '@/components';
import { colorCode } from '@/constants';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const MAX_IMAGE_WIDTH = width - 32;
const MIN_IMAGE_WIDTH = width / 3;
const MAX_IMAGE_HEIGHT = 500;
const MIN_IMAGE_HEIGHT = 120;
const SCROLL_DISTANCE = MAX_IMAGE_HEIGHT - MIN_IMAGE_HEIGHT;
// const SCROLL_DISTANCE = 100;

const ProductPage = () => {
  const { productId } = useLocalSearchParams();
  let paddingHorizontal = 22;
  const axios = usePrivateAxios();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [selectedSize, setSelectedSize] = React.useState<size | 'size'>('size');
  const [product, setProduct] = React.useState<IProduct | null>(null);
  const [otherProducts, setOtherProducts] = React.useState<IProduct[] | []>([]);

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

  const getOtherProducts = async () => {
    try {
      const response = await getAllProducts({ axios, limit: 81 });

      if (response?.products) {
        const products = response.products
          ?.filter((item: IProduct) => item?._id !== product?._id)
          .slice(0, 8);

        setOtherProducts(products);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      }
    }
  };

  React.useEffect(() => {
    getProduct();
    getOtherProducts();
  }, []);

  const getSalePrice = (disscount: number, price: number) => {
    const finalPrice = (disscount / 100) * price;
    return price - finalPrice;
  };

  const offsetY = useSharedValue(0);

  const handleScroll = useAnimatedScrollHandler((e) => {
    offsetY.value = e.contentOffset.y;
  });

  const animatedImageStyle = useAnimatedStyle(() => {
    const height = interpolate(
      offsetY.value,
      [0, SCROLL_DISTANCE],
      [MAX_IMAGE_HEIGHT, MIN_IMAGE_HEIGHT],
      Extrapolation.CLAMP
    );

    const width = interpolate(
      offsetY.value,
      [0, SCROLL_DISTANCE],
      [MAX_IMAGE_WIDTH, MIN_IMAGE_WIDTH],
      Extrapolation.CLAMP
    );

    // const top = interpolate(
    //   offsetY.value,
    //   [0, MAX_IMAGE_HEIGHT + MIN_IMAGE_HEIGHT],
    //   [0, -MIN_IMAGE_HEIGHT],
    //   Extrapolation.CLAMP
    // );
    // const opacity = interpolate(
    //   offsetY.value,
    //   [0, MAX_IMAGE_HEIGHT],
    //   [1, 0],
    //   Extrapolation.CLAMP
    // );

    return { height, width };
  });

  return (
    <SafeAreaView className="bg-white  flex-1">
      <View className="py-2" style={{ width, paddingHorizontal }}>
        <Pressable onPress={() => router.back()}>
          <Feather name="arrow-left" size={28} color="black" />
        </Pressable>
      </View>
      <View style={{ flex: 1 }}>
        {isLoading ? (
          <MyText>Loading...</MyText>
        ) : (
          <View className="flex-1 ">
            <View className="mb-2">
              <FlatList
                data={product?.productImg}
                // pagingEnabled
                renderItem={({ item, index }) => (
                  <ImageBox
                    src={item.src}
                    index={index}
                    total={product ? product.productImg.length : 0}
                    AnimatedStyle={animatedImageStyle}
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
            <Animated.ScrollView
              showsVerticalScrollIndicator={false}
              onScroll={handleScroll}
              scrollEventThrottle={20}
              // style={{ flex: 1 }}
            >
              <View
                className="flex-row items-center justify-between min-h-20 gap-1 my-2"
                style={{ paddingHorizontal, width }}
              >
                <View className="">
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
                  data={
                    <View className="">
                      <MyText className="font-[400] text-left text-black capitalize my-1">
                        Description
                      </MyText>
                      <MyText>{product?.description}</MyText>
                      <MyText className="font-[400] text-left text-black capitalize my-1">
                        Available
                      </MyText>
                      <MyText>Quantity : {product?.quantity}</MyText>
                    </View>
                  }
                  title="about product"
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
              <View
                style={{
                  marginVertical: paddingHorizontal,
                }}
              >
                <View
                  className="py-4"
                  style={{ paddingLeft: paddingHorizontal }}
                >
                  <MyText className="text-lg capitalize">
                    Complete your outfit
                  </MyText>
                </View>
                <View className=" flex-wrap flex-row items-center justify-center">
                  {/* <FlatList
                    data={otherProducts}
                    renderItem={({ item }) => (
                      <ProductCard item={item} key={item._id} />
                    )}
                    keyExtractor={(item) => item._id}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal }}
                  /> */}
                  {otherProducts?.map((product) => (
                    <ProductCard item={product} key={product._id} width={180} />
                  ))}
                </View>
              </View>
            </Animated.ScrollView>
          </View>
        )}
        <Button
          title="Add to Cart"
          tailwindClass="rounded-none w-full absolute bottom-0"
        />
        <BottomSheet />
      </View>
    </SafeAreaView>
  );
};

export default ProductPage;
