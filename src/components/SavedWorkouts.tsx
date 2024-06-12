import React, { useEffect, useState } from "react";
import { Text, View, FlatList, Button, TouchableOpacity } from "react-native";
import { fetchWorkout } from "./sqlite";
import { removeWorkout } from "./sqlite";

export default function SavedWorkouts() {
  const [savedWorkouts, setSavedWorkouts] = useState([]);

  useEffect(() => {
    handleFetch();
  }, []);
  const handleFetch = async () => {
    try {
      const workouts = await fetchWorkout();
      setSavedWorkouts(workouts);
    } catch (error) {
      console.error("Error fetching saved workouts:", error);
    }
  };
  const handleRemove = async (workoutId) => {
    try {
      await removeWorkout(workoutId);
      handleFetch();
    } catch (error) {
      console.error("Error removing workout:", error);
    }
  };

  const renderWorkoutItem = ({ item }) => (
    <TouchableOpacity
      onLongPress={() => handleRemove(item.id)}
      onPress={() => console.log(item)}
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
            <Text style={{ color: "white" }}>{exercise.weight}</Text>
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
            keyExtractor={(workout) => workout.id}
          />
          <Button title="fetch" onPress={() => handleFetch()} />
        </View>
      ) : (
        <View>
          <Text style={{ color: "white" }}>No saved workouts found.</Text>
          <Button title="fetch" onPress={() => handleFetch()} />
        </View>
      )}
    </View>
  );
}
