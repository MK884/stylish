import { Button, MyText } from '@/ui';
import React from 'react';
import { ActivityIndicator, Dimensions, ScrollView, View } from 'react-native';

import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { getAddress, usePrivateAxios } from '@/services';

const AddressCard = ({
  item,
  onPress,
  isSelected = false,
}: {
  item: IAddress;
  isSelected?: boolean;
  onPress?: () => void;
}) => {
  const CheckBoxSize = 12;
  const activeColor = isSelected ? '#614FE0' : '#bababa';
  const backgroundColor = isSelected ? '#EFEDFC' : '#fff';

  return (
    <View>
      <TouchableOpacity
        className="py-6 px-3 flex-row items-center rounded-xl justify-center overflow-hidden"
        style={{ backgroundColor }}
        onPress={onPress}
      >
        <View className="flex-1  space-y-3">
          <View>
            <MyText className="text-black font-bold capitalize text-lg">
              {item?.fullName} - {item?.type}
            </MyText>
          </View>
          <View>
            <MyText className="text-neutral-500 text-[15px] tracking-wider capitalize text-start">
              {item?.address}, {item?.city} - {item?.pincode}, {item?.state},
              {item?.country}
            </MyText>
          </View>
          <View className="flex-row gap-2">
            <MyText className="text-[#614FE0] text-[14px] font-[500] capitalize text-start">
              Arrival est: Apr 15
            </MyText>
            <MyText className="text-black text-[14px] font-[500] tracking-widest capitalize text-start">
              $0 shipping
            </MyText>
          </View>
        </View>
        {/* chcekbox */}
        <View>
          {isSelected && (
            <>
              <View
                className="rounded-full z-10 absolute"
                style={{
                  height: CheckBoxSize,
                  aspectRatio: 1,
                  backgroundColor: activeColor,
                  transform: [
                    {
                      translateX: 4,
                    },
                    {
                      translateY: 4,
                    },
                  ],
                }}
              />
            </>
          )}
          <View
            className="rounded-full border-2"
            style={{
              height: CheckBoxSize + 8,
              aspectRatio: 1,
              backgroundColor: 'transparent',
              borderColor: activeColor,
            }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const Address = ({
  setUserAddress,
  userAddress,
}: {
  setUserAddress: (item: IAddress) => void;
  userAddress?: Partial<IAddress>;
}) => {
  const { width, height } = Dimensions.get('screen');
  const paddingHorizontal = 22;

  const router = useRouter();
  const axios = usePrivateAxios();

  const [address, setAddress] = React.useState<Array<IAddress>>([]);
  const [selectedAddress, setSelectedAddress] = React.useState<
    Partial<IAddress>
  >(userAddress || {});
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const fetchCurrentUserAddress = async () => {
    try {
      setIsLoading(true);
      const address = await getAddress(axios);
      setAddress(address);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchCurrentUserAddress();
  }, []);

  const onAddressSelected = (item: IAddress) => {
    if (!item) return;
    setSelectedAddress(item);
    setUserAddress(item);
  };

  return (
    <ScrollView style={{ width, height }}>
      <View style={{ paddingBottom: 290 }}>
        {/* heading */}
        <View style={{ padding: paddingHorizontal }}>
          <MyText className="text-black font-[400] text-[20px]">
            Select or add a shipping address
          </MyText>
        </View>

        {/* address box */}
        {isLoading ? (
          <>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ActivityIndicator size={'large'} />
            </View>
          </>
        ) : address.length ? (
          <View style={{ padding: 11 }}>
            {address.map((item) => (
              <AddressCard
                key={item._id}
                item={item}
                onPress={() => onAddressSelected(item)}
                isSelected={item._id === selectedAddress._id}
              />
            ))}
          </View>
        ) : (
          <View className="flex-1 my-2 h-96 justify-center">
            <MyText className="capitalize text-slate-400 font-bold text-lg self-center">
              no address added
            </MyText>
          </View>
        )}

        {/* action */}
        <View style={{ padding: paddingHorizontal }}>
          <Button
            title="Add Address"
            tailwindClass="bg-transparent border rounded-2xl border-[#A8A8A9] py-3"
            textStyle={{ color: 'black' }}
            onPress={() => router.push({ pathname: '/(app)/(screen)/form' })}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Address;
