import { MyText } from '@/ui';
import React from 'react';
import { Dimensions, Image, ScrollView, View } from 'react-native';
import Accordion from './Accordion';
import Divider from './Divider';

const sizeLabel: { [key: number]: string } = {
  22: 'xxs',
  24: 'xs',
  26: 's',
  28: 'm',
  30: 'l',
  32: 'xl',
  34: 'xxl',
};

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
        <MyText
          className="font-[400] capitalize"
          numberOfLines={1}
          style={{ color, fontSize }}
        >
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

const OrderSummary = ({
  address,
  cart,
}: {
  address: Partial<IAddress>;
  cart: Array<ICartProduct>;
}) => {
  const { width } = Dimensions.get('screen');
  const paddingHorizontal = 22;

  const [total, setTotal] = React.useState<number>(0);

  const TAXES = 0;
  const SHIPPING_CHARGE = 5;

  const getSalePrice = (disscount: number, price: number) => {
    const finalPrice = (disscount / 100) * price;
    return price - finalPrice;
  };

  const calculateTotalPrice = () => {
    if (!cart?.length) return;

    const price = cart.reduce((prev, item) => {
      const discount = item.product?.[0].discount ?? 0;
      const price = item.product?.[0].price;

      return prev + getSalePrice(discount, price) * item.quantity;
    }, 0);

    const totalPrice = price + SHIPPING_CHARGE + TAXES;

    setTotal(totalPrice);
  };

  React.useEffect(() => {
    calculateTotalPrice();
  }, []);

  return (
    <ScrollView style={{ width }}>
      <View style={{ paddingBottom: 290 }}>
        {/* cost summary*/}
        <View style={{ padding: paddingHorizontal }} className="space-y-4">
          {cart.map((item) => (
            <View key={item._id}>
              <ProductLabel
                title={item?.product?.[0].title}
                price={item?.product?.[0].price}
              />
            </View>
          ))}
          <View>
            <ProductLabel title="taxes" price={TAXES} />
          </View>
          <View>
            <ProductLabel
              title="shipping"
              price={SHIPPING_CHARGE}
              color="#614FE0"
            />
          </View>

          <View className="border-dashed border-[#dadada] border-t-2" />

          {/* total */}
          <View>
            <ProductLabel title="total" price={total} fontSize={22} />
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

        {/* product info */}
        <View style={{ paddingHorizontal }} className="space-y-6 py-10 my-2 ">
          <View>
            <MyText className="text-black text-[22px] font-[400]">
              Product Information
            </MyText>
          </View>

          <View>
            {cart.map((item) => (
              <ProductCard
                color={item.color}
                quantity={item.quantity}
                size={item.size}
                title={item.product?.[0].title}
                uri={item.product?.[0].productImg[0].src}
                key={item._id}
              />
            ))}
          </View>
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

const ProductCard = ({
  uri,
  title,
  color,
  quantity,
  size,
}: {
  uri: string;
  title: string;
  size: number;
  color: string;
  quantity: number;
}) => {
  return (
    <>
      <View className="flex-row items-center space-x-2 py-4">
        <View
          style={{ height: 70, aspectRatio: 1 }}
          className="overflow-hidden rounded-2xl"
        >
          <Image source={{ uri }} style={{ resizeMode: 'cover', flex: 1 }} />
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
              blue
            </MyText>
            <MyText className="text-[#575758] capitalize text-[14px]">|</MyText>
            <MyText className="text-[#575758] text-[14px]">x {quantity}</MyText>
          </View>
        </View>
      </View>
    </>
  );
};

export default OrderSummary;
