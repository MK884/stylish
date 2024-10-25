import { MyText } from '@/ui';
import React from 'react';
import { Dimensions, Image, View } from 'react-native';

const OnBoardingItem = ({ item }: { item: onBoardItemProps }): JSX.Element => {
  const { width } = Dimensions.get('window');
  return (
    <View className={`flex  items-center`}>
      <Image
        source={item.ImgSource}
        style={{ resizeMode: 'contain', width: width, height: 350 }}
      />
      <MyText className="text-3xl font-bold  tracking-widest text-white">
        {item?.title}
      </MyText>
      <MyText className="text-[14px] text-center tracking-wider font-[500] text-[#fff] w-[300px]">
        {item?.description}
      </MyText>
    </View>
  );
};

export default OnBoardingItem;
