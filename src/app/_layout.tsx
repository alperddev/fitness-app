import React, { useEffect } from "react";
import { TamaguiProvider } from "tamagui";
import { SplashScreen, Stack, Tabs } from "expo-router";
import { useFonts } from "expo-font";
import config from "../tamagui.config";
import { Slot, Redirect, Navigator } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
SplashScreen.preventAutoHideAsync();
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} {...props} />;
}

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
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "white",
          tabBarStyle: {
            borderTopWidth: 0,
            backgroundColor: "black",
          },
          tabBarHideOnKeyboard: true,
        }}
      >
        <Tabs.Screen
          name="SelectionStack"
          options={{
            title: "Tab One",
            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          }}
        />
        <Tabs.Screen
          name="SelectionStack copy"
          options={{
            title: "Tab One",
            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          }}
        />
      </Tabs>
    </TamaguiProvider>
  );
}
