import { StyleSheet } from "react-native";
import React from "react";
import { Stack, router } from "expo-router";

export default function TabLayout() {
  return (
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
      <Stack.Screen name="index" options={{}} />
      <Stack.Screen name="selection" options={{}} />
      <Stack.Screen
        name="two"
        options={{
          title: "Tab Two",
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    marginRight: 15,
  },
  tabBarIcon: {
    marginBottom: -3,
  },
});
