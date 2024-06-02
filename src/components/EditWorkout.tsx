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
  const ExerciseListCard = ({ item }) => {
    const [sets, setSets] = useState(item.sets);
    const [reps, setReps] = useState(item.sets.reps);
    const [weight, setWeight] = useState(item.sets.weight);

    const handleSets = () => {
      handleSetsChange(sets, item.id);
    };
    const handleReps = () => {
      handleRepsChange(reps, item.id);
    };

    const handleWeight = () => {
      handleWeightChange(weight, item.id);
    };

    const SetsListCard = () => {
      return (
        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={{
              color: "white",
              borderColor: "white",
              borderWidth: 1,
              borderRadius: 10,
              paddingHorizontal: 10,
              paddingVertical: 5,
              marginVertical: 10,
              width: "50%",
            }}
            placeholderTextColor="white"
            keyboardType="numeric"
            placeholder="Reps"
            value={reps}
            onChangeText={(text) => setReps(text)}
            onEndEditing={handleReps}
          />

          <TextInput
            style={{
              color: "white",
              borderColor: "white",
              borderWidth: 1,
              borderRadius: 10,
              paddingHorizontal: 10,
              paddingVertical: 5,
              width: "50%",
              marginVertical: 10,
            }}
            placeholderTextColor="white"
            keyboardType="numeric"
            placeholder="Weight"
            value={weight}
            onChangeText={(text) => setWeight(text)}
            onEndEditing={handleWeight}
          />
        </View>
      );
    };
    return (
      <View
        style={{
          borderRadius: 10,
          padding: 10,
          alignSelf: "center",
          width: "100%",
        }}
      >
        <Text style={{ color: "white" }}>
          {item.name} Sets: {item.sets} Reps: {item.reps} Weight: {item.weight}
        </Text>
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
