import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { Dimensions, Pressable, Text, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { CategoryLabel } from '@/components';

const tabs: tab[] = [
  {
    label: 'overview',
    content: (
      <View className="">
        <Text>Overview</Text>
      </View>
    ),
  },
  {
    label: 'about',
    content: (
      <View>
        <Text>About</Text>
      </View>
    ),
  },
];

const index = () => {
  const LOGO_SIZE = 120;
  const HEADER_HEIGHT = 60;
  const paddingHorizontal = 22;
  const constantTPadding = 80;

  const { height, width } = Dimensions.get('screen');
  const [selectedCategory, setSelectedCategory] = React.useState<
    'overview' | 'about' | string
  >('overview');

  const scrollY = useSharedValue(0);

  const hadnleScroll = useAnimatedScrollHandler((e) => {
    scrollY.value = e.contentOffset.y;
    console.log('y =>', e.contentOffset.y);
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

  // header style
  const headerStyle = useAnimatedStyle(() => {
    return { transform: [{ translateY: scrollY.value }] };
  });

  // text style
  const textStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT + constantTPadding + 10],
      [0, scrollY.value - (HEADER_HEIGHT * 2 + LOGO_SIZE + 10)],
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
      [0, scrollY.value - (HEADER_HEIGHT + LOGO_SIZE * 2 + 14)],
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
    <SafeAreaView style={{ flex: 1 }}>
      {/* header */}

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        className=""
        onScroll={hadnleScroll}
        scrollEventThrottle={16}
        bounces={false}
      >
        {/* header */}
        <Animated.View
          className="justify-center "
          style={[{ paddingHorizontal, height: HEADER_HEIGHT }, headerStyle]}
        >
          <Pressable>
            <Feather name="arrow-left" size={28} color="black" />
          </Pressable>
        </Animated.View>
        <View style={{ paddingTop: constantTPadding }} />
        <Animated.View
          className="rounded-full border-4 border-[#dadada] mx-auto"
          style={[
            {
              height: LOGO_SIZE,
              aspectRatio: 1,
              // transform: [
              //   { translateY: -(HEADER_HEIGHT + LOGO_SIZE / 4) },
              //   { translateX: -HEADER_HEIGHT * 2 },
              //   { scale: 0.4 },
              // ],
            },
            ImageStyle,
          ]}
        />
        <Animated.View
          className="items-center"
          style={[
            {
              //    transform: [
              //   { translateY: -(HEADER_HEIGHT + LOGO_SIZE ) - (constantTPadding - 10)},
              //   { translateX: -(HEADER_HEIGHT/2  + LOGO_SIZE / 4) },
              //   { scale: 0.6 },
              // ],
            },
            textStyle,
          ]}
        >
          <Text className="text-black font-extrabold text-[32px] capitalize">
            zara
          </Text>
        </Animated.View>
        <Animated.View
          className="flex-row gap-2 justify-center"
          style={[textTagStyle]}
        >
          <MaterialIcons name="verified" size={24} color="green" />
          <Text className="text-[#868687] text-[16px]">
            Verified official store
          </Text>
        </Animated.View>
        {/* tags */}
        <Animated.View
          // style={animatedTagStyle}
          className="flex-row my-2 justify-center "
          style={[
            {
              //   transform: [
              //   { translateY: -(HEADER_HEIGHT + LOGO_SIZE * 2  + 14)},
              //   { translateX: (HEADER_HEIGHT*2 ) },
              // ],
            },
            animatedTagStyle,
          ]}
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
        <View className="">
          {tabs.map((tab) => tab.label === selectedCategory && tab.content)}
        </View>
        <View style={{ height: height * 2 }} />
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default index;
