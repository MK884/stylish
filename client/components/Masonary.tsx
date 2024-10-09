import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  ToastAndroid,
} from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native';
import ProductImage from './ProductImage';
import NoProducts from './NoProducts';
import { getAllProducts, usePrivateAxios } from '@/services';

interface MasonaryProps {
  isLoading: boolean;
  products: IProduct[];
  category: category | 'All';
  search?: string;
  limit: number;
  total: number;
  page: number;
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Masonary = ({
  category,
  isLoading,
  products,
  limit,
  search,
  total,
  page,
  setPage,
  setProducts,
}: MasonaryProps) => {
  const axios = usePrivateAxios();

  const fetchNextPage = async () => {
    if (!(page + 1 <= Math.ceil(total / limit))) return;

    try {
      const response = await getAllProducts({
        axios,
        page: page + 1,
        search,
        category,
      });
      setProducts((prev) => [...prev, ...response?.products]);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      }
      setPage((prev) => prev + 1);
    }
  };

  const leftProducts = products && products.filter((_, idx) => idx % 2 !== 0);
  const rightProducts = products && products.filter((_, idx) => idx % 2 === 0);

  //   return (
  //     <View >
  //       <View style={{ flex: 1 }}>
  //         {isLoading ? (
  //           <View className="flex-1 items-center justify-center z-0">
  //             <ActivityIndicator size={'large'} />
  //           </View>
  //         ) : products.length ? (
  //           <View className="flex-row items-center justify-center flex-1">
  //             <View className="flex-1">
  //               <FlatList
  //                 style={{ flex: 1 }}
  //                 data={products}
  //                 numColumns={2}
  //                 keyExtractor={(item) => item._id}
  //                 contentContainerStyle={{ flex: 1 }}
  //                 onEndReachedThreshold={60}
  //                 onEndReached={() => fetchNextPage()}
  //                 renderItem={({ item, index }) => (
  //                   <ProductImage
  //                     item={item}
  //                     height={index % 3 === 0 ? 300 : 200}
  //                     index={index}
  //                     key={index}
  //                   />
  //                 )}
  //               />
  //             </View>
  //             <View className="flex-1">
  //             <FlatList
  //               style={{ flex: 1 }}
  //               data={rightProducts}
  //               keyExtractor={(item) => item._id}
  //               renderItem={({ item, index }) => (
  //                 <ProductImage
  //                   item={item}
  //                   height={index % 3 === 0 ? 200 : 300}
  //                   index={index}
  //                   key={index}
  //                 />
  //               )}
  //             />
  //           </View>
  //           </View>
  //         ) : (
  //           <NoProducts />
  //         )}
  //       </View>
  //     </View>
  //   );
  return (
    <View
      className="bg-red-300 flex-1 "
      style={{ width: '100%', height: '100%', flex: 1 }}
    >
      <FlatList
        style={{ flex: 1 }}
        data={products}
        numColumns={2}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ flex: 1 }}
        onEndReachedThreshold={60}
        onEndReached={() => fetchNextPage()}
        renderItem={({ item, index }) => (
          <ProductImage
            item={item}
            height={index % 3 === 0 ? 300 : 200}
            index={index}
            key={index}
          />
        )}
      />
    </View>
  );
};

export default Masonary;
