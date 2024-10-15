import { isLoggedIn } from '@/features/auth/authSlice';
import { useAppSelector } from '@/store/hook';
import { Redirect, Stack } from 'expo-router';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Layout = () => {
  const isAuth = useAppSelector(isLoggedIn);

  if (!isAuth) return <Redirect href={'/(auth)/sign-in'} />;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(screen)" />
        <Stack.Screen
          name="[id]"
          options={{ presentation: 'transparentModal' }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
};

export default Layout;
