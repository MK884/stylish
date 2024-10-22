import { View, Text, Pressable, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import Octicons from '@expo/vector-icons/Octicons';
import { OrderCard } from '@/components';

const order = () => {
  const router = useRouter();
  const paddingHorizontal = 22;

  const onView = () =>
    router.push({
      pathname: '/(app)/(screen)/order-tracking',
      params: { id: '12334354' },
    });
  const onCancel = () => {};

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

      <ScrollView>
        <View
          className="space-y-2 pb-20"
          style={{ padding: paddingHorizontal }}
        >
          <View>
            <OrderCard onCancel={onCancel} onView={onView} />
          </View>
          <View>
            <OrderCard onCancel={onCancel} onView={onView} />
          </View>
          <View>
            <OrderCard onCancel={onCancel} onView={onView} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default order;
