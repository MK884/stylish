import { View, Text, TouchableOpacity } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { MyText } from "@/ui";

function MyTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  let primaryColor = "#614FE0";
  let secoundryColor = "#A8A8A9";

  const Icon = {
    feed: (props: any) => (
      <FontAwesome name="home" size={28} color={secoundryColor} {...props} />
    ),
    market: (props: any) => (
      <FontAwesome
        name="plus-square"
        size={26}
        color={secoundryColor}
        {...props}
      />
    ),
    profile: (props: any) => (
      <FontAwesome
        name="user-secret"
        size={26}
        color={secoundryColor}
        {...props}
      />
    ),
  };
  return (
    <View className="absolute bottom-5 flex-row justify-between items-center bg-white mx-5 py-2 rounded-full shadow-lg">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            className="flex-1 justify-center items-center"
          >
            {
              // @ts-ignore
              Icon[route.name]({
                color: isFocused ? primaryColor : secoundryColor,
              })
            }
            <MyText
              style={{
                color: isFocused ? primaryColor : secoundryColor,
                fontSize: 12,
              }}
            >
              {/* @ts-ignore */}
              {label}
            </MyText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default MyTabBar;
