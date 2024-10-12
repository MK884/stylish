import {
  View,
  Text,
  ToastAndroid,
  Dimensions,
  Image,
  Pressable,
} from 'react-native';
import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { getProductsByStoreId, usePrivateAxios } from '@/services';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { MyText } from '@/ui';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { AboutStore, CategoryLabel, StoreOverview } from '@/components';
import Feather from '@expo/vector-icons/Feather';

const storePage = () => {
  const { storeId } = useLocalSearchParams<{ storeId: string }>();

  if (!storeId) return;

  const LOGO_SIZE = 120;
  const paddingHorizontal = 22;

  const axios = usePrivateAxios();
  const { height, width } = Dimensions.get('window');

  const [store, setStore] = React.useState<IStore | null>(null);
  const [total, setTotal] = React.useState<number>(0);
  const [products, setProducts] = React.useState<Array<IProduct> | []>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = React.useState<
    'overview' | 'about' | string
  >('overview');

  const getDetails = async () => {
    try {
      setIsLoading(true);
      const response = await getProductsByStoreId({ axios, storeId });

      if (response) {
        setStore(response[0].store[0]);
        setProducts(response);
        setTotal(response?.length);
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
    getDetails();
  }, []);

  const tabs: tab[] = [
    {
      label: 'overview',
      content:
        products && store ? (
          <StoreOverview store={store} products={products} />
        ) : (
          <MyText>Loading...</MyText>
        ),
    },
    {
      label: 'about',
      content: store ? (
        <AboutStore store={store} key={store._id} total={total} />
      ) : (
        <MyText>Loading....</MyText>
      ),
    },
  ];

  return (
    <SafeAreaView className="bg-white" style={{ height, width }}>
      <View className="py-2" style={{ width, paddingHorizontal }}>
        <Pressable onPress={() => router.back()}>
          <Feather name="arrow-left" size={28} color="black" />
        </Pressable>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-1 items-center space-y-2 pt-28">
          <View
            className="rounded-full overflow-hidden border-2 border-[#dadada] my-4"
            style={{ height: LOGO_SIZE, aspectRatio: 1 }}
          >
            <Image
              source={{ uri: store?.avatarUrl }}
              style={{ resizeMode: 'contain', flex: 1 }}
            />
          </View>
          <View>
            <MyText className="text-black font-extrabold text-[32px] capitalize">
              {store?.name}
            </MyText>
          </View>
          <View className="flex-row gap-2">
            <MaterialIcons name="verified" size={24} color="green" />
            <MyText className="text-[#868687] text-[16px]">
              Verified official store
            </MyText>
          </View>
        </View>
        <View>
          <View
            style={{ marginLeft: paddingHorizontal }}
            className="flex-row my-2 items-center justify-center"
          >
            {tabs?.map((item) => (
              <CategoryLabel
                isSelected={item?.label === selectedCategory}
                label={item.label}
                onPress={() => setSelectedCategory(item.label)}
                key={item.label}
              />
            ))}
          </View>
          {tabs.map((tab) => tab.label === selectedCategory && tab.content)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default storePage;
