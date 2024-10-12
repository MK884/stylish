import { isLoggedIn } from '@/features/auth/authSlice';
import { useAppSelector } from '@/store/hook';
import { Redirect, Stack } from 'expo-router';
import React from 'react';

const Layout = () => {
  const isAuth = useAppSelector(isLoggedIn);

  if (!isAuth) return <Redirect href={'/(auth)/sign-in'} />;

  return (
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
  );
};

export default Layout;
