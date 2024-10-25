import { Button, MyText } from '@/ui';
import Feather from '@expo/vector-icons/Feather';
import Octicons from '@expo/vector-icons/Octicons';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

const sizeLabel: { [key: number]: string } = {
  22: 'xxs',
  24: 'xs',
  26: 's',
  28: 'm',
  30: 'l',
  32: 'xl',
  34: 'xxl',
};

const CartProductCard = ({
  item,
  onView,
  onSelect,
  onDelete,
  onQuantityUpdate,
  isSeleceted,
}: ICartProductCard) => {
  const [quantity, setQuantity] = React.useState(item.quantity || 1);
  const [price, setPrice] = React.useState(item.product[0].price);

  let color = isSeleceted ? '#614FE0' : '';
  let backgroundColor = isSeleceted ? '#EFEDFC' : '#ffffff';

  React.useEffect(() => {
    setPrice(quantity * item.product[0].price);
    if (item.quantity !== quantity)
      onSelect(quantity * item.product[0].price, true);
    const timerId = setTimeout(
      () => onQuantityUpdate(quantity, item.productId),
      1500
    );

    return () => clearTimeout(timerId);
  }, [quantity]);

  return (
    <View>
      <TouchableOpacity
        className="rounded-xl p-4"
        style={{ elevation: 1, backgroundColor }}
        onPress={() => onSelect(quantity * item.product[0].price)}
      >
        {/* header */}
        <View className="flex-row items-center justify-between">
          <View>
            {isSeleceted && (
              <View
                style={{ height: 18, aspectRatio: 1 }}
                className="flex items-center justify-center rounded-md bg-[#614FE0] overflow-hidden"
              >
                <Octicons name="check" size={14} color="white" />
              </View>
            )}
          </View>

          <View>
            <TouchableOpacity onPress={onDelete}>
              <Feather name="trash" size={20} color={color || 'red'} />
            </TouchableOpacity>
          </View>
        </View>

        {/* image section */}
        <View className="flex-row items-center space-x-4 my-2">
          <View
            className="rounded-xl overflow-hidden"
            style={{ height: 126, width: 104 }}
          >
            <Image
              source={{
                uri: item?.product?.[0].productImg[0].src,
              }}
              style={{
                resizeMode: 'cover',
                flex: 1,
              }}
            />
          </View>
          <View className="flex-1 items-start justify-center space-y-2">
            <View>
              <MyText
                className="text-black text-[16px] capitalize"
                numberOfLines={1}
              >
                {item?.product?.[0].title}
              </MyText>
            </View>
            <View>
              <MyText
                className="text-black text-[14px] uppercase"
                numberOfLines={1}
              >
                {item?.product?.[0].category}
              </MyText>
            </View>
          </View>
        </View>

        {/* info */}
        <View className="flex-row items-center justify-between my-2">
          <View className="flex-row space-x-3">
            <MyText className="text-[#575758] capitalize text-[14px]">
              {sizeLabel[item.size]} - {item.size}
            </MyText>
            <MyText className="text-[#575758] capitalize text-[14px]">|</MyText>
            <MyText className="text-[#575758] capitalize text-[14px]">
              {item.color}
            </MyText>
            <MyText className="text-[#575758] capitalize text-[14px]">|</MyText>
            <MyText className="text-[#575758]  text-[14px]">x{quantity}</MyText>
          </View>
          <View>
            <MyText className="text-black font-[700] text-[14px]">
              ${price}
            </MyText>
          </View>
        </View>

        {/* actions */}
        <View className="flex-row justify-between items-center mt-4">
          <View className="flex-row items-center">
            <View className="bg-black rounded-full p-1">
              <TouchableOpacity
                onPress={() =>
                  setQuantity((prev) => (prev === 1 ? prev : prev - 1))
                }
              >
                <Feather name="minus" size={18} color="white" />
              </TouchableOpacity>
            </View>
            <View className="w-10">
              <MyText className="text-black font-[500] self-center">
                {quantity}
              </MyText>
            </View>
            <View className="bg-black rounded-full p-1">
              <TouchableOpacity onPress={() => setQuantity((prev) => prev + 1)}>
                <Feather name="plus" size={18} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Button
              title="View"
              tailwindClass={`bg-transparent border border-[${color || '#dadada'}] py-3 rounded-xl px-16`}
              textStyle={{
                color: color || 'black',
                fontSize: 18,
                fontWeight: 500,
              }}
              onPress={onView}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CartProductCard;
