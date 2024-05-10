import React, { useCallback, useEffect, useState } from "react";
import useStore from "../providers/Store";
import { Text, View, Button, FlatList } from "react-native";
import { router } from "expo-router";
import { db } from "../app/(tabs)";
import Slider from "@react-native-community/slider";

export default function EditWorkout() {
  const { workoutStore, setWorkoutStore } = useStore();
  useEffect(() => {
    setExercises(workoutStore.exercises);
  }, [workoutStore]);

  const [exercises, setExercises] = useState([]);

  const saveToSqlite = async () => {
    try {
      const workoutInsertResult = await (
        await db
      ).runAsync("INSERT INTO workouts (name) VALUES (?)", workoutStore.name);
      const workoutId = workoutInsertResult.lastInsertRowId;

      for (const exercise of exercises) {
        await (
          await db
        ).runAsync(
          "INSERT INTO exercises (workout_id, name, sets, reps) VALUES (?, ? ,?, ?)",
          [workoutId, exercise.name, exercise.sets, exercise.reps]
        );
      }

      console.log("Workout and exercises saved successfully.");
    } catch (error) {
      console.error("Error saving to SQLite:", error);
    }
  };

  const handleSaveWorkout = () => {
    saveToSqlite();
    router.push("/");
  };

  const handleSetsChange = useCallback(
    (value, index) => {
      const newExercises = [...exercises];
      newExercises[index].sets = value;
      setExercises(newExercises);
    },
    [exercises]
  );

  const handleRepsChange = useCallback(
    (value, index) => {
      const newExercises = [...exercises];
      newExercises[index].reps = value;
      setExercises(newExercises);
    },
    [exercises]
  );
  const ExerciseListCard = ({ item, index }) => {
    return (
      <View style={{ borderRadius: 10, padding: 10, alignSelf: "center" }}>
        <Text style={{ color: "white" }}>
          {item.name} Sets: {item.sets} Reps: {item.reps}
        </Text>

        <Slider
          style={{ marginVertical: 10 }}
          value={item.sets}
          onValueChange={(value) => handleSetsChange(value, index)}
          step={1}
          minimumValue={1}
          maximumValue={30}
          maximumTrackTintColor="white"
          minimumTrackTintColor="white"
        />
        <Slider
          style={{ marginVertical: 10 }}
          value={item.reps}
          onValueChange={(value) => handleRepsChange(value, index)}
          step={1}
          minimumValue={1}
          maximumValue={30}
          maximumTrackTintColor="white"
          minimumTrackTintColor="white"
        />
      </View>
    );
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <ExerciseListCard item={item} index={index} />
        )}
      />
      <Button title="Save Workout" onPress={handleSaveWorkout} />
      <Button title="log" onPress={() => console.log(exercises)} />
    </View>
  );
}
