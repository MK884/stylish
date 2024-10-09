import {
  View,
  ScrollView,
  ActivityIndicator,
  ToastAndroid,
  FlatList,
} from 'react-native';
import React from 'react';
import Banner from './Banner';
import { MyText } from '@/ui';
import StoreCard from './StoreCard';
import ProductCard from './ProductCard';
import { RenderItem } from './DisplayProducts';
import { getAllProducts, getAllStore, usePrivateAxios } from '@/services';
import Feather from '@expo/vector-icons/Feather';
import { freshCollection } from '@/db';

const Featured = () => {
  const axios = usePrivateAxios();
  let paddingHorizontal = 22;

  const [page, setPage] = React.useState<number>(0);
  const [limit, setLimit] = React.useState<number>(5);
  const [total, setTotal] = React.useState<number>(0);
  const [stores, setStores] = React.useState<Array<IStore> | []>([]);
  const [productOnSale, setProductOnSale] = React.useState<
    Array<IProduct> | []
  >([]);
  const [isProductOnSaleLoading, setIsProductOnSaleLoading] =
    React.useState<boolean>(false);

  const getStores = async () => {
    try {
      const response = await getAllStore(axios);

      setStores(response);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      }
    }
  };

  const getProducts = async () => {
    try {
      setIsProductOnSaleLoading(true);
      const response = await getAllProducts({ axios, limit, page });
      setTotal(response?.total);
      if (response?.products) {
        const products = response.products?.filter(
          (item: IProduct) => item?.discount
        );

        setProductOnSale((prev) => [...prev, ...products]);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      }
    } finally {
      setIsProductOnSaleLoading(false);
    }
  };

  React.useEffect(() => {
    getStores();
  }, []);

  React.useEffect(() => {
    getProducts();
  }, [page]);
  return (
    <ScrollView>
      <View style={{ marginBottom: 80 }}>
        <View>
          <Banner />
        </View>
        <View
          style={{
            marginVertical: 16,
            gap: 20,
          }}
        >
          <View
            className="flex-row justify-between items-center"
            style={{ marginHorizontal: paddingHorizontal }}
          >
            <View>
              <MyText className="font-bold text-lg">New Store</MyText>
            </View>
            <View>
              <Feather name="arrow-right" size={22} color="black" />
            </View>
          </View>
          <View>
            <FlatList
              data={stores}
              renderItem={({ item }) => <StoreCard item={item} />}
              keyExtractor={(item) => item._id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                gap: 20,
                paddingHorizontal,
              }}
            />
          </View>
        </View>
        <View
          style={{
            marginVertical: 16,
            gap: 20,
          }}
        >
          <View
            className="flex-row justify-between items-center"
            style={{ marginHorizontal: paddingHorizontal }}
          >
            <View>
              <MyText className="font-bold text-lg">Products on sale</MyText>
            </View>
            <View>
              <Feather name="arrow-right" size={22} color="black" />
            </View>
          </View>
          <View>
            <FlatList
              data={productOnSale}
              renderItem={({ item }) => <ProductCard item={item} />}
              keyExtractor={(item) => item._id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 20, paddingHorizontal }}
              ListFooterComponent={() => (
                <>
                  <View className="flex-1 items-center justify-center">
                    {isProductOnSaleLoading && (
                      <ActivityIndicator size={'small'} />
                    )}
                  </View>
                </>
              )}
              onEndReachedThreshold={60}
              onEndReached={() =>
                setPage((prev) =>
                  prev <= Math.ceil(total / limit) ? prev + 1 : prev
                )
              }
            />
          </View>
        </View>
        <View
          style={{
            marginHorizontal: paddingHorizontal,
            marginVertical: 16,
            gap: 20,
          }}
        >
          <View className="flex-row justify-between items-center">
            <View>
              <MyText className="font-bold text-lg">Fresh collections</MyText>
            </View>
            <View>
              <Feather name="arrow-right" size={22} color="black" />
            </View>
          </View>
          <View>
            <FlatList
              data={freshCollection}
              renderItem={({ item }) => (
                <RenderItem
                  data={item}
                  imgWidth={180}
                  imgHeight={180}
                  isStore
                />
              )}
              keyExtractor={(item) => item.id?.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 25 }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Featured;