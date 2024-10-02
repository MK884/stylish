import { View, TextInput as OrgTextInput, Text } from "react-native";
import React from "react";
import { TextInputProps } from "@/interface";
import Icon from "@expo/vector-icons/FontAwesome";

const TextInput = ({
  value,
  onChangeText,
  IconName,
  IconStyle,
  error,
  password = false,
  tailwindClass,
  ...rest
}: TextInputProps) => {
  const [isFocused, setIsFocused] = React.useState<boolean>(false);
  const [isVisible, setIsVisible] = React.useState<boolean>(password);

  let borderColor = error ? "red" : isFocused ? "blue" : "#A8A8A9";

  return (
    <View>
      <View
        className={`flex-row justify-between rounded-xl border-[1px] items-center p-3 bg-[#eee] outline-none ${tailwindClass}`}
        style={{ borderColor }}
      >
        <View className="flex-row items-center">
          {IconName && (
            <Icon
              name={IconName}
              size={24}
              style={IconStyle}
              color={"#626262"}
            />
          )}
          <OrgTextInput
            placeholderTextColor={'#676767'}
            cursorColor={'blue'}
            onChangeText={onChangeText}
            value={value}
            secureTextEntry={isVisible}
            className={`min-w-[200px] px-2 text-[#676767]`}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            spellCheck={false}
            {...rest}
          />
        </View>
        {password && (
          <Icon
            name={isVisible ? "eye-slash" : "eye"}
            size={24}
            color={"#626262"}
            onPress={() => setIsVisible((prev) => !prev)}
          />
        )}
      </View>
      {error && <Text style={{ color: "red", fontSize:10, marginTop:2 }}>{error}</Text>}
    </View>
  );
};

export default TextInput;
