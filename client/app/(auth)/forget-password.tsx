import { Button, MyText, TextInput } from "@/ui";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ForgetPassword = () => {
  const [value, setValue] = React.useState("");

  return (
    <SafeAreaView className="flex-1 p-6 bg-white">
      <View className="w-60">
        <MyText style={{fontWeight:'bold'}} className="text-black font-bold text-[36px]">
          Forgot password?
        </MyText>
      </View>
      <View className="flex-col">
        <TextInput
          value={value}
          onChangeText={(text) => setValue(text)}
          IconName="envelope"
          tailwindClass="my-8"
          placeholder="Enter your email address"
        />
       
        <MyText
          className="self-start my-2 text-[#676767]"
        >
          <Text className="text-red-600">*</Text> We will send you a message to set or reset your new password
        </MyText>
      </View>
      <Button title="Submit" tailwindClass="mt-20" />
    </SafeAreaView>
  );
};

export default ForgetPassword;
