import React, { useEffect, useState } from "react";
import { Data } from "../providers/Data";
import useStore from "../providers/Store";
import { TouchableOpacity, Text, View, Button } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { db } from "../app/(tabs)";

export default function ExerciseList() {
  const { setWorkout, selectedWorkout, setSelectedWorkout } = useStore();
  const [selectedExercises, setSelectedExercises] = useState([]);

  const handlePress = (item) => {
    if (!selectedExercises.includes(item)) {
      setSelectedExercises((prev) => [...prev, item]);
    } else {
      setSelectedExercises((prev) => prev.filter((e) => e !== item));
    }
  };

  useEffect(() => {
    console.log(selectedExercises);
  }, [selectedExercises]);

  const saveToSqlite = () => {
    db.transaction((tx) => {
      // Save workout
      tx.executeSql(
        "INSERT INTO workouts (name) VALUES (?)",
        [selectedWorkout.name],
        (_, results) => {
          console.log("Workout saved:", results.insertId);
          const workoutId = results.insertId;

          // Save exercises
          selectedExercises.forEach((exercise) => {
            tx.executeSql(
              "INSERT INTO exercises (workout_id, name, looplength) VALUES (?, ?, ?)",
              [workoutId, exercise.name, exercise.looplength || 0],
              (_, results) => {
                console.log("Exercise saved:", results.rowsAffected);
              },
              (_, error) => {
                console.error("Error saving exercise:", error);
                return true; // Return true to indicate the error is handled
              }
            );
          });
        },
        (_, error) => {
          console.error("Error saving workout:", error);
          return true; // Return true to indicate the error is handled
        }
      );
    });
  };

  const handleSaveWorkout = () => {
    saveToSqlite();
    setWorkout({
      ...selectedWorkout,
      exercises: selectedExercises,
    });
    setSelectedWorkout(null);
    setSelectedExercises([]);
    router.push("/workouts/three");
  };

  const ExerciseListCard = ({ item }) => {
    const isSelected = selectedExercises.includes(item);
    const backgroundColor = isSelected ? "red" : "blue";

    return (
      <TouchableOpacity
        onPress={() => {
          handlePress(item);
        }}
        style={{
          borderRadius: 10,
          borderWidth: 1,
          backgroundColor,
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

  return selectedWorkout === null ? (
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
          data={Data}
          renderItem={({ item }) => <ExerciseListCard item={item} />}
          keyExtractor={(item) => item.id}
          estimatedItemSize={30}
          extraData={selectedExercises}
        />
      </View>
      <Button title="Save Workout" onPress={() => handleSaveWorkout()} />
    </View>
  );
}
