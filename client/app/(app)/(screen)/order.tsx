import {
  View,
  FlatList,
  Pressable,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import Octicons from '@expo/vector-icons/Octicons';
import { NoProducts, OrderCard } from '@/components';
import { cancelOrder, getAllOrders, usePrivateAxios } from '@/services';

const order = () => {
  const router = useRouter();
  const paddingHorizontal = 22;
  const axios = usePrivateAxios();

  const [orders, setOrders] = React.useState<Array<IOrder>>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const getOrders = async () => {
    setIsLoading(true);
    try {
      const response = await getAllOrders(axios);
      setOrders(response);
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
    getOrders();
  }, []);

  const onView = (id: string) => {
    if (!id) return;
    router.push({
      pathname: '/(app)/(screen)/order-tracking',
      params: { id },
    });
  };

  const onCancel = async (id: string) => {
    if (!id) return;

    try {
      const response = await cancelOrder({ axios, orderId: id });
      getOrders();
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      }
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#eee' }}>
      {/* header */}
      <View
        className="flex-row items-center bg-[#eee] z-10"
        style={[{ paddingHorizontal, height: 60 }]}
      >
        <Pressable onPress={() => router.back()}>
          <Entypo name="cross" size={28} color="black" />
        </Pressable>
        <View className="flex-1">
          <Octicons
            name="inbox"
            size={28}
            color="black"
            style={{ alignSelf: 'center' }}
          />
        </View>
      </View>
      {isLoading ? (
        <View className="flex-1 items-center justify-center z-0">
          <ActivityIndicator size={'large'} />
        </View>
      ) : orders.length ? (
        <ScrollView>
          <View
            className="space-y-2 pb-20"
            style={{ padding: paddingHorizontal }}
          >
            {orders?.map((item) => (
              <View key={item._id}>
                <OrderCard
                  key={item._id}
                  item={item}
                  onCancel={() => onCancel(item._id)}
                  onView={() => onView(item._id)}
                />
              </View>
            ))}
          </View>
        </ScrollView>
      ) : (
        <NoProducts />
      )}
    </SafeAreaView>
  );
};

export default order;
