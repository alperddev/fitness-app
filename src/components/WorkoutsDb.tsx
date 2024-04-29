import React, { useEffect, useState } from "react";
import { FlatList, View, Text, Button, TouchableOpacity } from "react-native";
import database from "../db";
export default function WorkoutsDb() {
  const [workouts, setWorkouts] = useState([]);
  const [exercises, setExercises] = useState([]);
  const onRead = async () => {
    const workoutsCollection = database.get("workouts");
    const workouts = await workoutsCollection.query().fetch();
    setWorkouts(workouts);
    const exercisesCollection = database.get("exercises");
    const exercises = await exercisesCollection.query().fetch();
    setExercises(exercises);
  };
  useEffect(() => {
    onRead();
  }, []);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Read" onPress={onRead} />
      <FlatList
        data={workouts}
        renderItem={({ item }) => (
          <Text style={{ color: "white" }}>{item.name}</Text>
        )}
      />
      <FlatList
        data={exercises}
        renderItem={({ item }) => (
          <Text style={{ color: "white" }}>{item.name}</Text>
        )}
      />
    </View>
  );
}
