import { createWorkoutTable } from "@/src/components/sqlite";
import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";

export default function App() {
  useEffect(() => {
    createWorkoutTable();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>First Page</Text>
    </View>
  );
}
