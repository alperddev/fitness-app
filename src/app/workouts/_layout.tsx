import React from "react";
import { Stack, Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="two" />
      <Stack.Screen name="three" />
      <Stack.Screen name="four" />
    </Stack>
  );
}
