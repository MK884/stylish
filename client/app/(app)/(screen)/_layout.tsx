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
      <Stack.Screen
        name="form"
        options={{
          headerShown: false,
          presentation: 'fullScreenModal',
        }}
      />
      <Stack.Screen
        name="cart"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="order"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="order-tracking"
        options={{
          title: 'Order tracking',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="checkout"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default ScreenLayout;
