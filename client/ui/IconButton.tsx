import { IconProp } from "@/interface";
import Icon from "@expo/vector-icons/FontAwesome";
import { Text, View } from "react-native";

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
  <View className={`flex-row gap-2 bg-[#614FE0] px-6 py-2 items-center justify-center rounded-lg ${tailwindClass}`}>
    <Icon name={name} color={IconColor} size={size} onPress={onPress} {...rest} />
    <Text style={textStyle} className="text-white font-bold text-lg">{titel}</Text>
  </View>
);}

export default IconButton;
