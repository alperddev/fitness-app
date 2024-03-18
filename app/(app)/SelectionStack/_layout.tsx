import { StyleSheet } from "react-native"
import React from "react"
import { Stack, router } from "expo-router"
import { Button } from "tamagui"
import { ChevronLeft } from "lucide-react-native"

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
      <Stack.Screen
        name="index"
        options={{
          headerLeft: () => (
            <Button
              icon={<ChevronLeft size={30} color={"white"} />}
              onPress={() => router.push("/(app)/(tabs)")}
            ></Button>
          ),
          title: "Tab One",
        }}
      />
      <Stack.Screen
        name="two"
        options={{
          title: "Tab Two",
        }}
      />
      <Stack.Screen
        name="signOut"
        options={{
          title: "Sign Out",
        }}
      />
    </Stack>
  )
}

const styles = StyleSheet.create({
  headerRight: {
    marginRight: 15,
  },
  tabBarIcon: {
    marginBottom: -3,
  },
})
