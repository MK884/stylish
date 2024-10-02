import { router } from "expo-router";
import React from "react";
import { Image, Pressable } from "react-native";

const ProfileIcon = () => {
  return (
    <Pressable onPress={() => router.navigate("/(screen)/profile")}>
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        }}
        style={{
          resizeMode: "cover",
        }}
        className="h-11 w-11 rounded-full"
      />
    </Pressable>
  );
};

export default ProfileIcon;
