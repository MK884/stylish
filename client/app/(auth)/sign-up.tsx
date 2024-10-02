import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, MyText, TextInput } from "@/ui";
import { Link } from "expo-router";

const SignIn = () => {
  const [value, setValue] = React.useState("");

  return (
    <SafeAreaView className="flex-1 p-6 bg-white">
      <View className="w-60">
        <MyText className="text-black font-bold text-[36px]">
          Create an account
        </MyText>
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
        <TextInput
          value={value}
          onChangeText={(text) => setValue(text)}
          IconName="lock"
          password
          placeholder="Confirm Password"
          tailwindClass="mt-8"
        />
        <MyText className="self-start my-2 text-[#676767]">
          By clicking the
          <Text className="text-[#614FE0]"> Register</Text> button, you agree to
          the public offer
        </MyText>
      </View>
      <Button title="Register" tailwindClass="mt-20" />
      <MyText className="text-center my-4">
        I Already Have an Account{" "}
        <Link href={"/sign-in"} className="text-[#614FE0] font-semibold">
          Login in
        </Link>
      </MyText>
    </SafeAreaView>
  );
};

export default SignIn;
