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
  item,
}: {
  onView: () => void;
  onCancel: () => void;
  item: IOrder;
}) => {
  const StepperColor = item.status === 'cancelled' ? '#f6cece' : '#D3CEF6';
  const activeStepperColor = item.status === 'cancelled' ? 'red' : '#614FE0';
  const stepperSize = 14;

  // 0, 110, 210, 310
  const stepperWidth = 210;

  const uri = item.cartDetails[0].product[0].productImg[0].src;
  const title = item.cartDetails[0].product[0].title;
  const size = item.cartDetails[0].size;
  const color = item.cartDetails[0].color;
  const id = item._id.slice(0, 8);

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
              uri,
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
              {title}
            </MyText>
          </View>

          <View className="flex-row space-x-3">
            <MyText className="text-[#575758] capitalize text-[14px]">
              {sizeLabel[size]} - {size}
            </MyText>
            <MyText className="text-[#575758] capitalize text-[14px]">|</MyText>
            <MyText className="text-[#575758] capitalize text-[14px]">
              {color}
            </MyText>
            <MyText className="text-[#575758] capitalize text-[14px]">|</MyText>
            <MyText className="text-[#575758] uppercase text-[14px]">
              id : {id}
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
        {item.status === 'pending' && (
          <View>
            <Button
              title="Cancel order"
              tailwindClass="bg-white rounded-xl border border-[#dadada] py-3"
              textStyle={{ color: 'black' }}
              onPress={onCancel}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default OrderCard;
