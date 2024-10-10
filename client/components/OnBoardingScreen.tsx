import { Link } from 'expo-router';
import React from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import OnBoardItem from './OnBoardingItem';
import { MyText } from '@/ui';

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

  return (
    <View style={{ width: width, height: height }}>
      <View className="flex-row justify-between p-2">
        <View className="flex-row">
          <MyText>{currentIdx + 1}</MyText>
          <MyText className="text-[#A8A8A9]">/{items?.length}</MyText>
        </View>
        <Link href="/(auth)/sign-in">Skip</Link>
      </View>
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
      <View className="relative h-16 px-2">
        <Animated.View className="flex-row h-12 items-center justify-center gap-1">
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
        {currentIdx !== 0 && (
          <TouchableOpacity onPress={() => scrollToSlide(currentIdx - 1)}>
            <MyText className="text-[#A8A8A9] absolute left-0 bottom-3">
              Prev
            </MyText>
          </TouchableOpacity>
        )}
        {currentIdx !== items?.length ? (
          currentIdx === items?.length - 1 ? (
            <Link href="/(auth)/sign-in" asChild>
              <TouchableOpacity onPress={() => scrollToSlide(currentIdx + 1)}>
                <MyText className="text-[#614FE0] absolute right-0 bottom-3">
                  Get Started
                </MyText>
              </TouchableOpacity>
            </Link>
          ) : (
            <TouchableOpacity onPress={() => scrollToSlide(currentIdx + 1)}>
              <MyText className="text-[#614FE0] absolute right-0 bottom-3">
                Next
              </MyText>
            </TouchableOpacity>
          )
        ) : null}
      </View>
    </View>
  );
};

export default OnBoardingScreen;
