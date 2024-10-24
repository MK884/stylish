import { Address, OrderSummary, Payment } from '@/components';
import { getCartById, usePrivateAxios } from '@/services';
import { Button, MyText } from '@/ui';
import Feather from '@expo/vector-icons/Feather';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Pressable, ToastAndroid, View } from 'react-native';
import Animated, {
  FadeInDown,
  interpolate,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const chcekout = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const paddingHorizontal = 22;
  const HEADER_HEIGHT = 60;
  const StepperColor = '#D3CEF6';
  const activeStepperColor = '#614FE0';
  const stepperSize = 14;
  const boxHeight = 170;

  const INITIAL_WIDTH = 0;
  const MID_WIDTH = 150;
  const FINAL_WIDTH = 290;

  // 0, 1, 2
  const [index, setIndex] = React.useState(0);
  const [selectedAddress, setSelectedAddress] = React.useState<
    Partial<IAddress>
  >({});
  const [cartItem, setCartItem] = React.useState<Array<ICartProduct>>([]);
  const [total, setTotal] = React.useState<number>(0);

  const TAXES = 0;
  const SHIPPING_CHARGE = 5;

  const stepperStyle = useAnimatedStyle(() => {
    const width = withSpring(
      interpolate(index, [0, 1, 2], [INITIAL_WIDTH, MID_WIDTH, FINAL_WIDTH])
    );

    return {
      width,
    };
  });

  const snapToIndex = (index: number) => {
    if (index < 0 || index > 2) return;

    setIndex(index);
  };

  const router = useRouter();
  const { width } = Dimensions.get('screen');
  const axios = usePrivateAxios();

  const onAddressSelected = (item: IAddress) => {
    if (!item) return;
    setSelectedAddress(item);
  };

  const getCartItems = async () => {
    if (!id) return;

    try {
      const response = await getCartById({ axios, cartId: id });

      setCartItem(response);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      }
    }
  };

  const getSalePrice = (disscount: number, price: number) => {
    const finalPrice = (disscount / 100) * price;
    return price - finalPrice;
  };

  const calculateTotalPrice = () => {
    if (!cartItem?.length) return;

    const price = cartItem.reduce((prev, item) => {
      const discount = item.product?.[0].discount ?? 0;
      const price = item.product?.[0].price;

      return prev + getSalePrice(discount, price) * item.quantity;
    }, 0);

    const totalPrice = price + SHIPPING_CHARGE + TAXES;

    setTotal(totalPrice);
  };

  React.useEffect(() => {
    getCartItems();
  }, []);

  React.useEffect(() => {
    calculateTotalPrice();
  }, [cartItem]);

  const data = [
    <Address
      setUserAddress={onAddressSelected}
      userAddress={selectedAddress}
    />,
    <Payment />,
    <OrderSummary address={selectedAddress} cart={cartItem} />,
  ];

  return (
    <SafeAreaView className="bg-white flex-1">
      <View>
        {/* header */}
        <View
          className="justify-center items-center bg-white flex-row"
          style={[{ paddingHorizontal, height: HEADER_HEIGHT }]}
        >
          <View>
            <Pressable onPress={() => router.back()}>
              <Feather name="arrow-left" size={28} color="black" />
            </Pressable>
          </View>

          {/* stepper */}

          <View
            className="flex-row flex-1 item-center justify-between relative overflow-x-hidden"
            style={{ marginHorizontal: paddingHorizontal }}
          >
            <View>
              <View
                style={{
                  height: stepperSize,
                  aspectRatio: 1,
                  backgroundColor: activeStepperColor,
                }}
                className="rounded-full"
              />
              <Animated.View
                className="rounded-full absolute -z-10"
                style={{
                  height: stepperSize + 8,
                  aspectRatio: 1,
                  backgroundColor: 'white',
                  borderColor: '#614FE0',
                  borderWidth: 3,
                  transform: [
                    {
                      translateX: -4,
                    },
                    {
                      translateY: -4,
                    },
                  ],
                  display: index > 0 ? 'none' : 'flex',
                }}
              />
            </View>
            <View>
              <Animated.View
                style={{
                  height: stepperSize,
                  aspectRatio: 1,
                  backgroundColor:
                    index < 1 ? StepperColor : activeStepperColor,
                }}
                className="rounded-full"
              />
              <Animated.View
                className="rounded-full absolute -z-10"
                style={{
                  height: stepperSize + 8,
                  aspectRatio: 1,
                  backgroundColor: 'white',
                  borderColor: '#614FE0',
                  borderWidth: 3,
                  transform: [
                    {
                      translateX: -4,
                    },
                    {
                      translateY: -4,
                    },
                  ],
                  display: index === 1 ? 'flex' : 'none',
                }}
              />
            </View>
            <View>
              <Animated.View
                style={{
                  height: stepperSize,
                  aspectRatio: 1,
                  backgroundColor:
                    index < 2 ? StepperColor : activeStepperColor,
                }}
                className="rounded-full"
              />
              <Animated.View
                className="rounded-full absolute -z-10"
                style={{
                  height: stepperSize + 8,
                  aspectRatio: 1,
                  backgroundColor: 'white',
                  borderColor: '#614FE0',
                  borderWidth: 3,
                  transform: [
                    {
                      translateX: -4,
                    },
                    {
                      translateY: -4,
                    },
                  ],
                  display: index === 2 ? 'flex' : 'none',
                }}
              />
            </View>

            <View
              className="w-full absolute -z-20"
              style={{
                backgroundColor: StepperColor,
                height: 5,
                transform: [{ translateY: 5 }],
              }}
            />
            <Animated.View
              className=" absolute -z-20"
              style={[
                {
                  backgroundColor: activeStepperColor,
                  height: 5,
                  transform: [{ translateY: 5 }],
                },
                stepperStyle,
              ]}
            />
          </View>
        </View>

        <View>{data[index]}</View>
      </View>

      {/* bottom box */}
      <Animated.View
        entering={FadeInDown.duration(450)}
        className="bg-white absolute bottom-0 rounded-t-3xl z-10 border border-[#dadada]"
        style={{
          height: boxHeight,
          width: '100%',
          elevation: 5,
          padding: paddingHorizontal,
        }}
      >
        <View className="">
          <View className="flex-row items-center justify-between mb-7">
            <View>
              <MyText className="text-lg">Subtotal (VAT included) </MyText>
            </View>
            <View>
              <MyText className="text-black font-[700] text-[18px]">
                ${total}
              </MyText>
            </View>
          </View>

          <View className="flex-row items-center space-x-2">
            {index > 0 && (
              <View className="flex-1">
                <Button
                  title="Previous"
                  tailwindClass="rounded-2xl bg-white border border-[#dadada]"
                  onPress={() => snapToIndex(index - 1)}
                  textStyle={{ color: 'black' }}
                />
              </View>
            )}
            {index < 2 && (
              <View className="flex-1">
                <Button
                  title="Continue"
                  tailwindClass="rounded-2xl"
                  onPress={() => snapToIndex(index + 1)}
                  disabled={!selectedAddress._id}
                />
              </View>
            )}
            {index == 2 && (
              <View className="flex-1">
                <Button
                  title="Pay"
                  tailwindClass="rounded-2xl"
                  onPress={() => router.replace('/(app)/(screen)/order')}
                />
              </View>
            )}
          </View>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default chcekout;
