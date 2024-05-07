import SavedWorkouts from "@/src/components/SavedWorkouts";
import { router } from "expo-router";
import React from "react";
import { View, Button } from "react-native";

export default function two() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        title="Go to Workouts"
        onPress={() => router.push("/workouts/")}
      />
      <Button title="two" onPress={() => router.push("/workouts/two")} />
      <Button title="three" onPress={() => router.push("/workouts/three")} />
      <SavedWorkouts />
    </View>
  );
}
