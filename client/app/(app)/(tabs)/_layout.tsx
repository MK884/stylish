import React from 'react'
import { Tabs } from 'expo-router'
import MyTabBar from '@/components/MyTabBar'

const TabsLayout = () => {
  return (
    <Tabs screenOptions={{
        headerShown:false
    }} 
        tabBar={props => <MyTabBar {...props}/>}
    >
      <Tabs.Screen name='feed' options={{title:'Feed'}}/>
      <Tabs.Screen name='market' options={{title:"Market"}}/>
      <Tabs.Screen name='profile' options={{title:"Profile"}}/>
    </Tabs>
  )
}

export default TabsLayout