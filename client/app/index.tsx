import { OnBoardingScreen } from '@/components';
import { onBoardData } from '@/constants';
import {
  Montserrat_100Thin,
  Montserrat_400Regular,
  useFonts,
} from '@expo-google-fonts/montserrat';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { View } from 'react-native';

export default function App() {
  const [loaded, error] = useFonts({
    Montserrat_100Thin,
    Montserrat_400Regular,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <View className="flex-1 bg-[#C0C4FF]">
      <OnBoardingScreen items={onBoardData} />
    </View>
  );
}
