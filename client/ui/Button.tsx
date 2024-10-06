import { ButtonProps } from "@/interface";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

const Button = ({ title, onPress, textStyle, tailwindClass, disabled=false }: ButtonProps) => {
  return (
    <TouchableOpacity
      className={`bg-[#614FE0] px-8 py-4 rounded-lg items-center ${disabled && 'opacity-70'} ${tailwindClass}`}
      onPress={onPress}
      disabled={disabled}
      role="button"
    >
      <Text className="text-white font-semibold text-[20px]" style={textStyle}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
