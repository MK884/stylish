import { StoreLogo } from '@/components';
import { getAllStore, usePrivateAxios } from '@/services';
import { MyText } from '@/ui';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
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

const stores = () => {
  const { width } = Dimensions.get('window');
  let paddingHorizontal = 22;
  const axios = usePrivateAxios();

  const router = useRouter();

  const [stores, setStores] = React.useState<Array<IStore> | []>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const getStores = async () => {
    try {
      setIsLoading(true);
      const response = await getAllStore(axios);

      setStores(response);
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
    getStores();
  }, []);

  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="my-4" style={{ width, paddingHorizontal }}>
        <Pressable onPress={() => router.back()}>
          <Feather name="arrow-left" size={28} color="black" />
        </Pressable>
      </View>
      <View
        style={{ paddingHorizontal }}
        className="py-20 flex gap-4 items-center"
      >
        <View>
          <MyText className="text-black font-extrabold text-4xl">
            New stores
          </MyText>
        </View>
        <View>
          <MyText className="text-[#6E6E70] text-lg">
            Explore the brands that just joined Stylish!
          </MyText>
        </View>
      </View>
      <View
        style={{
          paddingHorizontal,
          width,
          flex: 1,
          //   paddingBottom: paddingHorizontal,
        }}
        className=""
      >
        {isLoading ? (
          <View className="flex-1 items-center justify-center z-0">
            <ActivityIndicator size={'large'} />
          </View>
        ) : (
          <View className="">
            <FlatList
              data={stores}
              renderItem={({ item, index }) => (
                <StoreLogo
                  key={index}
                  name={item.name}
                  src={item.avatarUrl}
                  router={router}
                  storeId={item._id}
                  styles={{ marginHorizontal: 18 }}
                />
              )}
              numColumns={3}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                gap: 40,
                alignItems: 'center',
              }}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default stores;
