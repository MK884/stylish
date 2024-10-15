import { MyText } from '@/ui';
import { Pressable, View } from 'react-native';
import Octicons from '@expo/vector-icons/Octicons';

const CheckBoxLabel = ({
  isDisable,
  isSelected,
  label,
  onPress,
  size,
  leftContent,
}: {
  label?: string;
  size?: number;
  isSelected: boolean;
  onPress: () => void;
  isDisable: boolean;
  leftContent?: React.ReactNode;
}) => {
  return (
    <Pressable
      className={`items-center justify-between flex-row w-full px-3 rounded-2xl my-1 h-14 ${isSelected ? 'bg-[#EFEDFC]' : ''}`}
      onPress={onPress}
      disabled={isDisable}
    >
      {leftContent ? (
        leftContent
      ) : (
        <View className="flex-1 flex-row gap-4">
          <MyText
            className={`font-bold text-[16px] ${isDisable ? 'text-[#dadada]' : ''}`}
          >
            {size}
          </MyText>
          <MyText
            className={`uppercase text-[16px] ${isDisable ? 'text-[#dadada]' : ''}`}
          >
            {label}
          </MyText>
        </View>
      )}
      {isSelected && (
        <View
          style={{ height: 22, aspectRatio: 1 }}
          className="flex items-center justify-center rounded-lg bg-[#614FE0] overflow-hidden"
        >
          <Octicons name="check" size={16} color="white" />
        </View>
      )}
    </Pressable>
  );
};

export default CheckBoxLabel;
