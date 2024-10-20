import { Divider, ProductCard, ProfileIcon } from '@/components';
import { getAllProducts, usePrivateAxios } from '@/services';
import { MyText } from '@/ui';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Octicons from '@expo/vector-icons/Octicons';
import { router } from 'expo-router';
import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  ToastAndroid,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Section = ({
  title,
  productNo,
  products,
  isLoading,
}: {
  title: string;
  productNo: number;
  isLoading: boolean;
  products: Array<IProduct>;
}) => {
  return (
    <>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="p-4 bg-[#eee] rounded-2xl"
      >
        <View
          className="bg-transparent flex-1 justify-center "
          style={{ height: 230, width: 200 }}
        >
          <View>
            <MyText className="text-black text-[24px] font-bold capitalize">
              {title}
            </MyText>
          </View>
          <View>
            <MyText className="text-[#a8a8a8] text-sm capitalize">
              {productNo} products
            </MyText>
          </View>
        </View>
        <View className="flex-row items-center px-4">
          {isLoading ? (
            <>
              <View className="flex-1 items-center justify-center">
                {isLoading && <ActivityIndicator size={'small'} />}
              </View>
            </>
          ) : (
            products
              .slice(0, 5)
              .map((product) => (
                <ProductCard
                  item={product}
                  height={230}
                  key={product._id}
                  tailwindClass="bg-transparent overflow-hidden"
                />
              ))
          )}
        </View>
      </ScrollView>
    </>
  );
};

const profile = () => {
  const axios = usePrivateAxios();
  let paddingHorizontal = 22;

  const [products, setProducts] = React.useState<Array<IProduct> | []>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const getProducts = async () => {
    try {
      setIsLoading(true);
      const response = await getAllProducts({ axios, limit: 20, page: 3 });

      if (response?.products) {
        const products = response.products;

        setProducts(products);
      }
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
    getProducts();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white pb-20">
      <View
        className="flex-row justify-between items-center space-x-2 my-2"
        style={{ marginHorizontal: paddingHorizontal }}
      >
        <View>
          <ProfileIcon />
        </View>
      </View>
      <ScrollView style={{ paddingHorizontal }}>
        {/* heading */}
        <View style={{ paddingVertical: 28 }}>
          <MyText className="text-black font-extrabold text-[42px] capitalize self-center">
            Drawer
          </MyText>
        </View>
        {/* cart and orders */}
        <View className="my-6">
          <View className="py-10">
            <Pressable
              className="flex-row justify-between"
              style={{ paddingHorizontal }}
              onPress={()=>router.push('/(app)/(screen)/cart')}
            >
              <MyText className="font-semibold text-lg">My Cart</MyText>

              <FontAwesome name="opencart" size={24} />
            </Pressable>
          </View>
          <View>
            <Divider />
          </View>
          <View className="py-10">
            <Pressable
              className="flex-row justify-between"
              style={{ paddingHorizontal }}
            >
              <MyText className="font-semibold text-lg">
                My Orders and messages
              </MyText>

              <Octicons name="inbox" size={24} color="black" />
            </Pressable>
          </View>
          <View>
            <Divider />
          </View>
        </View>
        {/* collection section's */}
        <View className="flex-1 space-y-2">
          <View>
            <Section
              isLoading={isLoading}
              productNo={10}
              title="casual & work"
              products={products.slice(0, 5)}
            />
          </View>
          <View>
            <Section
              isLoading={isLoading}
              productNo={20}
              title="summer outfits"
              products={products.slice(5, 10)}
            />
          </View>
          <View>
            <Section
              isLoading={isLoading}
              productNo={22}
              title="vacations "
              products={products.slice(10, 15)}
            />
          </View>
          <View>
            <Section
              isLoading={isLoading}
              productNo={18}
              title="light"
              products={products.slice(15, 20)}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default profile;
