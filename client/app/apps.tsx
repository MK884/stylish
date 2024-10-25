import Entypo from '@expo/vector-icons/Entypo';
import React from 'react';
import {
  FlatList,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const Options = ({
  label,
  onPress,
  isSelected = false,
}: {
  label: string;
  isSelected?: boolean;
  onPress: () => void;
}) => {
  return (
    <View>
      <TouchableOpacity
        className={`bg-[#${isSelected ? 'eee' : 'fff'}] p-4 rounded-xl`}
        onPress={onPress}
      >
        <Text className="text-[#313131] capitalize self-start">{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

const index = () => {
  const [isFocused, setIsFocused] = React.useState<boolean>(false);
  const [isError, setisError] = React.useState<boolean>(false);
  const [query, setQuery] = React.useState<string>('');
  const [data, setData] = React.useState(Array(12).fill('item'));
  const [selectedOption, setselectedOption] =
    React.useState<string>('Selecte options');

  const onPrees = (item: string) => {
    setselectedOption(item);
    setIsFocused(false);
    setQuery('');
  };

  let borderColor = isError ? 'red' : isFocused ? '#614FE0' : '#A8A8A9';

  const filterData = data.filter((item) =>
    item.toLowerCase().trim().includes(query.toLowerCase().trim())
  );

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        marginTop: 100,
      }}
    >
      <Pressable
        className={`flex-row  items-center justify-between border rounded-xl w-96 p-4 overflow-hidden`}
        style={{ borderColor }}
        onPress={() => setIsFocused((prev) => !prev)}
      >
        <View>
          <Text
            className={`tracking-widest capitalize text-[#${selectedOption.startsWith('Selecte') ? 'bababa' : '313131'}]`}
          >
            {selectedOption}
          </Text>
        </View>
        <View>
          <Entypo
            name={`chevron-${isFocused ? 'up' : 'down'}`}
            size={24}
            color={borderColor}
          />
        </View>
      </Pressable>
      {isFocused && (
        <View
          className="w-96 bg-white rounded-xl mt-2 px-4"
          style={{ elevation: 3, maxHeight: 300, overflow: 'hidden' }}
        >
          <View>
            <TextInput
              placeholder="Sreach..."
              className="px-4 py-2 mt-4 border border-[#bababa] rounded-lg"
              spellCheck={true}
              value={query}
              onChangeText={(text) => setQuery(text)}
            />
          </View>
          <View className="my-4">
            {filterData?.length ? (
              <>
                <FlatList
                  data={filterData}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => (
                    <Options
                      label={`${item} - ${index}`}
                      onPress={() => onPrees(item)}
                      isSelected={selectedOption === item}
                    />
                  )}
                  contentContainerStyle={{
                    paddingBottom: 50,
                    rowGap: 2,
                  }}
                />
              </>
            ) : (
              <>
                <View className="flex items-center justify-center">
                  <Text className="text-red-300 font-bold">
                    Oop's no such option found!
                  </Text>
                </View>
              </>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default index;
