import { ButtonProps } from '@/interface';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import MyText from './MyText';

const Button = ({
  title,
  onPress,
  textStyle,
  tailwindClass,
  disabled = false,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      className={`bg-[#614FE0] px-8 py-4 rounded-lg items-center ${disabled && 'opacity-70'} ${tailwindClass}`}
      onPress={onPress}
      disabled={disabled}
      role="button"
    >
      <MyText
        className="text-white font-semibold text-[20px]"
        style={textStyle}
      >
        {title}
      </MyText>
    </TouchableOpacity>
  );
};

export default Button;
