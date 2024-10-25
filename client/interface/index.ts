import Icon from '@expo/vector-icons/FontAwesome';
import { GestureResponderEvent, TextProps } from 'react-native';

export interface IconProp {
  name: keyof typeof Icon.glyphMap;
  size?: number;
  tailwindClass?: string;
  titel?: string;
  textStyle?: TextProps['style'];
  onPress?: () => void;
  IconColor?: string;
  [key: string]: any;
}

export interface ButtonProps {
  title?: string;
  onPress?: (e: GestureResponderEvent) => void;
  textStyle?: TextProps['style'];
  tailwindClass?: string;
  disabled?: boolean;
}

export interface TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  password?: boolean;
  error?: string;
  IconName?: keyof typeof Icon.glyphMap;
  tailwindClass?: string;
  IconStyle?: TextProps['style'];
  [key: string]: any;
}
