import { CategoryLabel } from "@/components";
import ProductImage from "@/components/ProductImage";
import { store } from "@/db";
import { CategoriesService, ProductsService } from "@/services";
import { MyText } from "@/ui";
import Icon from "@expo/vector-icons/FontAwesome";
import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  TextInput,
  View,
} from "react-native";
import Animated, { BounceIn, FadeIn, FadeOut } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const feed = () => {
  let paddingHorizontal = 22;

  const { width, height } = Dimensions.get("screen");

  const [categories, setCategories] = React.useState<Array<Categories>>([]);
  const [products, setProducts] = React.useState<[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [product, setProduct] = React.useState<{
    [key: string]: string;
  } | null>(null);

  React.useEffect(() => {
    const getAllCategories = async () => {
      try {
        const result = await CategoriesService.getAllCategories();
        setCategories(result);
      } catch (error) {
        console.error(error);
      }
    };

    getAllCategories();
  }, []);

  React.useEffect(() => {
    const getAllProducts = async () => {
      const isCategoryData = selectedCategory !== "All";
      try {
        let result;

        if (isCategoryData) {
          result = await ProductsService.getProductsByCategory(
            // @ts-ignore
            selectedCategory
          );
        } else {
          result = await ProductsService.getAllProducts();
        }
        setProducts(result);
      } catch (error) {
        console.error(error);
      }
    };
    getAllProducts();
  }, [selectedCategory]);

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

  return (
    <SafeAreaView className="flex-1">
      <View
        className="bg-white rounded-xl py-2 px-4 flex-row justify-between items-center"
        style={{ marginHorizontal: paddingHorizontal }}
      >
        <TextInput
          placeholder="Search on Stylish"
          className="flex-1"
          placeholderTextColor={"#676767"}
          cursorColor={"blue"}
        />
        <Icon name="search" size={20} color={"#616161"} />
      </View>
      <View style={{ marginLeft: paddingHorizontal }} className="flex-row my-2">
        <View>
          <CategoryLabel
            label="All"
            isSelected={selectedCategory === "All"}
            onPress={() => setSelectedCategory("All")}
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
          ItemSeparatorComponent={() => <View className="mr-2" />}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View
        style={{ paddingHorizontal: 16, width, paddingBottom: 160, zIndex: 0 }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View>
              {products
                ?.filter((_, idx) => idx % 2 !== 0)
                ?.map((item: any, idx) => {
                  return (
                    <ProductImage
                      item={item}
                      key={idx + 1}
                      onLongPress={getProductById}
                      onPressOut={onPressOut}
                    />
                  );
                })}
            </View>
            <View>
              {products
                ?.filter((_, idx) => idx % 2 === 0)
                ?.map((item: any, idx) => {
                  return (
                    <ProductImage
                      item={item}
                      key={idx + 2}
                      onLongPress={getProductById}
                      onPressOut={onPressOut}
                    />
                  );
                })}
            </View>
          </View>
        </ScrollView>
      </View>
      {product !== null && (
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
                resizeMode: "contain",
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
                style={{ resizeMode: "contain", height: "100%", width: "100%" }}
              />
            </View>
          </View>
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

export default feed;
