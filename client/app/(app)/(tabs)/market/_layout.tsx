import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const MarketLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown:false
      }}
    >
      <Stack.Screen name='index'/>
      <Stack.Screen name='market-layout'  />
    </Stack>
  )
}

export default MarketLayout