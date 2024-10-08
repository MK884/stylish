import { Divider, InputModal } from '@/components';
import { Button, MyText } from '@/ui';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  View,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { getUser, update, logout as userLogout } from '@/services/users';
import { usePrivateAxios } from '@/services/api';
import { changeAvatar, logout, useUser } from '@/features/auth/authSlice';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const Profile = () => {
  let paddingHorizontal = 24;
  const dispatch = useAppDispatch();
  const axios = usePrivateAxios();
  const user = useAppSelector(useUser);

  const [avatar, setAvatar] = React.useState<string>('');
  const [userName, setUserName] = React.useState('');
  const [publiName, setPubliName] = React.useState('');
  const [email, setEmail] = React.useState<string>('');
  const [phone, setPhone] = React.useState<string>('');
  const [userData, setUserData] = React.useState<Partial<IUser>>({});

  const [isModelVisible, setIsModelVisible] = React.useState<boolean | number>(
    false
  );
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const isChanged =
    userData && (email !== userData?.email || phone !== userData?.phone);

  const onLogout = async () => {
    try {
      await userLogout(axios);

      dispatch(logout());
      ToastAndroid.show('Logged out successfully', ToastAndroid.SHORT);
    } catch (error) {
      console.log(error);
    }
  };

  const saveUserData = (user: Partial<IUser>) => {
    setUserData(user);
    if (user?.avatarUrl) setAvatar(user.avatarUrl);
    if (user?.email) setEmail(user.email);
    if (user?.phone) setPhone(user.phone);
    if (user?.publicName) setPubliName(user.publicName);
    if (user?.userName) setUserName(user.userName);
  };

  const fetchCurrentUser = async () => {
    try {
      setIsLoading(true);
      const user = await getUser(axios);

      saveUserData(user);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchCurrentUser();
  }, []);

  const submitData = async () => {
    const data: Partial<IUser> = {};

    if (email !== userData?.email) data.email = email;
    // if (avatar !== userData?.avatarUrl) data.avatarUrl = avatar;
    if (publiName !== userData?.publicName) data.publicName = publiName;
    if (phone !== userData?.phone) data.phone = phone;

    try {
      setIsLoading(true);
      const response = await update({ data, axios });

      saveUserData(response);
    } catch (error) {
      if (error instanceof Error)
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        allowsMultipleSelection: false,
        quality: 1,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });

      if (!result.canceled) {
        setIsLoading(true);
        const image = result.assets[0].uri;
        // const uri = await FileSystem.readAsStringAsync(image, { encoding: 'base64'})
        // const response = await update({data: { avatarUrl: image}, axios})
        // console.log(image);
        // console.log("resp =>",response);
        
        const uploadResult = await FileSystem.uploadAsync(
          `${process.env.EXPO_PUBLIC_API_URL}/user/update`,
          image,
          {
            httpMethod: 'PATCH',
            uploadType: FileSystem.FileSystemUploadType.MULTIPART,
            fieldName: 'avatar',
            headers: {
              Authorization: `Bearer ${user?.accessToken}`,
            },
          }
        );

        if (uploadResult.status === 200) {
          setAvatar(result.assets[0].uri);
          const data = JSON.parse(uploadResult.body);
          dispatch(changeAvatar(data?.data?.avatarUrl));
          ToastAndroid.show('Avatar updated successfully', ToastAndroid.SHORT);
        }
      }
    } catch (error) {
      ToastAndroid.show('unable to update avatar', ToastAndroid.SHORT);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView className="bg-[#ffffff] flex-1 mb-5">
      {isLoading ? (
        <>
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <ActivityIndicator size={'large'} />
          </View>
        </>
      ) : (
        <View className="flex-1 flex gap-12">
          <View
            style={{ paddingHorizontal }}
            className="space-y-1 items-center"
          >
            <View className="my-4 relative">
              {avatar ? (
                <Image
                  source={{
                    uri: avatar,
                  }}
                  className="h-28 w-28  rounded-full self-center"
                />
              ) : (
                <View className="h-28 w-28 rounded-full flex items-center justify-center bg-blue-300 ">
                  <MyText className="font-bold text-3xl text-white">
                    {userName[1]?.toUpperCase()}
                  </MyText>
                </View>
              )}

              <TouchableOpacity
                onPress={pickImage}
                className="p-2 rounded-full border border-[#dadada] bg-white absolute right-0 bottom-0"
              >
                <Icon name="plus" size={16} />
              </TouchableOpacity>
            </View>
            <View className="flex-row gap-2">
              <MyText
                className={`text-center text-3xl font-extrabold ${!publiName && 'opacity-40'}`}
              >
                {publiName || 'Your public name'}
              </MyText>
              <Icon
                name="edit"
                size={16}
                onPress={() => setIsModelVisible(1)}
              />
            </View>
            <MyText className="text-center text-[#6E6E70] text-sm font-[400] tracking-wider">
              {userName}
            </MyText>
          </View>
          <View>
            <Divider />
          </View>
          <Pressable
            className="flex-row justify-between"
            style={{ paddingHorizontal }}
          >
            <MyText className="font-semibold text-lg">My Orders</MyText>
            <Icon name="shopping-bag" size={24} className="text-neutral-400" />
          </Pressable>
          <View>
            <Divider />
          </View>
          <View style={{ paddingHorizontal }} className="space-y-2">
            <MyText className="font-semibold text-lg mb-4">User Details</MyText>
            <View className="flex gap-2">
              <MyText className="text-[16px] text-gray-500">Email</MyText>
              <View className="flex-1 flex-row justify-between">
                <MyText className="font-[400] text-[16px]">{email}</MyText>
                <Icon
                  name="edit"
                  size={18}
                  onPress={() => setIsModelVisible(2)}
                />
              </View>
            </View>
            <View className="flex gap-2">
              <MyText className="text-[16px] text-gray-500">Phone</MyText>
              <View className="flex-1 flex-row justify-between">
                <MyText className="font-[400] text-[16px]">
                  {phone || 'Add your phone number'}
                </MyText>
                <Icon
                  name="edit"
                  size={18}
                  onPress={() => setIsModelVisible(3)}
                />
              </View>
            </View>
            {isChanged && (
              <View className="flex ">
                <Button
                  title="save"
                  tailwindClass="rounded-2xl py-3"
                  onPress={submitData}
                />
              </View>
            )}
          </View>
          <View>
            <Divider />
          </View>
          <View style={{ paddingHorizontal }}>
            <MyText className="font-semibold text-lg mb-4">Address</MyText>
            <View className="flex-1 justify-between items-center flex-row my-3">
              <View className="self-start space-y-1">
                <MyText className="font-bold text-lg">3910 Crim Lane</MyText>
                <MyText className="text-neutral-500 text-[16px]">
                  Greendale County, Colorado.Zip Code 410348
                </MyText>
                <MyText className="text-neutral-400">Ava Johnson - Home</MyText>
              </View>
              <Icon name="ellipsis-h" size={20} />
            </View>
            <Button
              title="Add Address"
              tailwindClass="bg-transparent border rounded-2xl border-[#A8A8A9] py-3"
              textStyle={{ color: 'black' }}
            />
          </View>
          <View>
            <Divider />
          </View>
          <View style={{ paddingHorizontal }}>
            <Button
              title="Logout"
              tailwindClass="bg-transparent border rounded-2xl border-[#A8A8A9] py-3"
              textStyle={{ color: 'red' }}
              onPress={onLogout}
            />
          </View>
        </View>
      )}
      <InputModal
        isVisible={isModelVisible === 1}
        setIsVisible={setIsModelVisible}
        value={publiName}
        title="Public Name"
        onSave={() => {
          if (publiName?.length > 17) {
            ToastAndroid.show(
              'Public name connot be longer than 16 char',
              ToastAndroid.CENTER
            );
            return;
          }
          setIsModelVisible(false);
          submitData();
        }}
        setValue={setPubliName}
      />
      <InputModal
        isVisible={isModelVisible === 2}
        setIsVisible={setIsModelVisible}
        value={email}
        title="Email"
        onSave={() => {
          if (!email.includes('@')) {
            ToastAndroid.show(
              'please enter correct email address',
              ToastAndroid.CENTER
            );
            return;
          }
          setIsModelVisible(false);
        }}
        setValue={setEmail}
      />
      <InputModal
        isVisible={isModelVisible === 3}
        setIsVisible={setIsModelVisible}
        value={phone}
        title="Phone"
        isNumbered
        onSave={() => {
          setIsModelVisible(false);
        }}
        setValue={setPhone}
      />
    </ScrollView>
  );
};

export default Profile;
