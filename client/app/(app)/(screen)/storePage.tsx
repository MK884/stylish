import {
  View,
  Text,
  ToastAndroid,
  Dimensions,
  Image,
  Pressable,
} from 'react-native';
import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { getProductsByStoreId, usePrivateAxios } from '@/services';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
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
  withTiming,
} from 'react-native-reanimated';

const storePage = () => {
  const { storeId } = useLocalSearchParams<{ storeId: string }>();

  if (!storeId) return;

  const LOGO_SIZE = 120;
  const HEADER_HEIGHT = 70;
  const paddingHorizontal = 22;

  const axios = usePrivateAxios();
  const { height, width } = Dimensions.get('window');

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
          <StoreOverview store={store} products={products} />
        ) : (
          <MyText>Loading...</MyText>
        ),
    },
    {
      label: 'about',
      content: store ? (
        <AboutStore store={store} key={store._id} total={total} />
      ) : (
        <MyText>Loading....</MyText>
      ),
    },
  ];

  const offsetY = useSharedValue(0);

  const handleScroll = useAnimatedScrollHandler((e) => {
    offsetY.value = e.contentOffset.y;
    console.log('y => ', e.contentOffset.y);
  });

  const animatedImageStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      offsetY.value,
      [0, LOGO_SIZE + HEADER_HEIGHT],
      // [0, offsetY.value - (LOGO_SIZE + HEADER_HEIGHT / 2)],
      [0, offsetY.value - (LOGO_SIZE + HEADER_HEIGHT - 8)],
      // [0, -(LOGO_SIZE - HEADER_HEIGHT)],
      Extrapolation.CLAMP
    );
    const translateX = interpolate(
      offsetY.value,
      [0, LOGO_SIZE + HEADER_HEIGHT],
      [0, -300],
      Extrapolation.CLAMP
    );

    const scale = interpolate(
      offsetY.value,
      [0, LOGO_SIZE + HEADER_HEIGHT],
      [1, 0.4],
      {
        extrapolateRight: Extrapolation.CLAMP,
      }
    );
    return {
      transform: [
        {
          translateY,
        },
        {
          scale,
        },
        {
          translateX,
        },
      ],
    };
  });
  const animatedTextStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      offsetY.value,
      [0, LOGO_SIZE],
      // [0, offsetY.value - (LOGO_SIZE * 2 + HEADER_HEIGHT / 2)],
      [0, offsetY.value - (LOGO_SIZE + HEADER_HEIGHT * 2 + 10)],
      // [0, -(LOGO_SIZE - HEADER_HEIGHT)],
      Extrapolation.CLAMP
    );
    const translateX = interpolate(
      offsetY.value,
      [0, LOGO_SIZE],
      // [0, -(100 + LOGO_SIZE / 4)],
      [0, -LOGO_SIZE],
      Extrapolation.CLAMP
    );

    const scale = interpolate(offsetY.value, [0, LOGO_SIZE], [1, 0.6], {
      extrapolateRight: Extrapolation.CLAMP,
    });
    return {
      transform: [
        {
          translateY,
        },
        {
          scale,
        },
        {
          translateX,
        },
      ],
    };
  });
  const animatedTagStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      offsetY.value,
      [0, LOGO_SIZE],
      // [0, offsetY.value - (LOGO_SIZE * 2 + HEADER_HEIGHT * 2)],
      [0, -(LOGO_SIZE / 2 + HEADER_HEIGHT * 4 + 12)],
      // [0, -(LOGO_SIZE - HEADER_HEIGHT)],
      Extrapolation.CLAMP
    );
    const translateX = interpolate(
      offsetY.value,
      [0, LOGO_SIZE],
      [0, LOGO_SIZE],
      Extrapolation.CLAMP
    );

    return {
      transform: [
        {
          translateY,
        },
        {
          translateX,
        },
      ],
    };
  });

  const sectionStyle = useAnimatedStyle(() => {
    const opacity = interpolate(offsetY.value, [0, LOGO_SIZE], [1, 0]);

    const translateY = interpolate(
      offsetY.value,
      [0, offsetY.value],
      [0, -offsetY.value]
    );

    const height = interpolate(
      offsetY.value,
      [0, LOGO_SIZE * 2],
      [LOGO_SIZE * 2 + HEADER_HEIGHT, HEADER_HEIGHT],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ translateY }],
      // top: -offsetY.value,
      // opacity,
      // height,
    };
  });

  const scrollAnimationStyle = useAnimatedStyle(() => {
    const flex = interpolate(offsetY.value, [0, LOGO_SIZE], [0, 1]);
    const translateY = interpolate(
      offsetY.value,
      [0, offsetY.value],
      [0, -offsetY.value],
      Extrapolation.CLAMP
    );
    return {
      transform: [{ translateY }],
    };
  });

  return (
    <SafeAreaView className="bg-white pt-4" style={{ height, width }}>
      <View
        className="bg-transparent justify-center"
        style={{ paddingHorizontal, height: 40 }}
      >
        <Pressable onPress={() => router.back()}>
          <Feather name="arrow-left" size={28} color="black" />
        </Pressable>
      </View>

      {/*hero section */}

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        bounces={false}
        scrollEventThrottle={16}
        className="flex-1"
      >
        <Animated.View
          className="items-center space-y-2 pt-28"
          style={[sectionStyle]}
        >
          <Animated.View
            className="rounded-full overflow-hidden border-4 border-[#dadada] bg-white"
            style={[{ height: LOGO_SIZE, aspectRatio: 1 }, animatedImageStyle]}
          >
            <Animated.Image
              source={{ uri: store?.avatarUrl }}
              style={[{ resizeMode: 'contain', height: '100%', width: '100%' }]}
            />
          </Animated.View>
          <Animated.View style={animatedTextStyle}>
            <MyText className="text-black font-extrabold text-[32px] capitalize">
              {store?.name}
            </MyText>
          </Animated.View>
          <View className="flex-row gap-2">
            <MaterialIcons name="verified" size={24} color="green" />
            <MyText className="text-[#868687] text-[16px]">
              Verified official store
            </MyText>
          </View>
        </Animated.View>
        {/* tags */}
        <Animated.View
          style={animatedTagStyle}
          className="flex flex-row my-2 items-center justify-center "
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
        <Animated.View className="">
          {tabs.map((tab) => tab.label === selectedCategory && tab.content)}
        </Animated.View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default storePage;
