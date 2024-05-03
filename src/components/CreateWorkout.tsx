import React, { useState } from "react";
import useStore from "../providers/Store";
import {
  FlatList,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import Slider from "@react-native-community/slider";

import * as Crypto from "expo-crypto";
import { router } from "expo-router";
export default function CreateWorkout() {
  const UUID = Crypto.randomUUID();

  const { workouts, addWorkout, setSelectedWorkout, removeWorkout } =
    useStore();
  const [workout, setWorkout] = useState({
    id: UUID,
    name: "",
    loopLength: 7,
    exercises: [],
  });

  function handleNameChange(name: string) {
    setWorkout({ ...workout, name: name });
  }
  function handleLoopLengthChange(loopLength: number) {
    setWorkout({ ...workout, loopLength: loopLength });
  }
  function handleAddWorkout() {
    addWorkout(workout);
    setSelectedWorkout(workout);
    router.push("/workouts/two");
  }
  return (
    <View style={{ flex: 1 }}>
      <TextInput
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
      <Slider
        value={workout.loopLength}
        onValueChange={(value) => handleLoopLengthChange(value)}
        step={1}
        minimumValue={1}
        maximumValue={30}
      />

      <Button title="Add Workout" onPress={handleAddWorkout} />
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
