import React, { useEffect, useState } from "react";
import { Text, View, FlatList, Button } from "react-native";
import { db } from "../app/(tabs)"; // Import your SQLite database instance here

export default function SavedWorkouts() {
  const [savedWorkouts, setSavedWorkouts] = useState([]);
  const fetchWorkout = () => {
    // Fetch saved workouts and their exercises from SQLite database
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM workouts",
        [],
        (_, { rows }) => {
          const workouts = rows._array;
          // Fetch exercises for each workout
          workouts.forEach((workout, index) => {
            tx.executeSql(
              "SELECT * FROM exercises WHERE workout_id = ?",
              [workout.id],
              (_, { rows }) => {
                workouts[index].exercises = rows._array;
                if (index === workouts.length - 1) {
                  setSavedWorkouts(workouts);
                }
              },
              (_, error) => {
                console.error("Error fetching exercises for workout:", error);
                return true; // Indicate that the error has been handled
              }
            );
          });
        },
        (_, error) => {
          console.error("Error fetching saved workouts:", error);
          return true; // Indicate that the error has been handled
        }
      );
    });
  };
  useEffect(() => {
    fetchWorkout();
  }, []);

  const renderWorkoutItem = ({ item }) => (
    <View style={{ marginVertical: 10 }}>
      <Text style={{ color: "white" }}>{item.name}</Text>
      <FlatList
        data={item.exercises}
        keyExtractor={(exercise) => exercise.id.toString()}
        renderItem={({ item: exercise }) => (
          <View style={{ marginLeft: 20 }}>
            <Text style={{ color: "white" }}>{exercise.name}</Text>
            <Text style={{ color: "white" }}>
              Loop Length: {exercise.looplength}
            </Text>
          </View>
        )}
      />
    </View>
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
