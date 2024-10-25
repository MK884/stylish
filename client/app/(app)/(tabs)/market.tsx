import {
  CategoryLabel,
  Collections,
  Featured,
  ProfileIcon,
  Stores,
} from '@/components';
import Icon from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { TextInput, View, FlatList, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const tabs: tab[] = [
  {
    label: 'Featured',
    content: <Featured key={1} />,
  },
  {
    label: 'Collections',
    content: <Collections key={2} />,
  },
  // {
  //   label: 'Stores',
  //   content: <Stores />,
  // },
];

const market = () => {
  let paddingHorizontal = 22;

  const [selectedCategory, setSelectedCategory] = React.useState('Featured');

  return (
    <SafeAreaView className="flex-1">
      <View
        className="flex-row justify-between items-center space-x-2 my-2"
        style={{ marginHorizontal: paddingHorizontal }}
      >
        <View>
          <ProfileIcon />
        </View>
        <View className="bg-white rounded-xl flex-1 py-2 px-4 flex-row justify-between items-center">
          <TextInput
            placeholder="Search on Stylish"
            className="flex-1"
            placeholderTextColor={'#676767'}
            cursorColor={'blue'}
          />
          <Icon name="search" size={20} color={'#616161'} />
        </View>
      </View>
      <View
        style={{ marginLeft: paddingHorizontal }}
        className="flex-row my-2 items-center justify-center"
      >
        {tabs?.map((item) => (
          <CategoryLabel
            isSelected={item?.label === selectedCategory}
            label={item.label}
            onPress={() => setSelectedCategory(item.label)}
            key={item.label}
          />
        ))}
      </View>
      {tabs.map((tab) => tab.label === selectedCategory && tab.content)}
    </SafeAreaView>
  );
};

export default market;
