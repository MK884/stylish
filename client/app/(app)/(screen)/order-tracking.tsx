import { View, Text, ScrollView, ToastAndroid } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Image } from 'react-native';
import { Button, MyText } from '@/ui';
import { getOrderById, usePrivateAxios } from '@/services';

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

  const paddingHorizontal = 22;
  const stepperSize = 14;
  // const StepperColor = '#D3CEF6';
  // const activeStepperColor = '#614FE0';
  const StepperColor = item?.status === 'cancelled' ? '#f6cece' : '#D3CEF6';
  const activeStepperColor = item?.status === 'cancelled' ? 'red' : '#614FE0';

  // 0, 130, 240, 360
  const stepperWidth: number = 240;

  const uri = item?.cartDetails?.[0].product[0].productImg[0].src;
  const title = item?.cartDetails?.[0].product[0].title;
  const size = item?.cartDetails?.[0].size;
  const color = item?.cartDetails?.[0].color;
  const orderId = item?._id?.slice(0, 8);

  return (
    <ScrollView className="bg-white ">
      <View className="">
        {/* image */}
        <View
          style={{ height: 180, width: 150, marginVertical: paddingHorizontal }}
          className="rounded-2xl overflow-hidden self-center"
        >
          <Image
            source={{
              uri: 'https://thehouseofrare.com/cdn/shop/files/henron-yellow-0359.jpg?v=1698919801&_gl=1*1dockzu*_up*MQ..&gclid=Cj0KCQjwpP63BhDYARIsAOQkATYCKSCJsclD5AXdivVuWX3ZqvV45sKEGJhr6ifog8tW6FLuXsJkux4aAh8REALw_wcB',
            }}
            style={{
              resizeMode: 'cover',
              flex: 1,
            }}
          />
        </View>

        {/* info */}
        <View className="flex-1 space-y-2 self-center">
          <View>
            <MyText
              className="capitalize self-center text-black text-[20px] font-[500]"
              numberOfLines={1}
            >
              bershka mom jeans
            </MyText>
          </View>

          <View className="flex-row space-x-3">
            <MyText className="text-[#575758] capitalize text-[16px]">
              {/* {sizeLabel[item.size]} - {item.size} */}s - 26
            </MyText>
            <MyText className="text-[#575758] capitalize text-[16px]">|</MyText>
            <MyText className="text-[#575758] capitalize text-[16px]">
              {/* {item.color} */}
              blue
            </MyText>
            <MyText className="text-[#575758] capitalize text-[16px]">|</MyText>
            <MyText className="text-[#575758] uppercase text-[16px]">
              id : {id}
            </MyText>
          </View>
        </View>

        {/* stepper */}
        <View
          className="flex-row item-center justify-between relative overflow-x-hidden my-10"
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
              <MyText className="text-black font-[700] text-[22px] self-start my-2">
                Your package is on it's way!
              </MyText>
            </View>
            <View>
              <MyText className="text-[#575758] font-[400] text-[18px] self-start ">
                Arrival estimate: April 15
              </MyText>
            </View>
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatem aperiam labore
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
                ava johns
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
        <View style={{ padding: paddingHorizontal }}>
          <Button
            title="Cancel order"
            tailwindClass="bg-white rounded-xl border border-[#dadada] py-3"
            textStyle={{ color: 'black' }}
            onPress={() => {}}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default orderTracking;
