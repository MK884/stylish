import { View, Modal, ModalProps } from 'react-native'
import React from 'react'
import { Button, MyText } from '@/ui'
import { TextInput as Text } from 'react-native'


interface InputModalProps extends ModalProps {
    isVisible: boolean;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean | number>>;
    onSave: () => void;
    value: string;
    setValue:React.Dispatch<React.SetStateAction<string>>;
    title?: string;
    isNumbered?: boolean;
    [key:symbol]: ModalProps;
}

const InputModal = ({isVisible, setIsVisible, value, onSave, setValue, title, isNumbered=false, ...rest}:InputModalProps) => {

  return (
    <Modal
        visible={isVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsVisible(false)}
        {...rest}
      >
        <View className="flex-1 bg-black/20">
          <View className="bg-white py-12 px-4 rounded-tr-3xl rounded-tl-3xl absolute w-full bottom-0 shadow-lg space-y-2">
            <MyText className='text-[#614FE0]'>Edit {title}</MyText>
            <Text keyboardType={isNumbered ? 'number-pad': 'default'} value={value} onChangeText={(text)=>setValue(text)} placeholder={`Edit ${title}`} className='p-2 border-b-2 border-[#dadada] focus:border-[#614FE0]'/>
            <View className="flex-1 flex-row gap-2">
              <View className='flex-1'>
                <Button
                  title="cancel"
                  onPress={() => setIsVisible(false)}
                  tailwindClass="bg-transparent py-2 px-12 border border-[#dadada]"
                  textStyle={{ color: 'black', fontWeight:'400'}}
                />
              </View>
              <View className='flex-1'>
                <Button
                  title={'save'}
                  onPress={onSave}
                  tailwindClass="py-2 px-12"
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
  )
}

export default InputModal