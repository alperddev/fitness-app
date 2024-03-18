import React from "react"
import { Button, YStack } from "tamagui"
import { router } from "expo-router"
import { AArrowUp } from "@tamagui/lucide-icons"
export default function App() {
  return (
    <YStack bg={"$background"} flex={1}>
      <Button
        icon={<AArrowUp size={30} color={"white"} />}
        onPress={() => router.push("/(app)/SelectionStack")}
      >
        selection page
      </Button>
    </YStack>
  )
}
