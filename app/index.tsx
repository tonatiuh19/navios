import { Text, View } from "react-native";
import RootLayout from "./_layout";
import LoadingMask from "./components/LoadingMask/LoadingMask";
import * as Font from "expo-font";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./store";

const loadFonts = () => {
  return Font.loadAsync({
    "SpaceMono-Regular": require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
};

export default function Index() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await loadFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setFontsLoaded(true);
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  if (!fontsLoaded) {
    return <LoadingMask isLoading={true} />;
  }
  return (
    <NavigationContainer>
      <RootLayout />
    </NavigationContainer>
  );
}
