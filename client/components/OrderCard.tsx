import { View, Text, Image } from 'react-native';
import React from 'react';
import { useSharedValue } from 'react-native-reanimated';
import { Button, MyText } from '@/ui';

const sizeLabel: { [key: number]: string } = {
  22: 'xxs',
  24: 'xs',
  26: 's',
  28: 'm',
  30: 'l',
  32: 'xl',
  34: 'xxl',
};

const OrderCard = ({
  onView,
  onCancel,
}: {
  onView: () => void;
  onCancel: () => void;
}) => {
  const StepperColor = '#D3CEF6';
  const activeStepperColor = '#614FE0';
  const stepperSize = 14;

  // 0, 110, 210, 310
  const stepperWidth = 210;

  return (
    <View className="bg-white rounded-2xl border border-[#dadada] p-6">
      {/* stepper */}
      <View className="flex-row item-center justify-between relative overflow-hidden my-2">
        <View
          style={{
            height: stepperSize,
            aspectRatio: 1,
            backgroundColor: activeStepperColor,
          }}
          className="rounded-full"
        />
        <View
          style={{
            height: stepperSize,
            aspectRatio: 1,
            backgroundColor:
              stepperWidth < 110 ? StepperColor : activeStepperColor,
          }}
          className="rounded-full"
        />
        <View
          style={{
            height: stepperSize,
            aspectRatio: 1,
            backgroundColor:
              stepperWidth < 210 ? StepperColor : activeStepperColor,
          }}
          className="rounded-full"
        />
        <View
          style={{
            height: stepperSize,
            aspectRatio: 1,
            backgroundColor:
              stepperWidth < 310 ? StepperColor : activeStepperColor,
          }}
          className="rounded-full"
        />

        <View
          className="w-full absolute -z-10"
          style={{
            backgroundColor: StepperColor,
            height: 5,
            transform: [{ translateY: 5 }],
          }}
        />
        <View
          className=" absolute -z-10"
          style={{
            backgroundColor: activeStepperColor,
            height: 5,
            width: stepperWidth,
            transform: [{ translateY: 5 }],
          }}
        />
      </View>
      <View>
        <MyText className="text-black font-[700] text-[22px] self-start my-4">
          Your package is on it's way!
        </MyText>
      </View>
      <View>
        <MyText className="text-[#575758] font-[400] text-[16px] self-start ">
          Arrival estimate: April 15
        </MyText>
      </View>
      <View className="flex-row items-center space-x-2 my-4">
        <View
          style={{ height: 90, width: 80 }}
          className="rounded-2xl overflow-hidden"
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
        <View className="flex-1 space-y-2">
          <View>
            <MyText
              className="capitalize text-black text-lg font-[500]"
              numberOfLines={1}
            >
              bershka mom jeans
            </MyText>
          </View>

          <View className="flex-row space-x-3">
            <MyText className="text-[#575758] capitalize text-[14px]">
              {/* {sizeLabel[item.size]} - {item.size} */}s - 26
            </MyText>
            <MyText className="text-[#575758] capitalize text-[14px]">|</MyText>
            <MyText className="text-[#575758] capitalize text-[14px]">
              {/* {item.color} */}
              blue
            </MyText>
            <MyText className="text-[#575758] capitalize text-[14px]">|</MyText>
            <MyText className="text-[#575758] uppercase text-[14px]">
              id : 1912929
            </MyText>
          </View>
        </View>
      </View>

      {/* actions */}
      <View className="space-y-2 mt-3">
        <View>
          <Button
            title="More info"
            tailwindClass="bg-white rounded-xl border border-[#dadada] py-3"
            textStyle={{ color: 'black' }}
            onPress={onView}
          />
        </View>
        <View>
          <Button
            title="Cancel order"
            tailwindClass="bg-white rounded-xl border border-[#dadada] py-3"
            textStyle={{ color: 'black' }}
            onPress={onCancel}
          />
        </View>
      </View>
    </View>
  );
};

export default OrderCard;
