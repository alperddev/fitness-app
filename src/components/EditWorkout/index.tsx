import React, { useEffect, useState } from "react";
import useStore from "../../providers/Store";
import { Text, View, Button, FlatList, TextInput } from "react-native";
import { router } from "expo-router";
import { saveWorkout } from "./../sqlite";
import ExerciseListCard from "./ExerciseListCard";

export default function EditWorkout() {
  const { workoutStore, clearWorkoutStore } = useStore();

  const [exercises, setExercises] = useState([]);
  useEffect(() => {
    setExercises(workoutStore.exercises);
  }, []);

  const handleSaveWorkout = () => {
    saveWorkout(workoutStore, exercises);
    clearWorkoutStore();
    router.push("/two");
  };
  const handleSetsChange = (text, exerciseId) => {
    if (text !== undefined) {
      setExercises((prevExercises) =>
        prevExercises.map((exercise) =>
          exercise.id === exerciseId
            ? { ...exercise, sets: text.replace(/[^0-9]/g, "") }
            : exercise
        )
      );
      console.log(exercises);
    }
  };

  const handleRepsChange = (text, exerciseId) => {
    if (text !== undefined) {
      setExercises((prevExercises) =>
        prevExercises.map((exercise) =>
          exercise.id === exerciseId
            ? { ...exercise, reps: text.replace(/[^0-9]/g, "") }
            : exercise
        )
      );

      console.log(exercises);
    }
  };

  const handleWeightChange = (text, exerciseId) => {
    if (text !== undefined) {
      setExercises((prevExercises) =>
        prevExercises.map((exercise) =>
          exercise.id === exerciseId
            ? { ...exercise, weight: text.replace(/[^0-9]/g, "") }
            : exercise
        )
      );
      console.log(exercises);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <FlatList
        data={exercises}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <ExerciseListCard
            item={item}
            handleSetsChange={handleSetsChange}
            handleRepsChange={handleRepsChange}
            handleWeightChange={handleWeightChange}
          />
        )}
      />
      <Button title="Save Workout" onPress={handleSaveWorkout} />
    </View>
  );
}
