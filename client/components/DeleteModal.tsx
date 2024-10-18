import { View, Text, Modal, ModalProps } from 'react-native';
import React from 'react';
import { Button, MyText } from '@/ui';

interface DeleteModalProps extends Partial<ModalProps> {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onCancel: () => void;
  onDelete: () => void;
  [key: symbol]: ModalProps;
}

const DeleteModal = ({
  isVisible,
  onCancel,
  onDelete,
  setIsVisible,
  ...rest
}: DeleteModalProps) => {
  return (
    <Modal
      transparent
      visible={isVisible}
      onRequestClose={() => setIsVisible(false)}
      animationType="slide"
      {...rest}
    >
      <View className="flex-1 bg-black/20 items-center justify-center">
        <View
          className="bg-white rounded-xl self-center py-6 px-4"
          style={{ elevation: 2 }}
        >
          <View className="mb-10">
            <MyText className="self-start text-black capitalize font-[500] text-[16px]">
              Are you sure? you want to delete
            </MyText>
          </View>
          <View className="flex-row items-center space-x-2">
            <Button
              title="cancel"
              onPress={onCancel}
              tailwindClass="bg-white border border-[#dadada] py-2"
              textStyle={{ color: 'black', fontSize: 18 }}
            />
            <Button
              title="delete"
              onPress={onDelete}
              tailwindClass=" border border-[#dadada] py-2 ml-2"
              textStyle={{ fontSize: 18 }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteModal;
