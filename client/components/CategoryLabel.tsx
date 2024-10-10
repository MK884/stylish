import { View, Text, Pressable, PressableProps } from 'react-native';
import React from 'react';
import { MyText } from '@/ui';
import Animated, { FadeInLeft, FadeInRight } from 'react-native-reanimated';

interface CategoryLabelProps extends PressableProps {
  label: string;
  isSelected: boolean;
  [key: string]: any;
}

const CategoryLabel = ({
  label,
  isSelected,
  onPress,
  ...rest
}: CategoryLabelProps) => {
  return (
    <Animated.View entering={FadeInRight.duration(400)}>
      <Pressable {...rest} className="mr-2" onPress={onPress}>
        <MyText
          className={`font-semibold text-lg`}
          style={{
            color: isSelected ? 'black' : '#868687',
            textTransform: 'capitalize',
          }}
        >
          {label}
        </MyText>
        {isSelected && (
          <View className="w-1 h-1 rounded-full self-center bg-[#614FE0]" />
        )}
      </Pressable>
    </Animated.View>
  );
};

export default CategoryLabel;
