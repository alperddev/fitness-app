import WorkoutsDb from "@/src/components/WorkoutsDb";
import React from "react";
import { View, Text } from "react-native";

export default function App() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>First Page</Text>
      <WorkoutsDb />
    </View>
  );
}
