import { View, Text } from 'react-native';
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
    </Stack>
  );
};

export default ScreenLayout;
