import Octicons from '@expo/vector-icons/Octicons';
import React from 'react';
import {
  Pressable,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Modal,
  ScrollView,
} from 'react-native';
import MyText from './MyText';

const Options = ({
  label,
  onPress,
  isSelected = false,
}: {
  label: string;
  isSelected?: boolean;
  onPress: () => void;
}): React.ReactElement => {
  return (
    <View>
      <TouchableOpacity
        className={`bg-[#${isSelected ? 'EFEDFC' : 'fff'}] p-4 rounded-xl items-center justify-between flex-row`}
        onPress={onPress}
      >
        <MyText className="text-[#313131] capitalize self-start">
          {label}
        </MyText>
        {isSelected && (
        <View
          style={{ height: 22, aspectRatio: 1 }}
          className="flex items-center justify-center rounded-lg bg-[#614FE0] overflow-hidden"
        >
          <Octicons name="check" size={16} color="white" />
        </View>
      )}
      </TouchableOpacity>
    </View>
  );
};
const DropDown = ({
  data,
  onOptionSelecte,
  error,
  label,
  tailwindCss,
}: IDropDown): React.ReactElement => {
  const [isFocused, setIsFocused] = React.useState<boolean>(false);
  const [query, setQuery] = React.useState<string>('');

  const [selectedOption, setselectedOption] = React.useState<string>(
    `Selecte ${label || 'Options'}`
  );

  const onPrees = (item: string) => {
    setselectedOption(item);
    setIsFocused(false);
    setQuery('');
    onOptionSelecte(item);
  };

  let borderColor = error ? 'red' : isFocused ? '#614FE0' : '#A8A8A9';

  const filterData = data?.filter((item) =>
    item.toLowerCase().trim().includes(query.toLowerCase().trim())
  );

  return (
    <View>
      <Pressable
        className={`flex-row  items-center justify-between border rounded-xl p-4 overflow-hidden ${tailwindCss}`}
        style={{ borderColor }}
        onPress={() => setIsFocused((prev) => !prev)}
      >
        <View>
          <MyText
            className={`tracking-widest capitalize text-[#${selectedOption.startsWith('Selecte') ? 'bababa' : '313131'}]`}
          >
            {selectedOption}
          </MyText>
        </View>
      </Pressable>
      {error && (
        <View className="">
          <MyText style={{ color: 'red', fontSize: 10, marginTop: 2 }}>
            {error}
          </MyText>
        </View>
      )}
      <Modal
        transparent={true}
        visible={isFocused}
        statusBarTranslucent={false}
        onRequestClose={() => setIsFocused(false)}
        presentationStyle="overFullScreen"
      >
        <View className="flex-1 bg-slate-600/20 p-4 ">
          <View
            className="bg-white flex-1 rounded-xl"
            style={{ elevation: 3, padding: 22 }}
          >
            <View>
              <MyText className="font-[400] text-black tracking-wider capitalize self-start text-lg">
                Selecte {label}
              </MyText>
            </View>
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
                        label={item}
                        onPress={() => onPrees(item)}
                        isSelected={selectedOption === item}
                        key={index}
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
                    <MyText className="text-red-300 font-bold">
                      Oop's no such option found!
                    </MyText>
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DropDown;
