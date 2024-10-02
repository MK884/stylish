import { Stack } from "expo-router";
import React from "react";

const _layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(screen)" />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
};

export default _layout;
