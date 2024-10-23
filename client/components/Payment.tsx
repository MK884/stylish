import { Button, MyText } from '@/ui';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Divider from './Divider';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import InputModal from './InputModal';

//#FFF1DC, #FFF2EF , #EFEDFC

const PaymentCard = ({
  backgroundColor = '#FFF1DC',
  isVisa = false,
  cardNum = 1578,
  isSelected = false,
  onPress,
}: {
  backgroundColor?: string;
  isVisa?: boolean;
  cardNum?: number;
  onPress?: () => void;
  isSelected?: boolean;
}) => {
  const height = 35;

  return (
    <View>
      <TouchableOpacity
        className={`p-4 rounded-2xl justify-between `}
        style={{ height: 240, width: 155, backgroundColor }}
        onPress={onPress}
      >
        <View className="flex-row items-center justify-between">
          {isVisa ? (
            <View className="flex-1">
              <Image
                source={require('@/assets/images/visa.png')}
                style={{
                  resizeMode: 'contain',
                  height: 30,
                  width: 60,
                }}
              />
            </View>
          ) : (
            <View className="flex-row items-center justify-start">
              <View
                className="bg-red-600/80 rounded-full z-10"
                style={{
                  height,
                  aspectRatio: 1,
                }}
              />
              <View
                className="bg-orange-400 rounded-full"
                style={{
                  height,
                  aspectRatio: 1,
                  transform: [{ translateX: -15 }],
                }}
              />
              <View />
            </View>
          )}
          {isSelected && (
            <MaterialIcons name="verified" size={24} color="#614FE0" />
          )}
        </View>
        <View className="space-y-2">
          <View>
            <MyText className="text-[16px] text-[#757575] capitalize">
              {isVisa ? 'visa' : 'mastercard'}
            </MyText>
          </View>
          <View>
            <MyText className="text-xl text-black font-[500]">
              ****{cardNum}
            </MyText>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const cardMetaData = [
  {
    id: 1,
    backgroundColor: '#FFF1DC',
    cardNum: 1578,
    isVisia: false,
  },
  {
    id: 2,
    backgroundColor: '#FFF2EF',
    cardNum: 1224,
    isVisia: false,
  },
  {
    id: 3,
    backgroundColor: '#EFEDFC',
    cardNum: 1829,
    isVisia: true,
  },
  {
    id: 4,
    backgroundColor: '#FFF1DC',
    cardNum: 1029,
    isVisia: false,
  },
];

const Payment = () => {
  const { width } = Dimensions.get('screen');
  const paddingHorizontal = 22;
  const router = useRouter();

  const [isModelVisible, setIsModelVisible] = React.useState<boolean | number>(
    false
  );

  const [isCardSelected, setIsCardSelected] = React.useState<number>(-1);

  const onCardSelecte = (id: number) => {
    setIsCardSelected(id);
  };

  const [coupon, setCoupon] = React.useState('');

  return (
    <ScrollView style={{ width }}>
      <View style={{ paddingBottom: 290 }}>
        {/* heading */}
        <View style={{ padding: paddingHorizontal }}>
          <MyText className="text-black font-[400] text-[20px]">
            Select or add a payment method
          </MyText>
        </View>

        {/* cards */}
        <View>
          <View>
            <FlatList
              data={cardMetaData}
              renderItem={({ item }) => (
                <PaymentCard
                  key={item.id}
                  isVisa={item.isVisia}
                  backgroundColor={item.backgroundColor}
                  cardNum={item.cardNum}
                  onPress={() => onCardSelecte(item.id)}
                  isSelected={item.id === isCardSelected}
                />
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{
                gap: 10,
                paddingHorizontal,
              }}
            />
          </View>
          {/* action */}
          <View style={{ padding: paddingHorizontal }}>
            <Button
              title="Add Card"
              tailwindClass="bg-transparent border rounded-2xl border-[#A8A8A9] py-3"
              textStyle={{ color: 'black' }}
              onPress={() => {}}
            />
          </View>
        </View>

        <View className="my-2">
          <Divider />
        </View>

        {/* coupon */}
        <View>
          <Pressable
            className="flex-row items-center justify-between"
            onPress={() => setIsModelVisible(1)}
            style={{ padding: paddingHorizontal }}
          >
            <View>
              <MyText className="text-black font-[500] text-lg capitalize">
                Enter discount coupon
              </MyText>
            </View>
            <View>
              <MaterialIcons
                name="confirmation-num"
                size={24}
                color="#614FE0"
              />
            </View>
          </Pressable>
        </View>

        <View className="my-2">
          <Divider />
        </View>

        {/* other payments */}
        <View style={{ padding: paddingHorizontal }} className="space-y-8">
          <View>
            <MyText className="text-black text-[20px] capitalize">
              other payment methods
            </MyText>
          </View>

          <View>
            <Pressable className="flex-row items-center justify-between">
              <View>
                <MyText className="text-black font-[500] text-lg capitalize">
                  paypal
                </MyText>
              </View>
              <View>
                <MaterialIcons name="paypal" size={24} color="black" />
              </View>
            </Pressable>
          </View>

          <View>
            <Pressable className="flex-row items-center justify-between">
              <View>
                <MyText className="text-black font-[500] text-lg capitalize">
                  e-transfer
                </MyText>
              </View>
              <View>
                <FontAwesome6
                  name="money-bill-transfer"
                  size={22}
                  color="black"
                />
              </View>
            </Pressable>
          </View>

          <View>
            <Pressable className="flex-row items-center justify-between">
              <View>
                <MyText className="text-black font-[500] text-lg uppercase">
                  upi
                </MyText>
              </View>
              <View>
                <FontAwesome5 name="google-pay" size={24} color="black" />
              </View>
            </Pressable>
          </View>

          <View>
            <Pressable className="flex-row items-center justify-between">
              <View>
                <MyText className="text-black font-[500] text-lg capitalize">
                  bank transfer
                </MyText>
              </View>
              <View>
                <MaterialCommunityIcons
                  name="bank-transfer"
                  size={24}
                  color="black"
                />
              </View>
            </Pressable>
          </View>
        </View>

        <InputModal
          isVisible={isModelVisible === 1}
          setIsVisible={setIsModelVisible}
          value={coupon}
          title="Coupon Code"
          onSave={() => {
            if (coupon?.length > 4) {
              ToastAndroid.show(
                'Please enter valid coupon',
                ToastAndroid.CENTER
              );
              return;
            }
            ToastAndroid.show('Coupon added successfully', ToastAndroid.SHORT);
            setIsModelVisible(false);
          }}
          setValue={setCoupon}
        />
      </View>
    </ScrollView>
  );
};

export default Payment;
