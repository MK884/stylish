import {
  Banner,
  CategoryLabel,
  DisplayProducts,
  ProfileIcon,
} from "@/components";
import { RenderItem } from "@/components/DisplayProducts";
import { freshCollection, productOnSlae, store } from "@/db";
import { MyText } from "@/ui";
import Icon from "@expo/vector-icons/FontAwesome";
import React from "react";
import { FlatList, ScrollView, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const market = () => {
  let paddingHorizontal = 22;
  const [categories, setCategories] = React.useState<Array<string>>([
    "Featured",
    "Collections",
    "Stores",
  ]);
  const [selectedCategory, setSelectedCategory] = React.useState("Featured");

  return (
    <SafeAreaView className="flex-1">
      <View
        className="flex-row justify-between items-center space-x-2"
        style={{ marginHorizontal: paddingHorizontal }}
      >
        <View>
          <ProfileIcon />
        </View>
        <View className="bg-white rounded-xl flex-1 py-2 px-4 flex-row justify-between items-center">
          <TextInput
            placeholder="Search on Stylish"
            className="flex-1"
            placeholderTextColor={"#676767"}
            cursorColor={"blue"}
          />
          <Icon name="search" size={20} color={"#616161"} />
        </View>
      </View>
      <ScrollView>
        <View style={{ marginBottom: 80 }}>
          <View
            style={{ marginLeft: paddingHorizontal }}
            className="flex-row my-2 items-center justify-center"
          >
            <View>
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
                ItemSeparatorComponent={() => <View className="mr-3" />}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>
          <View>
            <Banner />
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
                <MyText className="font-bold text-lg">New Store</MyText>
              </View>
              <View>
                <Icon size={20} name="long-arrow-right" />
              </View>
            </View>
            <View>
              <FlatList
                data={store}
                renderItem={({ item }) => <RenderItem data={item} isStore />}
                keyExtractor={(item) => item.id?.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 25 }}
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
                <MyText className="font-bold text-lg">Products on sale</MyText>
              </View>
              <View>
                <Icon size={20} name="long-arrow-right" />
              </View>
            </View>
            <View>
              <FlatList
                data={productOnSlae}
                renderItem={({ item }) => (
                  <RenderItem data={item} imgWidth={200} imgHeight={250} />
                )}
                keyExtractor={(item) => item.id?.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 25 }}
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
                <Icon size={20} name="long-arrow-right" />
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
    </SafeAreaView>
  );
};

export default market;
