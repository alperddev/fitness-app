import Workouts from "@/src/components/workouts";
import React from "react";
import { View, Text } from "react-native";
export default function App() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Workouts />
    </View>
  );
}
