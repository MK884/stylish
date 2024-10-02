import { Divider } from "@/components";
import { Button, MyText, TextInput } from "@/ui";
import React from "react";
import { Image, Pressable, ScrollView, View } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome";

const Profile = () => {
  let paddingHorizontal = 24;
  const [value, setValue] = React.useState("");
  return (
    <ScrollView className="bg-[#ffffff] flex-1 mb-5">
      <View className="flex-1 flex gap-12">
        <View style={{ paddingHorizontal }} className="space-y-4">
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
            className="h-40 w-40 rounded-full self-center"
          />
          <MyText className="text-center text-4xl font-extrabold">
            Ava Johnson
          </MyText>
        </View>
        <View>
          <Divider />
        </View>
        <Pressable
          className="flex-row justify-between"
          style={{ paddingHorizontal }}
        >
          <MyText className="font-semibold text-xl">My Orders</MyText>
          <Icon name="shopping-bag" size={24} className="text-neutral-400" />
        </Pressable>
        <View>
          <Divider />
        </View>
        <View style={{ paddingHorizontal }}>
          <MyText className="font-semibold text-xl mb-4">User Details</MyText>
          <TextInput
            value={value}
            onChangeText={(t) => setValue(t)}
            placeholder="Username"
            tailwindClass="mb-4"
          />
          <TextInput
            value={value}
            onChangeText={(t) => setValue(t)}
            placeholder="email"
            tailwindClass="mb-4"
          />
          <Button title="Reset Password" tailwindClass="bg-transparent border rounded-2xl border-[#A8A8A9] py-3" textStyle={{color:'black'}}/>
        </View>
        <View>
          <Divider />
        </View>
        <View style={{ paddingHorizontal }}>
          <MyText className="font-semibold text-xl mb-4">Address</MyText>
          <View className="flex-1 justify-between items-center flex-row my-3">
            <View className="self-start space-y-1">
              <MyText className="font-bold text-lg">3910 Crim Lane</MyText>
              <MyText className="text-neutral-500 text-[16px]">Greendale County, Colorado.Zip Code 410348</MyText>
              <MyText  className="text-neutral-400">Ava Johnson - Home</MyText>
            </View>
            <Icon name="ellipsis-h" size={20}/>
          </View>
          <Button title="Add Address" tailwindClass="bg-transparent border rounded-2xl border-[#A8A8A9] py-3" textStyle={{color:'black'}} />
        </View>
        <View>
          <Divider />
        </View>
        <View style={{ paddingHorizontal }}>
          <Button title="Logout"  tailwindClass="bg-transparent border rounded-2xl border-[#A8A8A9] py-3" textStyle={{color:'red'}} />
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;
