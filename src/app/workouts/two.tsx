import ExerciseList from "../../components/ExerciseList";
import React from "react";
import { View, Text } from "react-native";
export default function App() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ExerciseList />
    </View>
  );
}
