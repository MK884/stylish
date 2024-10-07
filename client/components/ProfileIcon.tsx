import { useUser } from '@/features/auth/authSlice';
import { useAppSelector } from '@/store/hook';
import { MyText } from '@/ui';
import { router } from 'expo-router';
import React from 'react';
import { Image, Pressable } from 'react-native';
import { View } from 'react-native';

const ProfileIcon = () => {
  const user = useAppSelector(useUser);

  return (
    <Pressable onPress={() => router.navigate('/(screen)/profile')}>
      {user?.avatarUrl ? (
        <>
          <Image
            source={{
              uri: user.avatarUrl,
            }}
            style={{
              resizeMode: 'cover',
            }}
            className="h-10 w-10 rounded-full"
          />
        </>
      ) : (
        <>
          <View className="h-10 w-10 rounded-full flex items-center justify-center bg-blue-300 ">
            <MyText className="font-bold text-3xl text-white">
              {user?.userName[1]?.toUpperCase()}
            </MyText>
          </View>
        </>
      )}
    </Pressable>
  );
};

export default ProfileIcon;
