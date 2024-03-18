import React, { useEffect } from "react"
import { TamaguiProvider } from "tamagui"
import { Slot, SplashScreen } from "expo-router"
import { useFonts } from "expo-font"
import config from "../utils/tamagui.config"
import { StatusBar } from "expo-status-bar"

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) return null

  return (
    <TamaguiProvider config={config}>
      <StatusBar style="light" />
      <Slot />
    </TamaguiProvider>
  )
}
