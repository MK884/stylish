import { View, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const ScreenLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* content */}

      <Stack>
        <Stack.Screen
          name="profile"
          options={{
            title: '',
            headerStyle: {
              backgroundColor: 'white',
            },
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="stores"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="[productId]"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
};

export default ScreenLayout;
