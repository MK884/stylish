import { SProductCard } from '@/components/OrderSummary';
import { cancelOrder, getOrderById, usePrivateAxios } from '@/services';
import { Button, MyText } from '@/ui';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
  ActivityIndicator,
  ScrollView,
  ToastAndroid,
  View,
} from 'react-native';

const orderTracking = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  if (!id) return;

  const axios = usePrivateAxios();

  const [item, setItem] = React.useState<Partial<IOrder>>({});
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const getOrderDetails = async () => {
    setIsLoading(true);
    try {
      const response = await getOrderById({ axios, orderId: id });

      setItem(response);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      }
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getOrderDetails();
  }, []);

  const onCancel = async () => {
    if (!id) return;

    try {
      const response = await cancelOrder({ axios, orderId: id });
      getOrderDetails();
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      }
    }
  };

  const paddingHorizontal = 22;
  const stepperSize = 14;
  const isPending = item?.status === 'pending';
  const StepperColor = !isPending ? '#f6cece' : '#D3CEF6';
  const activeStepperColor = !isPending ? 'red' : '#614FE0';
  const lastUpdate =
    item?.updatedAt &&
    new Date(item.updatedAt).toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  const router = useRouter();

  // 0, 130, 240, 360
  const stepperWidth: number = 240;

  return (
    <ScrollView className="bg-white ">
      {isLoading ? (
        <View className="flex-1 items-center justify-center z-0">
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        <View className="">
          <View style={{ paddingHorizontal }} className="space-y-6 py-10 my-2 ">
            <View>
              <MyText className="text-black text-[22px] font-[400]">
                Product Information
              </MyText>
            </View>
            <View>
              {item?.cartDetails?.map((item) => (
                <SProductCard
                  color={item.color}
                  quantity={item.quantity}
                  size={item.size}
                  title={item.product?.[0].title}
                  uri={item.product?.[0].productImg[0].src}
                  key={item._id}
                  onPress={() =>
                    router.push({
                      pathname: '/(app)/(screen)/[productId]',
                      params: { productId: item.productId },
                    })
                  }
                />
              ))}
            </View>
          </View>

          {/* stepper */}
          <View
            className="flex-row item-center justify-between relative overflow-x-hidden "
            style={{ margin: paddingHorizontal }}
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
              <View
                className="rounded-full absolute -z-10"
                style={{
                  height: stepperSize + 8,
                  aspectRatio: 1,
                  backgroundColor: 'white',
                  borderColor: activeStepperColor,
                  borderWidth: 3,
                  transform: [
                    {
                      translateX: -4,
                    },
                    {
                      translateY: -4,
                    },
                  ],
                  display: stepperWidth > 0 ? 'none' : 'flex',
                }}
              />
            </View>
            <View>
              <View
                style={{
                  height: stepperSize,
                  aspectRatio: 1,
                  backgroundColor:
                    stepperWidth < 130 ? StepperColor : activeStepperColor,
                }}
                className="rounded-full"
              />
              <View
                className="rounded-full absolute -z-10"
                style={{
                  height: stepperSize + 8,
                  aspectRatio: 1,
                  backgroundColor: 'white',
                  borderColor: activeStepperColor,
                  borderWidth: 3,
                  transform: [
                    {
                      translateX: -4,
                    },
                    {
                      translateY: -4,
                    },
                  ],
                  display: stepperWidth === 130 ? 'flex' : 'none',
                }}
              />
            </View>
            <View>
              <View
                style={{
                  height: stepperSize,
                  aspectRatio: 1,
                  backgroundColor:
                    stepperWidth < 240 ? StepperColor : activeStepperColor,
                }}
                className="rounded-full"
              />
              <View
                className="rounded-full absolute -z-10"
                style={{
                  height: stepperSize + 8,
                  aspectRatio: 1,
                  backgroundColor: 'white',
                  borderColor: activeStepperColor,
                  borderWidth: 3,
                  transform: [
                    {
                      translateX: -4,
                    },
                    {
                      translateY: -4,
                    },
                  ],
                  display: stepperWidth === 240 ? 'flex' : 'none',
                }}
              />
            </View>
            <View>
              <View
                style={{
                  height: stepperSize,
                  aspectRatio: 1,
                  backgroundColor:
                    stepperWidth < 360 ? StepperColor : activeStepperColor,
                }}
                className="rounded-full"
              />
              <View
                className="rounded-full absolute -z-10"
                style={{
                  height: stepperSize + 8,
                  aspectRatio: 1,
                  backgroundColor: 'white',
                  borderColor: activeStepperColor,
                  borderWidth: 3,
                  transform: [
                    {
                      translateX: -4,
                    },
                    {
                      translateY: -4,
                    },
                  ],
                  display: stepperWidth === 360 ? 'flex' : 'none',
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
            <View
              className=" absolute -z-20"
              style={{
                backgroundColor: activeStepperColor,
                height: 5,
                width: stepperWidth,
                transform: [{ translateY: 5 }],
              }}
            />
          </View>

          {/* order info */}
          <View style={{ paddingHorizontal }} className="space-y-6">
            <View>
              <View>
                {/* <MyText className="text-black font-[700] text-[22px] self-start my-2">
                  Your package is on it's way!
                </MyText> */}
                {isPending ? (
                  <MyText className="text-black font-[700] text-[22px] self-start my-2">
                    Your package is on it's way!
                  </MyText>
                ) : (
                  <MyText className="text-red-500 font-[700] text-[22px] self-start my-2">
                    Cancelled on {lastUpdate}
                  </MyText>
                )}
              </View>
              {isPending && (
                <View>
                  <MyText className="text-[#575758] font-[400] text-[18px] self-start ">
                    Arrival estimate: April 15
                  </MyText>
                </View>
              )}
            </View>

            <View>
              <View>
                <MyText className="text-black font-[400] text-[18px] self-start my-2">
                  Your package is near!
                </MyText>
              </View>
              <View>
                <MyText className="text-[#575758] font-[300] text-[16px] self-start ">
                  April 15 : 12: 05
                </MyText>
              </View>
            </View>
            <View>
              <View>
                <MyText className="text-black font-[400] text-[18px] self-start my-2">
                  Your package left the distribution center
                </MyText>
              </View>
              <View>
                <MyText className="text-[#575758] font-[300] text-[16px] self-start ">
                  April 14 : 02: 05
                </MyText>
              </View>
            </View>
            <View>
              <View>
                <MyText className="text-black font-[400] text-[18px] self-start my-2">
                  Your package left the store
                </MyText>
              </View>
              <View>
                <MyText className="text-[#575758] font-[300] text-[16px] self-start ">
                  April 13 : 02: 05
                </MyText>
              </View>
            </View>
          </View>

          {/* shipping info */}
          <View
            style={{ paddingHorizontal }}
            className="space-y-6 py-10 my-4 border-2 border-[#eee]"
          >
            <View>
              <MyText className="text-black text-[22px] font-[400]">
                Shipping Information
              </MyText>
            </View>

            <View className="space-y-2">
              <View>
                <MyText className="text-[#575758] text-[18px] font-[300] capitalize">
                  order address
                </MyText>
              </View>
              <View>
                <MyText className="text-black text-[16px] font-[400] capitalize">
                  {item?.address?.[0]?.address}, {item?.address?.[0]?.city} -{' '}
                  {item?.address?.[0]?.pincode}, {item?.address?.[0]?.state},
                  {item?.address?.[0]?.country}
                </MyText>
              </View>
            </View>

            <View className="space-y-2">
              <View>
                <MyText className="text-[#575758] text-[18px] font-[300] capitalize">
                  receives
                </MyText>
              </View>
              <View>
                <MyText className="text-black text-[16px] font-[400] capitalize">
                  {item?.address?.[0]?.fullName}
                </MyText>
              </View>
            </View>
            <View className="space-y-2">
              <View>
                <MyText className="text-[#575758] text-[18px] font-[300] ">
                  Trackking ID
                </MyText>
              </View>
              <View>
                <MyText className="text-black text-[16px] font-[400] capitalize">
                  {id}
                </MyText>
              </View>
            </View>
          </View>

          {/* action */}
          {isPending && (
            <View style={{ padding: paddingHorizontal }}>
              <Button
                title="Cancel order"
                tailwindClass="bg-white rounded-xl border border-[#dadada] py-3"
                textStyle={{ color: 'black' }}
                onPress={onCancel}
              />
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default orderTracking;
