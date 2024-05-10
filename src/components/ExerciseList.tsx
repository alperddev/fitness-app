import React, { useEffect, useState } from "react";
import { Data } from "../providers/Data";
import useStore from "../providers/Store";
import { TouchableOpacity, Text, View, Button } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { db } from "../app/(tabs)";

export default function ExerciseList() {
  const { workoutStore, setWorkoutStore } = useStore();
  const [selectedExercises, setSelectedExercises] = useState([]);

  const handlePress = (item) => {
    if (!selectedExercises.includes(item)) {
      setSelectedExercises((prev) => [...prev, item]);
      console.log(selectedExercises);
    } else {
      setSelectedExercises((prev) => prev.filter((e) => e !== item));
      console.log(selectedExercises);
    }
  };

  const saveToSqlite = async () => {
    try {
      const workoutInsertResult = await (
        await db
      ).runAsync("INSERT INTO workouts (name) VALUES (?)", workoutStore.name);
      const workoutId = workoutInsertResult.lastInsertRowId;

      for (const exercise of selectedExercises) {
        await (
          await db
        ).runAsync("INSERT INTO exercises (workout_id, name) VALUES (?, ?)", [
          workoutId,
          exercise.name,
        ]);
      }

      console.log("Workout and exercises saved successfully.");
    } catch (error) {
      console.error("Error saving to SQLite:", error);
    }
  };

  const handleSaveWorkout = () => {
    saveToSqlite();
    setWorkoutStore({ ...workoutStore, exercises: selectedExercises });
    setSelectedExercises([]);
    router.push("/workouts/three");
  };

  const ExerciseListCard = ({ item }) => {
    const isActive = selectedExercises.includes(item);

    return (
      <TouchableOpacity
        onPress={() => {
          handlePress(item);
        }}
        style={{
          borderRadius: 10,
          backgroundColor: isActive ? "green" : "black",
          borderWidth: 1,
          padding: 10,
          margin: 5,
        }}
      >
        <Text
          style={{
            color: "white",
          }}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
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
          renderItem={({ item }) => <ExerciseListCard item={item} />}
          keyExtractor={(item) => item.id}
          extraData={selectedExercises}
        />
      </View>
      <Button title="Save Workout" onPress={() => handleSaveWorkout()} />
    </View>
  );
}
