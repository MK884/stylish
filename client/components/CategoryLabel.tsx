import { View, Text, Pressable, PressableProps } from "react-native";
import React from "react";
import { MyText } from "@/ui";
import Animated, { FadeInRight } from "react-native-reanimated";

interface CategoryLabelProps extends PressableProps {
  label: string;
  isSelected: boolean;
  [key: string]: any;
}

const CategoryLabel = ({ label, isSelected, ...rest }: CategoryLabelProps) => {
  return (
    <View>
      <Pressable {...rest}>
        <MyText
          className={`font-semibold text-lg`}
          style={{
            color: isSelected ? "black" : "#868687",
            textTransform: "capitalize",
          }}
        >
          {label}
        </MyText>
        {isSelected && (
          <View className="w-1 h-1 rounded-full self-center bg-[#614FE0]" />
        )}
      </Pressable>
    </View>
  );
};

export default CategoryLabel;
