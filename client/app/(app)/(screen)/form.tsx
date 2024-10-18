import { View, Modal, Pressable, TextProps, ToastAndroid } from 'react-native';
import React from 'react';
import { z } from 'zod';
import { Button, DropDown, MyText, TextInput } from '@/ui';
import Feather from '@expo/vector-icons/Feather';
import Icon from '@expo/vector-icons/FontAwesome';
import {
  addAddress,
  countryAxios,
  getAddressById,
  getCities,
  getCountries,
  getStates,
  updateAddress,
  usePrivateAxios,
} from '@/services';
import { ScrollView } from 'react-native-gesture-handler';
import { router, useLocalSearchParams } from 'expo-router';

// modal => state, country, city, fullname, mobile number, pincode, type

const formSchema = z.object({
  fullName: z.string().min(4),
  phone: z.string().min(10, 'Please enter valid phone number'),
  country: z.string().min(1, 'Country required'),
  state: z.string().min(1, 'State required'),
  city: z.string().min(1, 'City required'),
  pincode: z.string().min(6, 'Enter 6-digit pincode'),
  address: z.string().min(10),
});

type formInterface = z.infer<typeof formSchema>;

const LabelCheck = ({
  isSelected = false,
  label,
  name,
  onPress,
  IconColor,
  textStyle = {},
}: {
  isSelected?: boolean;
  label: string;
  onPress: () => void;
  name: keyof typeof Icon.glyphMap;
  textStyle?: TextProps['style'];
  IconColor?: string;
}) => {
  const borderColor = isSelected ? '#614FE0' : '#bababa';
  const color = isSelected ? '#614FE0' : '#64748b';
  const backgroundColor = isSelected ? '#EFEDFC' : '#eee';
  return (
    <View>
      <Pressable
        className={`px-4 py-2 flex-row space-x-1 border items-center justify-center rounded-lg`}
        onPress={onPress}
        style={{ borderColor, backgroundColor }}
      >
        <View>
          <Icon name={name} color={IconColor || borderColor} size={22} />
        </View>
        <View>
          <MyText
            style={textStyle}
            className={`text-[${color}] capitalize font-[500]`}
          >
            {label}
          </MyText>
        </View>
      </Pressable>
    </View>
  );
};

interface IAddress {
  _id: string;
  userId: string;
  fullName: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  pincode: string;
  address: string;
  type?: addressType;
  createdAt: string;
  updatedAt: string;
}

const AddressFormModal = () => {
  const paddingHorizontal = 22;
  const axios = usePrivateAxios();
  const { id } = useLocalSearchParams<{ id?: string }>();

  const [formData, setFormData] = React.useState<formInterface>({
    address: '',
    city: '',
    country: '',
    fullName: '',
    state: '',
    phone: '',
    pincode: '',
  });
  const [formDataError, setFormDataError] = React.useState<
    Partial<formInterface>
  >({});

  const [addressType, setAddressType] = React.useState<'home' | 'work'>('home');

  const [countryList, setCountryList] = React.useState<Array<string>>([]);
  const [stateList, setStateList] = React.useState<Array<string>>([]);
  const [cityList, setCityList] = React.useState<Array<string>>([]);

  const [countryData, setCountryData] = React.useState<Array<ICountry>>([]);
  const [stateData, setStateData] = React.useState<Array<IState>>([]);

  const getAddress = async () => {
    if (!id) return;

    try {
      const data = await getAddressById({ addressId: id, axios });

      console.log(data);
      setAddressType(data?.type);
      setFormData({
        address: data?.address,
        city: data?.city,
        country: data?.country,
        fullName: data?.fullName,
        phone: data?.phone as string,
        pincode: data?.pincode,
        state: data?.stete,
      });
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      }
    }
  };

  const handleChange = async (field: keyof formInterface, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setFormDataError((prev) => ({
      ...prev,
      [field]: undefined,
    }));
  };

  const onEdit = async () => {
    if (!id) return;
    const userInput = formSchema.safeParse(formData);
    if (userInput?.error) {
      const errors: Partial<formInterface> = {};
      userInput.error.issues.map(
        (issue) =>
          (errors[issue.path[0] as keyof formInterface] = issue.message)
      );
      setFormDataError(errors);

      return;
    }

    try {
      const response = await updateAddress({
        axios,
        data: { ...formData, type: addressType },
        addressId: id,
      });

      ToastAndroid.show('Address edit successfully', ToastAndroid.SHORT);
      onClose();
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      }
    }
  };

  const onSubmit = async () => {
    const userInput = formSchema.safeParse(formData);
    if (userInput?.error) {
      const errors: Partial<formInterface> = {};
      userInput.error.issues.map(
        (issue) =>
          (errors[issue.path[0] as keyof formInterface] = issue.message)
      );
      setFormDataError(errors);

      return;
    }

    try {
      const response = await addAddress({
        axios,
        data: { ...formData, type: addressType },
      });

      ToastAndroid.show('Address added successfully', ToastAndroid.SHORT);
      onClose();
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      }
    }
  };

  const onClose = () => {
    router.back();
  };

  const parseData = (data: Array<ICountry | ICity | IState>) => {
    return data.map((item) => item.name);
  };

  const getCountryData = async () => {
    try {
      const response = await getCountries(countryAxios);

      setCityList([]);
      setStateList([]);
      setCountryData(response);
      const data = parseData(response);
      setCountryList(data);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      }
    }
  };

  const getStateData = async () => {
    if (!formData?.country) return;

    const selectedCountry = countryData.find(
      (c) => c.name === formData.country
    );

    if (!selectedCountry) return;

    try {
      const response = await getStates({
        axios: countryAxios,
        iso2: selectedCountry.iso2,
      });

      setCityList([]);
      setStateData(response);
      const data = parseData(response);
      setStateList(data);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      }
    }
  };
  const getCityData = async () => {
    if (!formData?.country || !formData.state) return;

    const SelectedCountry = countryData.find(
      (country) => country.name === formData.country
    );
    const selecetedState = stateData.find(
      (state) => state.name === formData.state
    );

    if (!SelectedCountry || !selecetedState) return;

    try {
      const response = await getCities({
        axios: countryAxios,
        ciso2: SelectedCountry.iso2,
        siso2: selecetedState.iso2,
      });
      if (response?.length) {
        const data = parseData(response);
        setCityList(data);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      }
    }
  };

  React.useEffect(() => {
    getCountryData();
    getAddress();
  }, []);

  React.useEffect(() => {
    getStateData();
  }, [formData.country]);

  React.useEffect(() => {
    getCityData();
  }, [formData.state, formData.country]);

  return (
    <Modal
      transparent={false}
      presentationStyle="formSheet"
      onRequestClose={onClose}
    >
      <ScrollView
        className="flex-1 bg-white space-y-2"
        style={{ padding: paddingHorizontal }}
      >
        <View className="justify-center bg-white" style={[{ height: 40 }]}>
          <Pressable onPress={onClose}>
            <Feather name="arrow-left" size={28} color="black" />
          </Pressable>
        </View>
        <View>
          <MyText className="text-black capitalize my-2">
            full Name (first name + last name)
          </MyText>
          <TextInput
            onChangeText={(text) => handleChange('fullName', text)}
            error={formDataError.fullName}
            value={formData.fullName}
            placeholder="Full Name"
            tailwindClass="bg-white"
          />
        </View>
        <View>
          <MyText className="text-black capitalize my-2">
            Phone Number (Required)
          </MyText>
          <TextInput
            onChangeText={(text) => handleChange('phone', text)}
            error={formDataError.phone}
            value={formData.phone}
            placeholder="Phone number"
            tailwindClass="bg-white"
            keyboardType="numeric"
          />
        </View>
        <View className="flex-row gap-2 my-2">
          <View className="flex-1">
            <DropDown
              data={countryList}
              onOptionSelecte={(value) => handleChange('country', value)}
              error={formDataError.country}
              label="Country"
            />
          </View>
          <View className="flex-1">
            <DropDown
              data={stateList}
              onOptionSelecte={(value) => handleChange('state', value)}
              error={formDataError.state}
              label="State"
            />
          </View>
        </View>
        <View className="flex-row gap-2 my-2">
          <View className="flex-1">
            <DropDown
              data={cityList}
              onOptionSelecte={(value) => handleChange('city', value)}
              error={formDataError.city}
              label="City"
            />
          </View>
          <View className="flex-1">
            <TextInput
              onChangeText={(text) => handleChange('pincode', text)}
              value={formData.pincode}
              error={formDataError.pincode}
              maxLength={6}
              placeholder="6-digint pincode"
              keyboardType="numeric"
              tailwindClass="bg-white"
            />
          </View>
        </View>
        <View>
          <MyText className="text-black capitalize my-2">Address</MyText>
          <TextInput
            onChangeText={(text) => handleChange('address', text)}
            error={formDataError.address}
            value={formData.address}
            placeholder="Address"
            tailwindClass="bg-white"
          />
        </View>
        <View className="mb-4">
          <MyText className="text-black capitalize my-2">
            Type of address
          </MyText>
          <View className="flex-row justify-start space-x-2">
            <View>
              <LabelCheck
                label="home"
                name="home"
                onPress={() => setAddressType('home')}
                isSelected={addressType === 'home'}
              />
            </View>
            <View>
              <LabelCheck
                label="work"
                name="building"
                onPress={() => setAddressType('work')}
                isSelected={addressType === 'work'}
              />
            </View>
          </View>
        </View>
        <Button
          title={`${id ? 'Edit' : 'Add'} Address`}
          onPress={id ? onEdit : onSubmit}
        />
      </ScrollView>
    </Modal>
  );
};

export default AddressFormModal;
