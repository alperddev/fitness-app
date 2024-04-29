import { router } from "expo-router";
import React from "react";
import { View, Text, Button } from "react-native";

export default function App() {
  return (
    <View>
      <Button
        title="Go to Workouts"
        onPress={() => router.push("/workouts/")}
      />
      <Button title="two" onPress={() => router.push("/workouts/two")} />
      <Button title="three" onPress={() => router.push("/workouts/three")} />
    </View>
  );
}
