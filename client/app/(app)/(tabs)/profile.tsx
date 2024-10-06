import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const profile = () => {
  return (
    <SafeAreaView className='flex-1 p-2 gap-2'>
      <View className='h-28 rounded-lg bg-red-300'></View>
      <View className='h-28 rounded-lg bg-red-400'></View>
      <View className='h-28 rounded-lg bg-red-500'></View>
    </SafeAreaView>
  )
}

export default profile