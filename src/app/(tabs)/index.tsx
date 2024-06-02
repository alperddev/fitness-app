import { clearDatabase } from "@/src/components/sqlite/clearWorkout";
import { createTable } from "@/src/components/sqlite/createWorkoutTable";
import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";

export default function App() {
  useEffect(() => {
    createTable();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>First Page</Text>
    </View>
  );
}
