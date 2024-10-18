import { MyText } from '@/ui';
import React from 'react';
import { Pressable, TouchableOpacity, View } from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';

const AddressCard = ({
  item,
  onDelete,
  onEdit,
}: {
  item: IAddress;
  onEdit: () => void;
  onDelete: () => void;
}) => {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  const onDeleteCall = () => {
    setIsVisible(false);
    onDelete();
  };

  const onEditCall = () => {
    setIsVisible(false);
    onEdit();
  };

  return (
    <View>
      <View className="py-6 overflow-hidden">
        <View className="self-start space-y-2">
          <View className="flex-row items-end justify-between w-full relative">
            <View>
              <MyText className="text-black font-bold capitalize text-lg">
                {item?.fullName} - {item?.type}
              </MyText>
            </View>
            <View>
              <Pressable onPress={() => setIsVisible((prev) => !prev)}>
                <Icon name="ellipsis-h" size={20} />
              </Pressable>
            </View>
            {isVisible && (
              <View
                className="bg-white z-10 p-2 absolute right-0 top-6 rounded-xl border space-y-3 border-[#eee]"
                style={{ elevation: 3 }}
              >
                <View>
                  <TouchableOpacity
                    className="flex-row justify-between items-center space-x-3 w-24"
                    onPress={onEditCall}
                  >
                    <View>
                      <MyText className="text-black font-[400] text-[14px]">
                        Edit
                      </MyText>
                    </View>
                    <View>
                      <Feather name="edit" size={20} color="black" />
                    </View>
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity
                    className="flex-row items-center justify-between space-x-3 w-24"
                    onPress={onDeleteCall}
                  >
                    <View>
                      <MyText className="text-red-500 font-[400] text-[14px]">
                        Delete
                      </MyText>
                    </View>
                    <View>
                      <Ionicons name="trash-outline" size={22} color="red" />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
          <View>
            <MyText className="text-neutral-500 text-[15px] capitalize text-start">
              {item?.address}, {item?.city} - {item?.pincode}, {item?.state},
              {item?.country}
            </MyText>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AddressCard;
