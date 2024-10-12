import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Pressable,
  View,
} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import ImageModal from './ImageModal';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGTH } = Dimensions.get('window');

const MAX_IMAGE_WIDTH = SCREEN_WIDTH - 32;
const MIN_IMAGE_WIDTH = SCREEN_WIDTH / 3;
const MAX_IMAGE_HEIGHT = 500;
const MIN_IMAGE_HEIGHT = 120;
const SCROLL_DISTANCE = MAX_IMAGE_HEIGHT - MIN_IMAGE_HEIGHT;

const ImageBox = ({
  src,
  total,
  index,
  height = MAX_IMAGE_HEIGHT,
  width = MAX_IMAGE_WIDTH,
  AnimatedStyle,
}: {
  src: string;
  total: number;
  index: number;
  height?: number;
  width?: number;
  AnimatedStyle?: any;
}) => {
  const radius = 25;
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  return (
    <Animated.View
      style={[
        AnimatedStyle,
        {
          height,
          width,
          borderTopLeftRadius: index === 0 ? radius : 0,
          borderBottomLeftRadius: index === 0 ? radius : 0,
          borderTopRightRadius: index === total - 1 ? radius : 0,
          borderBottomRightRadius: index === total - 1 ? radius : 0,
          overflow: 'hidden',
        },
      ]}
    >
      <Pressable onPress={() => setIsVisible(true)} style={{ flex: 1 }}>
        <Image source={{ uri: src }} style={{ resizeMode: 'cover', flex: 1 }} />
      </Pressable>

      <ImageModal isVisible={isVisible} setIsVisible={setIsVisible} uri={src} />
    </Animated.View>
  );
};

export default ImageBox;
