import { IconProp } from '@/interface';
import Icon from '@expo/vector-icons/FontAwesome';
import { View } from 'react-native';
import MyText from './MyText';

const IconButton = ({
  name,
  size = 24,
  tailwindClass,
  titel,
  textStyle,
  IconColor,
  onPress,
  ...rest
}: IconProp) => {
  return (
    <View
      className={`flex-row gap-2 bg-[#614FE0] px-6 py-2 items-center justify-center rounded-lg ${tailwindClass}`}
    >
      <Icon
        name={name}
        color={IconColor}
        size={size}
        onPress={onPress}
        {...rest}
      />
      <MyText style={textStyle} className="text-white font-bold text-lg">
        {titel}
      </MyText>
    </View>
  );
};

export default IconButton;
