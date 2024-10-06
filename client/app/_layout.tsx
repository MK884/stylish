import { store } from '@/store';
import { Slot } from 'expo-router';
import React from 'react';
import { Provider } from 'react-redux';

const RootLayout = () => {
  return (
    <Provider store={store}>
      <Slot />
    </Provider>
  );
};

export default RootLayout;
