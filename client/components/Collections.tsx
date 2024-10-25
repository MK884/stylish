import { collection } from '@/constants';
import { MyText } from '@/ui';
import { router } from 'expo-router';
import React from 'react';
import { FlatList, ImageBackground, Pressable, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

const Box = ({
  label,
  bg,
  onPress,
}: {
  label: string;
  bg: string;
  onPress: () => void;
}) => {
  return (
    <Animated.View
      entering={FadeInDown.delay(300)}
      className="flex-1 h-28 m-1 w-52 rounded-2xl overflow-hidden relative"
    >
      <Pressable style={{ flex: 1 }} onPress={onPress}>
        <ImageBackground
          source={{ uri: bg }}
          style={{
            elevation: 5,
            backgroundColor: 'black',
            flex: 1,
          }}
          className="p-4"
          blurRadius={10}
        >
          <View className="absolute bg-black/50 top-0 left-0 right-0 bottom-0 " />
          <MyText className="text-sm font-semibold text-white tracking-widest capitalize z-10">
            {label}
          </MyText>
        </ImageBackground>
      </Pressable>
    </Animated.View>
  );
};

const Collections = () => {
  let paddingHorizontal = 20;

  return (
    <View
      className=""
      style={{ paddingHorizontal, marginBottom: 200, marginTop: 20 }}
    >
      <FlatList
        data={collection}
        numColumns={2}
        renderItem={({ item }) => (
          <Box
            key={item.label}
            label={item.label}
            bg={item.src}
            onPress={() =>
              router.push({
                pathname: '/(app)/(screen)/market-place',
                params: { category: item.label },
              })
            }
          />
        )}
        keyExtractor={(item) => item.label}
        contentContainerStyle={{
          display: 'flex',
          justifyContent: 'center',
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Collections;
