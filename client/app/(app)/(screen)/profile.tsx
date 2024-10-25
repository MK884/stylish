import { AddressCard, DeleteModal, Divider, InputModal } from '@/components';
import { changeAvatar, logout, useUser } from '@/features/auth/authSlice';
import { deleteAddress, getAddress } from '@/services';
import { usePrivateAxios } from '@/services/api';
import { getUser, update, logout as userLogout } from '@/services/users';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { Button, MyText } from '@/ui';
import Icon from '@expo/vector-icons/FontAwesome';
import Octicons from '@expo/vector-icons/Octicons';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';

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
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const [userData, setUserData] = React.useState<Partial<IUser>>({});
  const [address, setAddress] = React.useState<Array<IAddress>>([]);
  const [selectedAddress, setSelectedAddress] = React.useState<
    Partial<IAddress>
  >({});

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
      const address = await getAddress(axios);
      setAddress(address);

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

  const onEditAddress = (item: IAddress) => {
    setIsVisible(false);

    router.push({ pathname: '/(app)/(screen)/form', params: { id: item._id } });
  };
  const setDelete = (item: IAddress) => {
    setSelectedAddress(item);
    setIsVisible(true);
  };

  const onDeleteAddress = async () => {
    if (!selectedAddress?._id) return;
    setIsVisible(false);

    try {
      await deleteAddress({
        addressId: selectedAddress._id,
        axios,
      });
      setIsVisible(false);
      setSelectedAddress({});
      fetchCurrentUser();
      ToastAndroid.show('address deleted', ToastAndroid.SHORT);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      }
    }
  };

  return (
    <>
      <ScrollView className="bg-[#ffffff] flex-1 mb-5">
        {isLoading ? (
          <>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
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

            <View>
              <Pressable
                className="flex-row justify-between"
                style={{ paddingHorizontal }}
                onPress={() => router.push('/(app)/(screen)/order')}
              >
                <MyText className="font-semibold text-lg">
                  My Orders and messages
                </MyText>

                <Octicons name="inbox" size={24} color="black" />
              </Pressable>
            </View>
            <View>
              <Divider />
            </View>
            <View style={{ paddingHorizontal }} className="space-y-2">
              <MyText className="font-semibold text-lg mb-4">
                User Details
              </MyText>
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
              {address.length ? (
                <>
                  {address?.map((item) => (
                    <AddressCard
                      item={item}
                      key={item._id}
                      onEdit={() => onEditAddress(item)}
                      onDelete={() => setDelete(item)}
                    />
                  ))}
                </>
              ) : (
                <View className="flex-1 my-2">
                  <MyText className="capitalize text-slate-400 font-bold text-lg self-center">
                    no address added
                  </MyText>
                </View>
              )}

              <Button
                title="Add Address"
                tailwindClass="bg-transparent border rounded-2xl border-[#A8A8A9] py-3"
                textStyle={{ color: 'black' }}
                onPress={() =>
                  router.push({ pathname: '/(app)/(screen)/form' })
                }
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
        <DeleteModal
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          onCancel={() => setIsVisible(false)}
          onDelete={onDeleteAddress}
        />
      </ScrollView>
    </>
  );
};

export default Profile;
