import { Stack, router } from "expo-router";
import React from "react";
import { Button, Text, YStack } from "tamagui";

export default function App() {
  return (
    <YStack>
      <Text>Second Page</Text>
      <Button onPress={() => router.push("/workouts/")}>route</Button>
    </YStack>
  );
}
