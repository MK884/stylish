import {
  Accordion,
  CheckBoxLabel,
  ImageBox,
  ProductCard,
  Sheet,
  StoreLogo,
} from '@/components';
import { ClothesSize, colorCode } from '@/constants';
import {
  getAllProducts,
  getCart,
  getProductById,
  removeFromCart,
  updateCart,
  usePrivateAxios,
} from '@/services';
import { Button, MyText } from '@/ui';
import Feather from '@expo/vector-icons/Feather';
import BottomSheet from '@gorhom/bottom-sheet';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Pressable,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  Extrapolation,
  FadeInDown,
  FadeInUp,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

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
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [showCartMessage, setShowCartMessage] = React.useState<boolean>(false);
  const [isProductInCart, setisProductInCart] = React.useState<boolean>(false);
  const [selectedSize, setSelectedSize] = React.useState<size | 'size'>('size');
  const [product, setProduct] = React.useState<IProduct | null>(null);
  const [otherProducts, setOtherProducts] = React.useState<IProduct[] | []>([]);

  const sheetRef = React.useRef<BottomSheet>(null);

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
    checkCart();
  }, []);

  const addToCart = async () => {
    if (selectedSize === 'size') {
      snapToIndex(0);
      return;
    }

    try {
      const response = await updateCart({
        axios,
        productId: productId.toString(),
        size: selectedSize,
        color: product?.color[0],
      });

      setShowCartMessage(true);

      setisProductInCart(true);

      setTimeout(() => setShowCartMessage(false), 2000);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      }
    }
  };

  const removeFormCart = async () => {
    if (!productId) return;

    try {
      const response = await removeFromCart({
        axios,
        productId: productId.toString(),
      });

      setisProductInCart(false);

      ToastAndroid.show('remove from cart', ToastAndroid.SHORT);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      }
    }
  };

  const checkCart = async () => {
    try {
      const response = (await getCart(axios)) as Array<ICartProduct>;
      if (response?.length) {
        let isProductInCart = response.some(
          (item) => item.productId === productId
        );

        if (isProductInCart) {
          setisProductInCart(true);
        }
      }
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      }
    }
  };

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

    return { height, width };
  });

  const snapToIndex = (index: number) => sheetRef?.current?.snapToIndex(index);
  const closeSheet = () => sheetRef?.current?.close();

  return (
    <SafeAreaView className="bg-white  flex-1">
      <View className="py-2" style={{ width, paddingHorizontal }}>
        <Pressable onPress={() => router.back()}>
          <Feather name="arrow-left" size={28} color="black" />
        </Pressable>
      </View>
      <View style={{ flex: 1 }}>
        {isLoading ? (
          <View className="flex-1 items-center justify-center z-0">
            <ActivityIndicator size={'large'} />
          </View>
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
                    key={index}
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
                <View className="flex-1">
                  <MyText
                    className="capitalize text-[16px] font-[300]"
                    textBreakStrategy="highQuality"
                  >
                    {product?.title}
                  </MyText>
                </View>
                <View className="">
                  <StoreLogo
                    src={product?.store[0].avatarUrl}
                    size={44}
                    router={router}
                    storeId={product?.store[0]?._id}
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
                    <Pressable
                      className="h-14 flex justify-center items-center rounded-xl border bg-white border-[#dadada] overflow-hidden"
                      onPress={() => snapToIndex(0)}
                    >
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
                  {otherProducts?.map((product) => (
                    <ProductCard item={product} key={product._id} width={180} />
                  ))}
                </View>
              </View>
            </Animated.ScrollView>
          </View>
        )}
        <View className="absolute bottom-0 bg-white" style={{ width: '100%' }}>
          {showCartMessage && (
            <Animated.View
              entering={FadeInDown.duration(400)}
              exiting={FadeInUp.duration(400)}
            >
              <TouchableOpacity
                className="flex-row items-center justify-between bg-[#614FE0] py-4"
                style={{ paddingHorizontal }}
                onPress={() => router.push('/(app)/(screen)/cart')}
              >
                <View>
                  <MyText className="text-white">Added to the cart</MyText>
                </View>
                <View>
                  <Feather name="arrow-right" size={24} color="white" />
                </View>
              </TouchableOpacity>
            </Animated.View>
          )}

          <View
            className=" items-center py-4 z-10 bg-white"
            style={{ paddingHorizontal }}
          >
            {isProductInCart ? (
              <Button
                title="Remove from cart"
                tailwindClass="rounded-xl bg-white border border-[#dadada] w-full"
                textStyle={{ color: 'black' }}
                onPress={removeFormCart}
              />
            ) : (
              <Button
                title="Add to Cart"
                tailwindClass="rounded-xl w-full"
                onPress={addToCart}
              />
            )}
          </View>
        </View>
      </View>

      {/* bottom sheet */}
      <Sheet ref={sheetRef} index={-1} snapPoints={['50%', '90%']}>
        <View className="h-full items-center">
          <MyText className="text-black text-[18px] font-bold">Size</MyText>
          <View>
            {ClothesSize.map((item) => (
              <CheckBoxLabel
                isDisable={!product?.size.includes(item.size) || false}
                onPress={() => {
                  setSelectedSize(item.size);
                  closeSheet();
                }}
                key={item.label}
                isSelected={selectedSize === item.size}
                label={item.label}
                size={item.size}
              />
            ))}
          </View>
        </View>
      </Sheet>
    </SafeAreaView>
  );
};

export default ProductPage;
