import React from 'react';
import { Dimensions, Modal, View, Image } from 'react-native';

const ImageModal = ({
  uri,
  isVisible,
  setIsVisible,
}: {
  uri: string;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { height, width } = Dimensions.get('screen');
  return (
    <Modal
      transparent
      visible={isVisible}
      onRequestClose={() => setIsVisible(false)}
      animationType="fade"
    >
      <View className="absolute bg-black/50" style={{ height, width }}>
        <Image
          source={{ uri }}
          style={{ resizeMode: 'contain', width, height: height }}
        />
      </View>
    </Modal>
  );
};

export default ImageModal;
