import { Stack, useRouter } from "expo-router"
import React from "react"

export default function Layout() {
  const router = useRouter()

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Sign In" }} />
    </Stack>
  )
}
