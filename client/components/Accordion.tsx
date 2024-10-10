import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { MyText } from '@/ui';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Accordion = ({
  title,
  data,
}: {
  title: string;
  data?: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return (
    <View
      className="flex-1 border-neutral-700/10"
      style={{
        paddingHorizontal: 22,
        borderWidth: 1,
      }}
    >
      <Pressable
        onPress={() => setIsOpen((prev) => !prev)}
        className="flex-row  py-8 items-center justify-between gap-1 "
      >
        <View>
          <MyText numberOfLines={1} className="text-lg capitalize">
            {title}
          </MyText>
        </View>
        <View>
          <MaterialIcons
            name="arrow-back-ios"
            size={22}
            color="black"
            style={{
              transform: [{ rotate: isOpen ? '90deg' : '-90deg' }],
            }}
          />
        </View>
      </Pressable>
      {isOpen && <View className="flex-1 pt-2 pb-8">{data}</View>}
    </View>
  );
};

export default Accordion;
