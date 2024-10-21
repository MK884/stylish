import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  ToastAndroid,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import Animated, {
  Extrapolation,
  FadeInDown,
  FadeInUp,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, MyText } from '@/ui';
import { CartProductCard } from '@/components';
import {
  usePrivateAxios,
  getCart,
  removeFromCart,
  updateCart,
} from '@/services';

const cart = () => {
  const LOGO_SIZE = 80;
  const HEADER_HEIGHT = 60;
  const paddingHorizontal = 22;
  const constantTPadding = 60;
  const boxHeight = 170;

  const router = useRouter();
  const axios = usePrivateAxios();

  const [cartItem, setCartItem] = React.useState<Array<ICartProduct>>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const getCartProducts = async () => {
    setIsLoading(true);
    try {
      const response = await getCart(axios);
      if (response?.length) setCartItem(response);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onView = (productId: string) => {
    router.push({
      pathname: '/(app)/(screen)/[productId]',
      params: { productId },
    });
  };

  const onCartRemove = async (productId: string) => {
    if (!productId) return;

    try {
      const response = await removeFromCart({ axios, productId });

      setCartItem(response);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      }
    }
  };

  const updateQuantity = async (quantity: number, productId: string) => {
    if (quantity < 1 || !productId) return;

    try {
      // const response = await updateCart({ axios, productId, qty: quantity });
      // console.log('resp ', response);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      }
    }
  };

  const onSelect = () => {};

  React.useEffect(() => {
    getCartProducts();
  }, []);

  const scrollY = useSharedValue(0);

  const handleScroll = useAnimatedScrollHandler((e) => {
    scrollY.value = e.contentOffset.y;
  });

  // header style
  const headerStyle = useAnimatedStyle(() => {
    return { transform: [{ translateY: scrollY.value }] };
  });

  // image style
  const ImageStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT + constantTPadding],
      [0, scrollY.value - (HEADER_HEIGHT + LOGO_SIZE / 5) - 55],
      Extrapolation.CLAMP
    );

    const translateX = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT + constantTPadding],
      [0, -HEADER_HEIGHT * 2],
      Extrapolation.CLAMP
    );

    const scale = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT + constantTPadding],
      [1, 0.38],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ translateY }, { translateX }, { scale }],
    };
  });

  // text style
  const textStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT + constantTPadding + 10],
      [0, scrollY.value - (HEADER_HEIGHT * 2 + LOGO_SIZE + 12)],
      Extrapolation.CLAMP
    );

    const translateX = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT + constantTPadding + 10],
      [0, -(HEADER_HEIGHT / 4 + LOGO_SIZE / 4 - 10)],
      Extrapolation.CLAMP
    );

    const scale = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT + constantTPadding + 10],
      [1, 0.6],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ translateY }, { translateX }, { scale }],
    };
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#eee' }}>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        className=""
        onScroll={handleScroll}
        scrollEventThrottle={16}
        bounces={false}
      >
        {/* header */}
        <Animated.View
          className="justify-center bg-[#eee]"
          style={[{ paddingHorizontal, height: HEADER_HEIGHT }, headerStyle]}
        >
          <Pressable onPress={() => router.back()}>
            <Feather name="arrow-left" size={28} color="black" />
          </Pressable>
        </Animated.View>
        <View style={{ paddingTop: constantTPadding }} />
        <Animated.View
          className="self-center"
          style={[
            {
              height: LOGO_SIZE,
            },
            ImageStyle,
          ]}
        >
          <FontAwesome name="opencart" size={LOGO_SIZE} />
        </Animated.View>
        <View style={{ paddingTop: paddingHorizontal }} />

        <Animated.View className="self-center" style={[textStyle]}>
          <MyText className="text-black font-extrabold text-[32px] capitalize">
            Shopping cart
          </MyText>
        </Animated.View>

        {isLoading ? (
          <View className="flex-1 items-center justify-center z-0">
            <ActivityIndicator size={'large'} />
          </View>
        ) : cartItem?.length ? (
          <View
            className="-z-10 space-y-3 mt-6"
            style={{ paddingHorizontal, paddingBottom: boxHeight }}
          >
            {cartItem?.map((item) => (
              <View key={item._id}>
                <CartProductCard
                  key={item.productId}
                  item={item}
                  onView={() => onView(item.productId)}
                  onSelect={() => {}}
                  onDelete={() => onCartRemove(item.productId)}
                  onQuantityUpdate={updateQuantity}
                />
              </View>
            ))}
          </View>
        ) : (
          <View className="space-y-10" style={{ paddingVertical: 40 }}>
            <View>
              <Image
                source={require('@/assets/images/empty_cart.png')}
                style={{
                  resizeMode: 'contain',
                  alignSelf: 'center',
                  height: 160,
                }}
              />
            </View>
            <View>
              <MyText className="text-black text-lg self-center">
                Your cart is empty
              </MyText>
            </View>
            <View>
              <Button
                title="Explore Products"
                tailwindClass="bg-white border border-[#dadada] rounded-xl  self-center"
                textStyle={{ color: 'black' }}
                onPress={() => router.push('/(app)/(screen)/market-place')}
              />
            </View>
          </View>
        )}
      </Animated.ScrollView>

      {/* bottom box */}
      <Animated.View
        entering={FadeInDown.duration(450)}
        className="bg-white absolute bottom-0 rounded-t-3xl z-10 border border-[#dadada]"
        style={{
          height: boxHeight,
          width: '100%',
          elevation: 5,
          padding: paddingHorizontal,
        }}
      >
        <View className="space-y-8">
          <View className="flex-row items-center justify-between">
            <View>
              <MyText className="text-lg">Subtotal (VAT included) </MyText>
            </View>
            <View>
              <MyText className="text-black font-[700] text-[18px]">$34</MyText>
            </View>
          </View>

          <View className="">
            <Button title="Continue to checkout" tailwindClass="rounded-2xl" />
          </View>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default cart;
