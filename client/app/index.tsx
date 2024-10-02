import { OnBoardingScreen } from "@/components";
import { onBoardData } from "@/constants";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Montserrat_100Thin,
  Montserrat_400Regular,
  useFonts,
} from "@expo-google-fonts/montserrat";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

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
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-white">
        <OnBoardingScreen items={onBoardData} />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}