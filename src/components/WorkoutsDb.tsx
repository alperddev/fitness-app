import React, { useEffect, useState } from "react";
import { FlatList, View, Text, Button, TouchableOpacity } from "react-native";
import database from "../db";
import Workout from "../db/model/Workout";
export default function WorkoutsDb() {
  const [workouts, setWorkouts] = useState([]);
  const [exercises, setExercises] = useState([]);
  const onRead = async () => {
    const workoutsCollection = database.get<Workout>("workouts");
    const workouts = await workoutsCollection.query().fetch();
    setWorkouts(workouts);
  };

  function removeWorkout() {}

  useEffect(() => {
    onRead();
  }, []);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Read" onPress={onRead} />
      <FlatList
        data={workouts}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => console.log(item)}>
            <Text style={{ color: "white" }}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
