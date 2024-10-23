import { View, Dimensions, ScrollView } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { MyText } from '@/ui';
import Divider from './Divider';
import Accordion from './Accordion';

const ProductLabel = ({
  title,
  price,
  color = 'black',
  fontSize = 16,
}: {
  title: string;
  price: number;
  color?: string;
  fontSize?: number;
}) => {
  return (
    <View className="flex-row items-center justify-between">
      <View>
        <MyText className="font-[400] capitalize" style={{ color, fontSize }}>
          {title}
        </MyText>
      </View>
      <View>
        <MyText className="text-[16px] font-[500]" style={{ color, fontSize }}>
          ${price}
        </MyText>
      </View>
    </View>
  );
};

const OrderSummary = ({ address }: { address: Partial<IAddress> }) => {
  const { width } = Dimensions.get('screen');
  const paddingHorizontal = 22;
  const router = useRouter();
  return (
    <ScrollView style={{ width }}>
      <View style={{ paddingBottom: 290 }}>
        {/* cost summary*/}
        <View style={{ padding: paddingHorizontal }} className="space-y-4">
          <View>
            <ProductLabel title="bershka moma jeans" price={35} />
          </View>
          <View>
            <ProductLabel title="bershka  jacket" price={35} />
          </View>
          <View>
            <ProductLabel title="taxes" price={0} />
          </View>
          <View>
            <ProductLabel title="shipping" price={2} color="#614FE0" />
          </View>

          <View className="border-dashed border-[#dadada] border-t-2" />

          {/* total */}
          <View>
            <ProductLabel title="total" price={72} fontSize={22} />
          </View>
        </View>

        <View className="my-2">
          <Divider />
        </View>

        {/* order info */}
        <View style={{ paddingHorizontal }} className="space-y-6 py-10 my-2 ">
          <View>
            <MyText className="text-black text-[22px] font-[400]">
              Order Information
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
                {address?.address}, {address?.city} - {address?.pincode},{' '}
                {address?.state},{address?.country}
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
                {address?.fullName}
              </MyText>
            </View>
          </View>
          <View className="space-y-2">
            <View>
              <MyText className="text-[#575758] text-[18px] font-[300] ">
                payment method
              </MyText>
            </View>
            <View>
              <MyText className="text-black text-[16px] font-[400] capitalize">
                mastercard ending in 2027
              </MyText>
            </View>
          </View>
        </View>

        <View className="my-2">
          <Divider />
        </View>

        {/* return policies */}
        <View>
          <Accordion
            data={
              <MyText>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
                exercitationem porro saepe a veniam odit dolores expedita odio
                doloribus iusto, accusantium dignissimos voluptas sint
                blanditiis libero tempora quibusdam molestiae quo? Pariatur
                eligendi ducimus officia, quos repellat eveniet alias facere
                esse.
              </MyText>
            }
            title="shipping and return policies"
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default OrderSummary;
