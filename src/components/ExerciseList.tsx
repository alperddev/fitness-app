import React, { useEffect, useState } from "react";
import { Data } from "../providers/Data";
import useStore from "../providers/Store";
import { TouchableOpacity, Text, View, Button, FlatList } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";

export default function ExerciseList() {
  const { workoutStore, setWorkoutStore } = useStore();
  const [selectedExercises, setSelectedExercises] = useState([]);

  const handlePress = (item) => {
    setSelectedExercises((prev) => [...prev, { ...item, id: Math.random() }]);
    console.log(selectedExercises);
  };
  const handlePress2 = (item) => {
    setSelectedExercises((prev) => prev.filter((e) => e !== item));
    console.log(selectedExercises);
  };

  const handleSaveWorkout = () => {
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
  const ExerciseListCard2 = ({ item }) => {
    const isActive = selectedExercises.includes(item);
    return (
      <TouchableOpacity
        onPress={() => {
          handlePress2(item);
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
          height: "30%",
          width: "80%",
        }}
      >
        <FlashList
          estimatedItemSize={50}
          data={Data}
          renderItem={({ item }) => <ExerciseListCard item={item} />}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: "30%",
          width: "80%",
        }}
      >
        <FlatList
          data={selectedExercises}
          renderItem={({ item }) => <ExerciseListCard2 item={item} />}
        />
      </View>
      <Button title="Save Workout" onPress={() => handleSaveWorkout()} />
    </View>
  );
}
