import React, { useEffect, useState } from "react";
import { Text, View, FlatList, Button, TouchableOpacity } from "react-native";
import { db } from "../app/(tabs)";

export default function SavedWorkouts() {
  const [savedWorkouts, setSavedWorkouts] = useState([]);
  const fetchWorkout = async () => {
    try {
      const workouts: {
        id: number;
        name: string;
        sets: number;
        reps: number;
        exercises: any[];
      }[] = await (await db).getAllAsync("SELECT * FROM workouts");

      for (let i = 0; i < workouts.length; i++) {
        const exercises = await (
          await db
        ).getAllAsync("SELECT * FROM exercises WHERE workout_id = ?", [
          workouts[i].id,
        ]);
        workouts[i].exercises = exercises;
      }

      setSavedWorkouts(workouts);
      // console.log("Saved workouts fetched successfully.");
    } catch (error) {
      // console.error("Error fetching saved workouts:", error);
    }
  };
  useEffect(() => {
    fetchWorkout();
  }, []);

  const removeWorkout = async (workoutId) => {
    try {
      await (
        await db
      ).runAsync("DELETE FROM workouts WHERE id = ?", [workoutId]);
      // console.log("Workout deleted successfully.");
      fetchWorkout();
    } catch (error) {
      // console.error("Error deleting workout:", error);
    }
  };
  const renderWorkoutItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => removeWorkout(item.id)}
      style={{ marginVertical: 10, alignItems: "center" }}
    >
      <Text style={{ color: "white" }}>{item.name}</Text>
      <FlatList
        data={item.exercises}
        keyExtractor={(exercise) => exercise.id.toString()}
        renderItem={({ item: exercise }) => (
          <View style={{ marginLeft: 20 }}>
            <Text style={{ color: "white" }}>{exercise.name}</Text>
            <Text style={{ color: "white" }}>{exercise.sets}</Text>
            <Text style={{ color: "white" }}>{exercise.reps}</Text>
          </View>
        )}
      />
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {savedWorkouts.length > 0 ? (
        <View>
          <FlatList
            data={savedWorkouts}
            renderItem={renderWorkoutItem}
            keyExtractor={(workout) => workout.id.toString()}
          />
          <Button title="fetch" onPress={() => fetchWorkout()} />
        </View>
      ) : (
        <View>
          <Text style={{ color: "white" }}>No saved workouts found.</Text>
          <Button title="fetch" onPress={() => fetchWorkout()} />
        </View>
      )}
    </View>
  );
}
