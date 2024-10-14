import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import { MyText } from '@/ui';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const MarketPlace = () => {
  const { category } = useLocalSearchParams<{ category?: category }>();

  const FILTER_BUTTON_SIZE = 60;
  const HEADER_HEIGHT = 60;
  const paddingHorizontal = 22;
  const constantTPadding = 80;

  const router = useRouter();
  const { height, width } = Dimensions.get('screen');

  const scrollY = useSharedValue(0);

  const handleScroll = useAnimatedScrollHandler((e) => {
    scrollY.value = e.contentOffset.y;
  });

  const animatedHeaderStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: scrollY.value }],
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT + constantTPadding],
      [0, scrollY.value - (HEADER_HEIGHT / 2 + constantTPadding + 24)],
      Extrapolation.CLAMP
    );
    const translateX = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT + constantTPadding],
      [0, -(HEADER_HEIGHT / 2 + 60)],
      Extrapolation.CLAMP
    );
    const scale = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT + constantTPadding],
      [1, 0.5],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ translateY }, { translateX }, { scale }],
    };
  });

  const textDissolveStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT + constantTPadding],
      [1, 0],
      Extrapolation.CLAMP
    );

    return {
      opacity,
    };
  });

  const filterButtonAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT + constantTPadding],
      [
        0,
        scrollY.value -
          (HEADER_HEIGHT + constantTPadding + FILTER_BUTTON_SIZE + 38),
      ],
      Extrapolation.CLAMP
    );
    const translateX = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT + constantTPadding],
      [0, width / 2 - FILTER_BUTTON_SIZE / 2],
      Extrapolation.CLAMP
    );
    const scale = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT + constantTPadding],
      [1, 0.7],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ translateY }, { translateX }, { scale }],
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
          style={[
            { paddingHorizontal, height: HEADER_HEIGHT },
            animatedHeaderStyle,
          ]}
        >
          <Pressable
            onPress={() => router.back()}
            className=""
            style={{ width: 28 }}
          >
            <Feather name="arrow-left" size={28} color="black" />
          </Pressable>
        </Animated.View>

        <View style={{ paddingTop: constantTPadding }} />

        <Animated.View
          className="self-center"
          style={[
            // {
            //   transform: [
            //     {
            //       translateY: -(HEADER_HEIGHT / 2 + constantTPadding + 24),
            //     },
            //     {
            //       scale: 0.5,
            //     },
            //     {
            //       translateX: -(HEADER_HEIGHT + constantTPadding + 38),
            //     },
            //   ],
            // },

            animatedTextStyle,
          ]}
        >
          <MyText className="text-black font-extrabold text-[36px] capitalize">
            Market Place
          </MyText>
        </Animated.View>

        <Animated.View className="self-center -z-10" style={textDissolveStyle}>
          <MyText className="text-[#868687] text-[14px]">
            Explore products over 1600+
          </MyText>
        </Animated.View>
        <View style={{ paddingTop: 30 }} />
        <Animated.View
          style={[
            {
              height: FILTER_BUTTON_SIZE,
              aspectRatio: 1,
              // transform: [
              //   {
              //     translateY: -(
              //       HEADER_HEIGHT +
              //       constantTPadding +
              //       FILTER_BUTTON_SIZE +
              //       38
              //     ),
              //   },
              //   {
              //     translateX: width / 2 - FILTER_BUTTON_SIZE / 2,
              //   },
              //   {
              //     scale: 0.7,
              //   },
              // ],
            },
            filterButtonAnimatedStyle,
          ]}
          className="rounded-xl bg-white border border-[#dadada] flex items-center justify-center self-center"
        >
          <Pressable onPress={() => console.log('press')}>
            <AntDesign name="filter" size={34} color="black" />
          </Pressable>
        </Animated.View>
        <View style={{ height: height * 2 }} />
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default MarketPlace;
