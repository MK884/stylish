import { CategoryLabel } from '@/components';
import ProductImage from '@/components/ProductImage';
import { store } from '@/db';
import {
  CategoriesService,
  getAllProducts,
  ProductsService,
  usePrivateAxios,
} from '@/services';
import { MyText } from '@/ui';
import Icon from '@expo/vector-icons/FontAwesome';
import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import Animated, { BounceIn, FadeIn, FadeOut } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const feed = () => {
  let paddingHorizontal = 22;
  const axios = usePrivateAxios();

  const { width, height } = Dimensions.get('screen');
  const [products, setProducts] = React.useState<Array<IProduct> | []>([]);
  const [search, setSearch] = React.useState<string>('');
  const [page, setPage] = React.useState<number>(0);
  const [limit, setLimit] = React.useState<number>(15);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  // const [color, setColor] = React.useState<string>('');
  // const [category, setCategory] = React.useState<string>('');
  // const [size, setsize] = React.useState<number>([]);

  const categories: category[] = [
    'dresses',
    'hats',
    'jacket',
    'jeans',
    'pants',
    'shirts',
    'skirts',
    'socks',
    't-shirts',
    'top',
  ];
  // const [categories, setCategories] = React.useState<Array<Categories>>([]);
  const [selectedCategory, setSelectedCategory] = React.useState<
    category | 'All'
  >('All');
  const [product, setProduct] = React.useState<{
    [key: string]: string;
  } | null>(null);

  React.useEffect(() => {
    // const getAllCategories = async () => {
    //   try {
    //     const result = await CategoriesService.getAllCategories();
    //     setCategories(result);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };

    const getProducts = async () => {
      setIsLoading(true);
      try {
        let category = selectedCategory === 'All' ? '' : selectedCategory;

        const response = await getAllProducts({
          axios,
          category,
          limit,
          page,
          search,
        });
        // setProducts((prevProducts) => [...prevProducts, ...response?.products]);
        if (selectedCategory === 'All') {
          // @ts-ignore
          setProductsData({ data: response?.products });
        } else {
          setProductsData({ data: response?.products, isAppend: false });
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

    getProducts();

    // getAllCategories();
  }, [selectedCategory, limit, page, search]);

  const setProductsData = ({
    data,
    isAppend = true,
  }: {
    data: IProduct[];
    isAppend: boolean;
  }) => {
    if (isAppend) {
      setProducts((prevProducts) => {
        // const uniqueProducts = [
        //   ...prevProducts,
        //   ...data.filter(
        //     (newP) => !prevProducts.some((prevP) => prevP._id === newP._id)
        //   ),
        // ];
        const duplicateData = data.filter(newP => prevProducts.some(prevP => prevP._id === newP._id))
        return duplicateData.length ? data :  [...prevProducts, ...data];
        // return uniqueProducts;
      });
    } else {
      setProducts(data);
    }
  };

  // React.useEffect(() => {
  //   const getAllProducts = async () => {
  //     const isCategoryData = selectedCategory !== 'All';
  //     try {
  //       let result;

  //       if (isCategoryData) {
  //         result = await ProductsService.getProductsByCategory(
  //           // @ts-ignore
  //           selectedCategory
  //         );
  //       } else {
  //         result = await ProductsService.getAllProduct();
  //       }
  //       setProducts(result);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   getAllProducts();
  // }, [selectedCategory]);

  const getProductById = async (id: number) => {
    if (!id) return;
    try {
      const result = await ProductsService.getProductsById(id);
      // console.log("product: ", result);
      setProduct(result);
    } catch (error) {
      console.error(error);
    }
  };

  const onPressOut = () => setProduct(null);

  const leftProducts = products && products.filter((_, idx) => idx % 2 !== 0);
  const rightProducts = products && products.filter((_, idx) => idx % 2 === 0);

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
          onChangeText={text=>setSearch(text)}
        />
        <Icon name="search" size={20} color={'#616161'} />
      </View>
      <View style={{ marginLeft: paddingHorizontal }} className="flex-row my-2">
        <View>
          <CategoryLabel
            label="All"
            isSelected={selectedCategory === 'All'}
            onPress={() => setSelectedCategory('All')}
          />
        </View>
        <View className="w-[1px] h-full bg-[#dadada] mx-2" />
        <FlatList
          data={categories}
          renderItem={({ item }) => (
            <CategoryLabel
              label={item}
              isSelected={selectedCategory === item}
              onPress={() => setSelectedCategory(item)}
            />
          )}
          keyExtractor={(item) => item}
          // ItemSeparatorComponent={() => <View className="w-2" />}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View
        style={{ paddingHorizontal: 16, width, paddingBottom: 160, zIndex: 0 }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {isLoading ? (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator size={'large'} />
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <View>
                {products
                  ?.filter((_, idx) => idx % 2 !== 0)
                  ?.map((item, idx) => {
                    return (
                      <ProductImage item={item} key={item._id} index={idx} />
                    );
                  })}
                {/* {leftProducts && (
                  <FlatList
                    data={leftProducts}
                    renderItem={({ item, index }) => (
                      <ProductImage
                        item={item}
                        key={item._id}
                        index={index}
                      />
                    )}
                  />
                )} */}
              </View>
              <View>
                {products
                  ?.filter((_, idx) => idx % 2 === 0)
                  ?.map((item, idx) => {
                    return (
                      <ProductImage item={item} key={item._id} index={idx} />
                    );
                  })}
                {/* {rightProducts && (
                  <FlatList
                    data={rightProducts}
                    renderItem={({ item, index }) => (
                      <ProductImage
                        item={item}
                        key={item._id}
                        index={index}
                        
                      />
                    )}
                  />
                )} */}
              </View>
            </View>
          )}
        </ScrollView>
      </View>
      {/* {product !== null && (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          className="absolute top-0 left-0 right-0 bottom-0 flex-1 gap-5 items-center justify-center bg-black/30 z-50"
        >
          <Animated.View
            entering={BounceIn.duration(100)}
            className="bg-white h-80 w-72 p-2 overflow-hidden rounded-xl"
          >
            <Image
              source={{
                uri: product?.image,
              }}
              style={{
                resizeMode: 'contain',
                flex: 1,
              }}
            />
          </Animated.View>
          <View className="bg-white w-72 rounded-xl p-2 px-4 flex-row items-center justify-between">
            <MyText className="font-bold capitalize">
              {product?.category}
            </MyText>
            <View className="bg-white rounded-full w-12 h-12 overflow-hidden">
              <Image
                source={store[3].logo}
                style={{ resizeMode: 'contain', height: '100%', width: '100%' }}
              />
            </View>
          </View>
        </Animated.View>
      )} */}
    </SafeAreaView>
  );
};

export default feed;
