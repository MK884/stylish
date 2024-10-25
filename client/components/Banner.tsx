import { Banner as BannerProps, banners } from '@/constants/banners';
import React from 'react';
import { FlatList, Pressable } from 'react-native';
import { Dimensions, Image, View } from 'react-native';

export const BannerImg = ({ ImgSrc, id }: BannerProps) => {
  const { width, height } = Dimensions.get('screen');
  return (
    <Image
      key={id}
      source={ImgSrc}
      style={{
        width: width - 44,
        resizeMode: 'stretch',
        height: 200,
      }}
      className="rounded-xl"
    />
  );
};

const Banner = () => {
  const ref = React.useRef<FlatList>(null);
  const [currentIdx, setCurrentIdx] = React.useState(0);
  const { width, height } = Dimensions.get('screen');
  React.useEffect(() => {
    const timer = setInterval(() => {
      if (currentIdx < banners?.length - 1) {
        ref?.current?.scrollToIndex({ animated: true, index: currentIdx + 1 });
      } else {
        ref?.current?.scrollToIndex({ animated: true, index: 0 });
      }
    }, 2500);

    return () => clearInterval(timer);
  }, [currentIdx]);

  return (
    <>
      <View style={{ marginHorizontal: 22, marginVertical: 14 }}>
        <FlatList
          data={banners}
          renderItem={({ item }) => <BannerImg {...item} key={item.id} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          keyExtractor={(item) => item?.ImgSrc}
          ref={ref}
          onScroll={(e) => {
            const x = parseInt(
              (e.nativeEvent.contentOffset.x / width).toFixed(0)
            );
            setCurrentIdx(x);
          }}
        />
      </View>
      <View className="flex-row justify-center gap-2">
        {banners?.map((_, idx) => (
          <Pressable
            onPress={() =>
              ref?.current?.scrollToIndex({ animated: true, index: idx })
            }
            key={idx}
            className={`h-2 w-2 rounded-full ${
              currentIdx === idx ? 'bg-[#614FE0]' : 'bg-[#dadada]'
            }`}
          />
        ))}
      </View>
    </>
  );
};

export default Banner;
