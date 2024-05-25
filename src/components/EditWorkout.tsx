import React, { useEffect, useState } from "react";
import useStore from "../providers/Store";
import { Text, View, Button, FlatList, TextInput } from "react-native";
import { router } from "expo-router";
import saveWorkout from "./sqlite/saveWorkout";

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
    }
  };
  const ExerciseListCard = ({ item }) => {
    const [sets, setSets] = useState(item.sets);
    const [reps, setReps] = useState(item.reps);
    const handleSets = () => {
      handleSetsChange(sets, item.id);
    };
    const handleReps = () => {
      handleRepsChange(reps, item.id);
    };

    return (
      <View style={{ borderRadius: 10, padding: 10, alignSelf: "center" }}>
        <Text style={{ color: "white" }}>
          {item.name} Sets: {item.sets} Reps: {item.reps}
        </Text>
        <TextInput
          style={{ color: "white" }}
          placeholderTextColor="white"
          keyboardType="numeric"
          placeholder="Sets"
          value={sets}
          onChangeText={(text) => setSets(text)}
          onEndEditing={handleSets}
        />

        <TextInput
          style={{ color: "white" }}
          placeholderTextColor="white"
          keyboardType="numeric"
          placeholder="Reps"
          value={reps}
          onChangeText={(text) => setReps(text)}
          onEndEditing={handleReps}
        />
      </View>
    );
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <FlatList
        data={exercises}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <ExerciseListCard item={item} />}
      />
      <Button title="Save Workout" onPress={handleSaveWorkout} />
    </View>
  );
}
