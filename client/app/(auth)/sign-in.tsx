import { Button, MyText, TextInput } from "@/ui";
import { Link, router } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUp = () => {
  const [value, setValue] = React.useState("");

  return (
    <SafeAreaView className="flex-1 p-6 bg-white">
      <View className="w-60">
        <MyText className="text-black font-bold text-[36px]">Welcome Back!</MyText>
      </View>
      <View className="flex-col">
        <TextInput
          value={value}
          onChangeText={(text) => setValue(text)}
          IconName="user"
          tailwindClass="my-8"
          placeholder="Username or Email"
        />
        <TextInput
          value={value}
          onChangeText={(text) => setValue(text)}
          IconName="lock"
          password
          placeholder="Password"
        />
        <Link
          href={"/forget-password"}
          className="text-[#614FE0] self-end my-2"
        >
          Forgot Password?
        </Link>
      </View>
      <Button title="Login" tailwindClass="mt-20" onPress={()=>router.replace('/(tabs)/feed')}/>
      <MyText className="text-center my-4">
        Create An Account{" "}
        <Link href={"/sign-up"} className="text-[#614FE0] font-semibold">
          Sign Up
        </Link>
      </MyText>
    </SafeAreaView>
  );
};

export default SignUp;
