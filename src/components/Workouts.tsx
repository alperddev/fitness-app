import React from "react";
import useStore from "../providers/Store";
import { FlatList, View, Text, TouchableOpacity } from "react-native";

export default function Workouts() {
  const { workouts, removeWorkout } = useStore();

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => removeWorkout(item)}>
            <Text style={{ color: "white" }}>{item.name}</Text>
            <Text style={{ color: "white" }}>{item.loopLength}</Text>
            <FlatList
              data={item.exercises}
              renderItem={({ item }) => (
                <Text style={{ color: "white" }}>{item.name}</Text>
              )}
            />
            <Text style={{ color: "white" }}>{item.id}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
