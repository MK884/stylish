import {
  CategoryLabel,
  CheckBoxLabel,
  NoProducts,
  ProductCard,
  Sheet,
} from '@/components';
import { categories, ClothesSize, colors } from '@/constants';
import { getAllProducts, usePrivateAxios } from '@/services';
import { Button, MyText } from '@/ui';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import BottomSheet from '@gorhom/bottom-sheet';
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
import Animated, {
  Extrapolation,
  FadeIn,
  FadeOut,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const ColorBox = ({ color }: { color: colors | string }) => {
  return (
    <View className="flex-row gap-4 justify-center  items-center h-14">
      <View
        style={{ backgroundColor: color }}
        className="rounded-full h-8 aspect-square border border-[#dadada]"
      />
      <MyText className="font-bold text-[16px] capitalize">{color}</MyText>
    </View>
  );
};

const MarketPlace = () => {
  const { category } = useLocalSearchParams<{ category?: category }>();

  const FILTER_BUTTON_SIZE = 60;
  const HEADER_HEIGHT = 60;
  const paddingHorizontal = 22;
  const constantTPadding = 80;
  const { height, width } = Dimensions.get('screen');

  const router = useRouter();
  const axios = usePrivateAxios();

  const [products, setProducts] = React.useState<Array<IProduct> | []>([]);
  const [page, setPage] = React.useState<number>(0);
  const [total, setTotal] = React.useState<number>(0);
  const [limit, setLimit] = React.useState<number>(15);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isListLoading, setIsListLoading] = React.useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = React.useState<
    category | 'All'
  >(category || 'All');
  const [selectedTab, setSelectedTab] = React.useState<
    'color' | 'size' | 'category' | string
  >('color');
  const [selectedColors, setSelectedColors] = React.useState<colors[] | []>([]);
  const [selectedSize, setSelectedSize] = React.useState<size[] | []>([]);

  const sheetRef = React.useRef<BottomSheet>(null);
  const ref = React.useRef<FlatList>(null);

  const scrollY = useSharedValue(0);

  const handleScroll = useAnimatedScrollHandler((e) => {
    scrollY.value = e.contentOffset.y;
  });

  const animatedHeaderStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: scrollY.value }],
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT + constantTPadding],
      [0, scrollY.value - (HEADER_HEIGHT / 2 + constantTPadding + 24)],
      Extrapolation.CLAMP
    );
    const translateX = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT + constantTPadding],
      [0, -(HEADER_HEIGHT / 2 + 60)],
      Extrapolation.CLAMP
    );
    const scale = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT + constantTPadding],
      [1, 0.5],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ translateY }, { translateX }, { scale }],
    };
  });

  const textDissolveStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT + constantTPadding],
      [1, 0],
      Extrapolation.CLAMP
    );

    return {
      opacity,
    };
  });

  const filterButtonAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT + constantTPadding],
      [
        0,
        scrollY.value -
          (HEADER_HEIGHT + constantTPadding + FILTER_BUTTON_SIZE + 38),
      ],
      Extrapolation.CLAMP
    );
    const translateX = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT + constantTPadding],
      [0, width / 2 - FILTER_BUTTON_SIZE / 2],
      Extrapolation.CLAMP
    );
    const scale = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT + constantTPadding],
      [1, 0.7],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ translateY }, { translateX }, { scale }],
    };
  });

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

  const getProducts = async () => {
    setIsLoading(true);
    try {
      let category = selectedCategory === 'All' ? '' : selectedCategory;

      const size = arrayToString(selectedSize);
      const color = arrayToString(selectedColors);

      const data: { [key: string]: unknown } = {
        page,
        category,
        limit,
      };

      if (size) data.size = size;
      if (color) data.color = color;
      const response = await getAllProducts({ ...data, axios });
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

  React.useEffect(() => {
    getProducts();
  }, [selectedCategory]);

  React.useEffect(() => {}, [selectedColors, selectedSize]);

  const fetchNextPage = async () => {
    // const nextPage =
    //   pageNo <= Math.ceil(total / limit) ? pageNo : Math.ceil(total / limit);
    if (!(page + 1 <= Math.ceil(total / limit)) || page === 0) return;
    let category = selectedCategory === 'All' ? '' : selectedCategory;
    const size = arrayToString(selectedSize);
    const color = arrayToString(selectedColors);

    const data: { [key: string]: unknown } = {
      page,
      category,
      limit,
    };

    if (size) data.size = size;
    if (color) data.color = color;

    try {
      setIsListLoading(true);
      const response = await getAllProducts({ ...data, axios });
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

  const snapToIndex = (index: number) => sheetRef?.current?.snapToIndex(index);
  const closeSheet = () => sheetRef?.current?.close();

  const setActiveCategory = (name: category | 'All') => {
    setSelectedCategory(name);
    setPage(0);
    closeSheet();
  };

  const tabs: tab[] = [
    {
      label: 'color',
      content: <MyText>color</MyText>,
    },
    {
      label: 'size',
      content: <MyText>size</MyText>,
    },
    {
      label: 'category',
      content: <MyText>category</MyText>,
    },
  ];

  const changeTabTo = (index: number) => {
    if (index > tabs.length) return;

    setSelectedTab(tabs[index].label);
    ref.current?.scrollToIndex({ animated: true, index });
  };

  const setColors = (color: colors) => {
    if (selectedColors.some((c) => c === color)) {
      const otherColors = selectedColors.filter((c) => c !== color);
      setSelectedColors(otherColors);
      return;
    } else {
      setSelectedColors((prev) => [...prev, color]);
    }
  };
  const setSize = (size: size) => {
    if (selectedSize.some((c) => c === size)) {
      const otherSizes = selectedSize.filter((s) => s !== size);
      setSelectedSize(otherSizes);
      return;
    } else {
      setSelectedSize((prev) => [...prev, size]);
    }
  };

  const arrayToString = (array: Array<number | string>) => {
    if (!array.length) return;

    return array.join();
  };

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedSize([]);
    setSelectedColors([]);
    closeSheet();
  };

  const applytFilters = async () => {
    const size = arrayToString(selectedSize);
    const color = arrayToString(selectedColors);

    if (!size && !color) return;
    console.log('reeach', color, selectedColors);

    setPage(0);
    closeSheet();
    const data: { [key: string]: unknown } = {
      page: 0,
      limit,
      category: selectedCategory,
    };

    if (size) data.size = size;
    if (color) data.color = color;

    setIsLoading(true);
    try {
      const response = await getAllProducts({ ...data, axios });

      console.log('resp =>', response);

      setProductsData({ data: response?.products, isAppend: false });

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

  const isFilterChanged =
    selectedCategory !== 'All' ||
    !!selectedColors.length ||
    !!selectedSize.length;

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-white">
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        bounces={false}
      >
        {/* header */}
        <Animated.View
          className="justify-center bg-white"
          style={[
            { paddingHorizontal, height: HEADER_HEIGHT },
            animatedHeaderStyle,
          ]}
        >
          <Pressable
            onPress={() => router.back()}
            className=""
            style={{ width: 28 }}
          >
            <Feather name="arrow-left" size={28} color="black" />
          </Pressable>
        </Animated.View>

        <View style={{ paddingTop: constantTPadding }} />

        <Animated.View className="self-center" style={[animatedTextStyle]}>
          <MyText className="text-black font-extrabold text-[36px] capitalize">
            Market Place
          </MyText>
        </Animated.View>

        <Animated.View className="self-center -z-10" style={textDissolveStyle}>
          <MyText className="text-[#868687] text-[14px]">
            Explore products over 1600+
          </MyText>
        </Animated.View>
        <View style={{ paddingTop: 30 }} />
        <Animated.View
          style={[
            {
              height: FILTER_BUTTON_SIZE,
              aspectRatio: 1,
            },
            filterButtonAnimatedStyle,
          ]}
          className="rounded-xl bg-white border border-[#dadada] flex items-center justify-center self-center"
        >
          <Pressable onPress={() => snapToIndex(0)}>
            <AntDesign name="filter" size={34} color="black" />
          </Pressable>
        </Animated.View>
        <View className="-z-10" style={{ padding: paddingHorizontal }}>
          {isLoading ? (
            <View className="flex-1 items-center justify-center z-0">
              <ActivityIndicator size={'large'} />
            </View>
          ) : (
            <View>
              {products?.length ? (
                <>
                  <FlatList
                    data={products}
                    renderItem={({ item }) => (
                      <ProductCard item={item} key={item._id} width={175} />
                    )}
                    keyExtractor={(item) => item._id}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    scrollEnabled={false}
                    ListFooterComponent={() => (
                      <>
                        <View className="flex-1 items-center justify-center">
                          {isListLoading && (
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
                </>
              ) : (
                <NoProducts />
              )}
            </View>
          )}
        </View>
      </Animated.ScrollView>

      {/* bottom sheet */}
      <Sheet ref={sheetRef} index={-1} snapPoints={['50%', '70%', '100%']}>
        <View className="h-full">
          <View style={{ padding: paddingHorizontal }}>
            <MyText className="text-black text-[22px] font-[500]">
              Filters
            </MyText>
          </View>
          <View className="flex-row self-center my-2 gap-2">
            {tabs?.map((item, idx) => (
              <CategoryLabel
                isSelected={item?.label === selectedTab}
                label={item.label}
                onPress={() => changeTabTo(idx)}
                key={item.label}
              />
            ))}
          </View>
          <View style={{ flex: 1 }}>
            <FlatList
              data={[1, 2, 3]}
              ref={ref}
              keyExtractor={(item) => item.toString()}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={(e) => {
                const x = parseInt(
                  (e.nativeEvent.contentOffset.x / width).toFixed(0)
                );
                // setSelectedTab(tabs[x].label);
              }}
              contentContainerStyle={{
                marginTop: paddingHorizontal,
              }}
              renderItem={({ item, index }) => {
                if (index === 0) {
                  return (
                    <View
                      style={{
                        width,
                        borderColor: '#dadada',
                        borderTopWidth: 1,
                        padding: 20,
                        // paddingBottom: 60,
                      }}
                    >
                      {colors.map((color) => (
                        <CheckBoxLabel
                          isDisable={false}
                          isSelected={selectedColors.some((c) => c === color)}
                          leftContent={<ColorBox color={color} />}
                          onPress={() => setColors(color)}
                          key={color}
                        />
                      ))}
                    </View>
                  );
                }
                if (index === 1) {
                  return (
                    <View
                      style={{
                        width,
                        borderColor: '#dadada',
                        borderTopWidth: 1,
                        padding: 20,
                      }}
                      className=""
                    >
                      {ClothesSize.map((item) => (
                        <CheckBoxLabel
                          isDisable={false}
                          onPress={() => {
                            setSize(item.size);
                          }}
                          isSelected={selectedSize.some(
                            (size) => size === item.size
                          )}
                          label={item.label}
                          size={item.size}
                        />
                      ))}
                    </View>
                  );
                }

                return (
                  <View
                    style={{
                      width,
                      borderColor: '#dadada',
                      borderTopWidth: 1,
                      padding: 20,
                    }}
                    className=""
                  >
                    {['All', ...categories].map((item) => (
                      <CheckBoxLabel
                        isDisable={false}
                        onPress={() => {
                          // @ts-ignore
                          setActiveCategory(item);
                        }}
                        isSelected={selectedCategory === item}
                        label={item}
                      />
                    ))}
                  </View>
                );
              }}
            />
          </View>
        </View>
        {isFilterChanged && (
          <Animated.View
            entering={FadeIn.springify()}
            exiting={FadeOut.springify()}
            className="absolute bottom-2 w-full h-16 bg-transparent flex-row items-center gap-2"
            style={{ paddingHorizontal: 20 }}
          >
            <View style={{ flex: 1 }}>
              <Button
                title="Reset"
                onPress={resetFilters}
                tailwindClass="bg-white border border-[#dadada] rounded-xl"
                textStyle={{ color: 'black' }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Button title="Apply" onPress={applytFilters} />
            </View>
          </Animated.View>
        )}
      </Sheet>
    </SafeAreaView>
  );
};

export default MarketPlace;
