import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";

import * as Crypto from "expo-crypto";
import { router } from "expo-router";
import useStore from "../providers/Store";
export default function CreateWorkout() {
  const { setWorkoutStore } = useStore();
  const UUID = Crypto.randomUUID();

  const [workout, setWorkout] = useState({
    id: UUID,
    name: "",
    loopLength: 7,
    exercises: [],
  });

  function handleNameChange(name: string) {
    setWorkout({ ...workout, name: name });
  }
  function handleAddWorkout() {
    router.push("/workouts/two");
    setWorkoutStore(workout);
  }

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        placeholderTextColor={"white"}
        style={{
          borderColor: "white",
          color: "white",
          padding: 10,
          borderWidth: 1,
          borderRadius: 10,
        }}
        value={workout.name}
        onChangeText={(value) => handleNameChange(value)}
        placeholder="Workout Name"
      />

      <Button title="Add Workout" onPress={handleAddWorkout} />
    </View>
  );
}
