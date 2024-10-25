import { CategoryLabel, Masonary } from '@/components';
import { categories } from '@/constants';
import { getAllProducts, usePrivateAxios } from '@/services';
import Icon from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  FlatList,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const feed = () => {
  let paddingHorizontal = 22;
  const axios = usePrivateAxios();

  const { width, height } = Dimensions.get('screen');
  const [products, setProducts] = React.useState<Array<IProduct> | []>([]);
  const [search, setSearch] = React.useState<string>('');
  const [page, setPage] = React.useState<number>(0);
  const [total, setTotal] = React.useState<number>(0);
  const [limit, setLimit] = React.useState<number>(15);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isListLoading, setIsListLoading] = React.useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = React.useState<
    category | 'All'
  >('All');

  React.useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);
      try {
        let category = selectedCategory === 'All' ? '' : selectedCategory;

        const response = await getAllProducts({
          axios,
          category,
          limit,
          search,
        });
        if (selectedCategory === 'All') {
          // @ts-ignore
          setProductsData({ data: response?.products });
        } else {
          setProductsData({ data: response?.products, isAppend: false });
        }

        setTotal(response?.total);
      } catch (error) {
        console.log(error);
        if (error instanceof Error) {
          ToastAndroid.show(error.message, ToastAndroid.SHORT);
        }
      } finally {
        setIsLoading(false);
      }
    };

    getProducts();
  }, [selectedCategory, limit, search]);

  const setProductsData = ({
    data,
    isAppend = true,
  }: {
    data: IProduct[];
    isAppend: boolean;
  }) => {
    if (isAppend) {
      setProducts((prevProducts) => {
        const duplicateData = data.filter((newP) =>
          prevProducts.some((prevP) => prevP._id === newP._id)
        );
        return duplicateData.length ? data : [...prevProducts, ...data];
      });
    } else {
      setProducts(data);
    }
  };

  const fetchNextPage = async () => {
    // const nextPage =
    //   pageNo <= Math.ceil(total / limit) ? pageNo : Math.ceil(total / limit);
    if (!(page + 1 <= Math.ceil(total / limit)) || page === 0) return;
    let category = selectedCategory === 'All' ? '' : selectedCategory;

    try {
      setIsListLoading(true);
      const response = await getAllProducts({
        axios,
        page,
        category,
        limit,
        search,
      });
      setProducts((prev) => [...prev, ...response?.products]);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      }
    } finally {
      setIsListLoading(false);
    }
  };

  React.useEffect(() => {
    fetchNextPage();
  }, [page]);

  const setActiveCategory = (name: category | 'All') => {
    setPage(0);
    setSelectedCategory(name);
  };

  const router = useRouter();

  return (
    <SafeAreaView className="flex-1">
      <View
        className="bg-white rounded-xl py-2 px-4 flex-row justify-between items-center"
        style={{ marginHorizontal: paddingHorizontal }}
      >
        <TextInput
          placeholder="Search on Stylish"
          className="flex-1"
          placeholderTextColor={'#676767'}
          cursorColor={'blue'}
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
        <Icon name="search" size={20} color={'#616161'} />
      </View>
      <View style={{ marginLeft: paddingHorizontal }} className="flex-row my-2">
        <View>
          <CategoryLabel
            label="All"
            isSelected={selectedCategory === 'All'}
            onPress={() => setActiveCategory('All')}
          />
        </View>
        <View className="w-[1px] h-full bg-[#dadada] mx-2" />
        <FlatList
          data={categories}
          renderItem={({ item }) => (
            <CategoryLabel
              label={item}
              isSelected={selectedCategory === item}
              onPress={() => setActiveCategory(item)}
            />
          )}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View
        style={{
          paddingHorizontal: 16,
          width,
          paddingBottom: 180,
        }}
      >
        <Masonary
          isLoading={isLoading}
          products={products}
          limit={limit}
          total={total}
          setPage={setPage}
          page={page}
          isListLoading={isListLoading}
          router={router}
        />
      </View>
    </SafeAreaView>
  );
};

export default feed;
