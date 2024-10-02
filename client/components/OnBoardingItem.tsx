import { MyText } from '@/ui'
import React from 'react'
import { Dimensions, Image, View } from 'react-native'

const OnBoardingItem = ({item}:{item:onBoardItemProps}):JSX.Element => {
    const {height,width} = Dimensions.get('window')
  return (
    <View className={`flex justify-center items-center`} style={{width:width, height:height}}>
      <Image source={item.ImgSource} style={{ resizeMode: 'contain', width:width, height: 350}}/>
      <MyText className='text-3xl font-bold'>{item?.title}</MyText>
      <MyText className='text-[14px] text-center text-[#A8A8A9] w-[300px]'>{item?.description}</MyText>
    </View>
  )
}

export default OnBoardingItem