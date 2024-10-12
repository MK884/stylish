import { MyText } from '@/ui';
import React from 'react';
import { Dimensions, FlatList, Image, View } from 'react-native';
import ProductCard from './ProductCard';

const StoreOverview = ({ products, store }: StoreOverview) => {
  const paddingHorizontal = 22;
  const { width } = Dimensions.get('screen');

  const peakProducts = products?.filter((_, idx) => idx % 2 === 0);
  const lowestPriceProducts = products?.filter((_, idx) => idx % 2 !== 0);

  return (
    <View className="space-y-12" style={{ paddingVertical: paddingHorizontal }}>
      <View className="space-y-6" style={{ padding: paddingHorizontal }}>
        <MyText className="text-black font-[500] text-[18px]">Highlight</MyText>
        <View className="rounded-2xl overflow-hidden" style={{ height: 200 }}>
          <Image
            source={{ uri: store.thumbnailUrl }}
            style={{ resizeMode: 'cover', flex: 1 }}
          />
        </View>
      </View>
      <View className="space-y-6">
        <View style={{ paddingHorizontal }}>
          <MyText className="text-black font-[500] text-[18px]">
            Peak of our new collection
          </MyText>
        </View>
        <View>
          <FlatList
            data={peakProducts}
            renderItem={({ item }) => (
              <ProductCard item={item} key={item._id} />
            )}
            keyExtractor={(item) => item._id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 18 }}
          />
        </View>
      </View>
      <View className="space-y-6">
        <View style={{ paddingHorizontal }}>
          <MyText className="text-black font-[500] text-[18px]">
            Lowest price ever
          </MyText>
        </View>
        <View>
          <FlatList
            data={lowestPriceProducts}
            renderItem={({ item }) => (
              <ProductCard item={item} key={item._id} />
            )}
            keyExtractor={(item) => item._id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 18 }}
          />
        </View>
      </View>
    </View>
  );
};

export default StoreOverview;
