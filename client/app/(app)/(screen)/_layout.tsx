import React from 'react';
import { Stack } from 'expo-router';

const ScreenLayout = () => {
  return (
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
      <Stack.Screen
        name="storePage"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="market-place"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default ScreenLayout;
