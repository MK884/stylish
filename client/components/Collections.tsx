import { collection } from '@/constants';
import { MyText } from '@/ui';
import React from 'react';
import { FlatList, ImageBackground, Pressable, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

const Box = ({ label, bg }: { label: string; bg: string }) => {
  return (
    <Animated.View
      entering={FadeInDown.delay(300)}
      className="flex-1 h-28 m-1 w-52 rounded-2xl overflow-hidden relative"
    >
      <Pressable style={{ flex: 1 }}>
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
        renderItem={({ item }) => <Box label={item.label} bg={item.src} />}
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
