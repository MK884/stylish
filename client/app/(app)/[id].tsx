import { ImageBox, StoreLogo } from '@/components';
import { getProductById, usePrivateAxios } from '@/services';
import { MyText } from '@/ui';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Pressable,
  ToastAndroid,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ModalView = () => {
  const paddingHorizontal = 22;
  const axios = usePrivateAxios();
  const router = useRouter();

  const { id } = useLocalSearchParams<{ id: string }>();
  const [product, setProduct] = React.useState<IProduct | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const { height, width } = Dimensions.get('screen');

  const getProduct = async () => {
    if (!id) return;

    setIsLoading(true);
    try {
      const response = (await getProductById({
        axios,
        id: id.toString(),
      })) as IProduct[];
      setProduct(response[0]);
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
    getProduct();
  }, []);

  return (
    <SafeAreaView className="bg-slate-600/20 flex-1">
      <View className="flex-1">
        {isLoading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size={'small'} />
          </View>
        ) : (
          <View
            className="flex items-center justify-center space-y-1"
            style={{ height, width }}
          >
            <View className="" style={{ paddingHorizontal }}>
              <View className="bg-white w-full flex-row justify-between items-center overflow-hidden p-2 px-4 rounded-xl border border-[#dadadada]">
                <View>
                  <MyText className="text-black font-bold capitalize">
                    {product?.store?.[0]?.name}
                  </MyText>
                </View>
                <View style={{ height: 54 }}>
                  <StoreLogo
                    src={product?.store?.[0]?.avatarUrl}
                    size={54}
                    router={router}
                    storeId={product?.store?.[0]?._id}
                  />
                </View>
              </View>
            </View>
            <View className="" style={{ height: 500 }}>
              <FlatList
                data={product?.productImg}
                pagingEnabled
                renderItem={({ item, index }) => (
                  <ImageBox
                    src={item.src}
                    index={index}
                    total={product ? product.productImg.length : 0}
                  />
                )}
                keyExtractor={(item) => item.src}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingHorizontal,
                  gap: 4,
                }}
              />
            </View>
            <View style={{ padding: paddingHorizontal }}>
              <View className="flex-row items-center justify-center gap-4">
                <View>
                  <Pressable
                    className="bg-slate-950/50 h-10 w-10 flex rounded-xl items-center justify-center"
                    onPress={() => router.back()}
                  >
                    <Entypo name="cross" size={24} color="white" />
                  </Pressable>
                </View>
                <View>
                  <Pressable
                    className="bg-slate-950/50 h-10 w-10 flex rounded-xl items-center justify-center"
                    onPress={() =>
                      router.push({
                        pathname: '/(app)/(screen)/[productId]',
                        params: { productId: id },
                      })
                    }
                  >
                    <AntDesign name="right" size={24} color="white" />
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ModalView;
