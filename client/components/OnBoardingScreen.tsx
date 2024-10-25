import Feather from '@expo/vector-icons/Feather';
import { Link, router } from 'expo-router';
import React from 'react';
import { Animated, Dimensions, FlatList, Pressable, View } from 'react-native';
import OnBoardItem from './OnBoardingItem';

const OnBoardingScreen = ({
  items,
}: {
  items: Array<onBoardItemProps>;
}): JSX.Element => {
  const ref = React.useRef<FlatList>(null);
  const [currentIdx, setCurrentIdx] = React.useState(0);

  const { width, height } = Dimensions.get('window');

  const scrollToSlide = (idx: number) => {
    if (idx >= items.length) return null;

    ref?.current?.scrollToIndex({
      animated: true,
      index: idx,
    });
  };

  const goToNext = () => {
    if (currentIdx === items?.length - 1) {
      router.push('/(auth)/sign-in');
      return;
    }
    scrollToSlide(currentIdx + 1);
  };

  return (
    <View style={{ width: width, height: height, paddingTop: 32 }}>
      <Animated.View className="flex-row h-12 items-center justify-center space-x-1">
        {items?.map((item, idx) => (
          <Pressable
            onPress={() => scrollToSlide(idx)}
            key={item.id}
            className={`w-2 h-2 rounded-full ${
              currentIdx === idx ? 'bg-black w-8' : 'bg-[#dadada]'
            }`}
          ></Pressable>
        ))}
      </Animated.View>
      <Animated.FlatList
        data={items}
        renderItem={({ item }) => <OnBoardItem item={item} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={ref}
        onScroll={(e) => {
          setCurrentIdx(
            parseInt((e.nativeEvent.contentOffset.x / width).toFixed(0))
          );
        }}
      />

      <View className="absolute bg-white  bottom-48 rounded-l-lg right-0 h-16 aspect-video -z-10 " />
      <View
        className="bg-[#C0C4FF] h-16 aspect-video z-10 absolute bottom-[196px]  right-0"
        style={{ borderBottomRightRadius: 70 }}
      />
      <View
        className="bg-white absolute -bottom-11 justify-end"
        style={{
          height: 240,
          width: '100%',
          borderTopLeftRadius: 70,
        }}
      >
        <View className="flex-row items-center justify-between px-6 py-16">
          <View className="">
            <Link
              href="/(auth)/sign-in"
              className="text-[#a8a8a8] text-lg font-[500]"
            >
              Skip
            </Link>
          </View>
          <View
            className="bg-[#6b5bdf] p-2 rounded-xl"
            style={{ elevation: 4 }}
          >
            <Pressable onPress={goToNext}>
              <Feather name="arrow-right" size={28} color="white" />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OnBoardingScreen;
