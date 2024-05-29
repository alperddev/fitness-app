import React, { useState, useEffect } from "react";
import { Data } from "../providers/Data";
import useStore from "../providers/Store";
import { Text, View, Button } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import ExerciseListCard from "./ExerciseListCard";

export default function ExerciseList() {
  const { workoutStore, setWorkoutStore } = useStore();
  const [selectedExercises, setSelectedExercises] = useState([]);

  useEffect(() => {
    console.log(selectedExercises);
  }, [selectedExercises]);

  const handlePress = (item) => {
    setSelectedExercises((prev) => {
      if (!prev.includes(item)) {
        return [...prev, item];
      } else {
        return prev.filter((e) => e !== item);
      }
    });
  };

  const handleSaveWorkout = () => {
    setWorkoutStore({ ...workoutStore, exercises: selectedExercises });
    setSelectedExercises([]);
    router.push("/workouts/three");
  };

  return workoutStore === null ? (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ color: "white" }}>Please select a workout</Text>
    </View>
  ) : (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: "80%",
          width: "80%",
        }}
      >
        <FlashList
          estimatedItemSize={50}
          data={Data}
          renderItem={({ item }) => (
            <ExerciseListCard item={item} handlePress={handlePress} />
          )}
          keyExtractor={(item) => item.id}
          extraData={selectedExercises}
        />
      </View>
      <Button title="Save Workout" onPress={() => handleSaveWorkout()} />
    </View>
  );
}
