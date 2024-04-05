import React, { useEffect } from "react";
import { TamaguiProvider } from "tamagui";
import { SplashScreen, Stack, Tabs } from "expo-router";
import { useFonts } from "expo-font";
import config from "../tamagui.config";
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <TamaguiProvider config={config}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "black",
          },
          headerTitleStyle: {
            color: "white",
          },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="selection" />
        <Stack.Screen name="two" />
      </Stack>
    </TamaguiProvider>
  );
}
