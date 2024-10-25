import { View, ToastAndroid, Dimensions, Image, Pressable } from 'react-native';
import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { getProductsByStoreId, usePrivateAxios } from '@/services';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MyText } from '@/ui';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { AboutStore, CategoryLabel, StoreOverview } from '@/components';
import Feather from '@expo/vector-icons/Feather';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const storePage = () => {
  const { storeId } = useLocalSearchParams<{ storeId: string }>();

  if (!storeId) return;

  const LOGO_SIZE = 120;
  const HEADER_HEIGHT = 60;
  const paddingHorizontal = 22;
  const constantTPadding = 80;

  const axios = usePrivateAxios();

  const [store, setStore] = React.useState<IStore | null>(null);
  const [total, setTotal] = React.useState<number>(0);
  const [products, setProducts] = React.useState<Array<IProduct> | []>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = React.useState<
    'overview' | 'about' | string
  >('overview');

  const getDetails = async () => {
    try {
      setIsLoading(true);
      const response = await getProductsByStoreId({ axios, storeId });

      if (response) {
        setStore(response[0].store[0]);
        setProducts(response);
        setTotal(response?.length);
      }
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
    getDetails();
  }, []);

  const tabs: tab[] = [
    {
      label: 'overview',
      content:
        products && store ? (
          <StoreOverview store={store} products={products} key={store._id} />
        ) : (
          <MyText key={1}>Loading...</MyText>
        ),
    },
    {
      label: 'about',
      content: store ? (
        <AboutStore store={store} key={store._id} total={total} />
      ) : (
        <MyText key={2}>Loading....</MyText>
      ),
    },
  ];

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
      [0, scrollY.value - (HEADER_HEIGHT + LOGO_SIZE / 4) - constantTPadding],
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
      [1, 0.4],
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
      [
        0,
        scrollY.value -
          (HEADER_HEIGHT * 2 + LOGO_SIZE + 10 + paddingHorizontal),
      ],
      Extrapolation.CLAMP
    );

    const translateX = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT + constantTPadding + 10],
      [0, -(HEADER_HEIGHT / 2 + LOGO_SIZE / 4)],
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

  // tag style
  const animatedTagStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT + constantTPadding + 14],
      [
        0,
        scrollY.value -
          (HEADER_HEIGHT + LOGO_SIZE * 2 + 14 + paddingHorizontal),
      ],
      Extrapolation.CLAMP
    );

    const translateX = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT + constantTPadding + 14],
      [0, HEADER_HEIGHT * 2],
      Extrapolation.CLAMP
    );
    return {
      transform: [{ translateY }, { translateX }],
    };
  });

  const textTagStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT + constantTPadding + 10],
      [1, 0]
    );

    return {
      opacity,
    };
  });

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-white">
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        className=""
        onScroll={handleScroll}
        scrollEventThrottle={16}
        bounces={false}
      >
        {/* header */}
        <Animated.View
          className="justify-center bg-white"
          style={[{ paddingHorizontal, height: HEADER_HEIGHT }, headerStyle]}
        >
          <Pressable onPress={() => router.back()}>
            <Feather name="arrow-left" size={28} color="black" />
          </Pressable>
        </Animated.View>
        <View style={{ paddingTop: constantTPadding }} />
        <Animated.View
          className="rounded-full border-4 border-[#dadada] mx-auto overflow-hidden"
          style={[
            {
              height: LOGO_SIZE,
              aspectRatio: 1,
            },
            ImageStyle,
          ]}
        >
          <Image
            source={{ uri: store?.avatarUrl }}
            style={[{ resizeMode: 'contain', height: '100%', width: '100%' }]}
          />
        </Animated.View>
        <View style={{ paddingTop: paddingHorizontal }} />
        <Animated.View className="self-center" style={[textStyle]}>
          <MyText className="text-black font-extrabold text-[32px] capitalize">
            {store?.name}
          </MyText>
        </Animated.View>
        <Animated.View
          className="flex-row gap-2 justify-center"
          style={[textTagStyle]}
        >
          <MaterialIcons name="verified" size={24} color="green" />
          <MyText className="text-[#868687] text-[16px]">
            Verified official store
          </MyText>
        </Animated.View>
        {/* tags */}
        <Animated.View
          className="flex-row my-2 justify-center "
          style={[animatedTagStyle]}
        >
          {tabs?.map((item) => (
            <CategoryLabel
              isSelected={item?.label === selectedCategory}
              label={item.label}
              onPress={() => setSelectedCategory(item.label)}
              key={item.label}
            />
          ))}
        </Animated.View>
        <View className="-z-10">
          {tabs.map((tab) => tab.label === selectedCategory && tab.content)}
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default storePage;
