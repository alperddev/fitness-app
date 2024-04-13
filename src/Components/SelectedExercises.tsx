import React from "react";
import useStore from "../providers/Store";
import { Button, Card, Text } from "tamagui";
import { router } from "expo-router";
import { useQuery, useRealm } from "@realm/react";
import { Exercise, Workout } from "../models/Exercise";
import { FlatList } from "react-native";

const SelectedExercises = () => {
  const setModal = useStore((state) => state.setModal);
  const realm = useRealm();
  const exercisesRealm = useQuery(Exercise);
  const deleteExercise = (exercise) => {
    realm.write(() => {
      realm.delete(exercise);
    });
  };
  const saveExercisesToWorkout = () => {
    const workout = {
      name: "My Workout",
      exercises: [],
    };
    realm.write(() => {
      realm.create(Workout, workout);
    });
    const selectedExercises = realm.objects(Exercise);
    realm.write(() => {
      workout.exercises.push(...selectedExercises);
    });
  };

  const handleSave = () => {
    saveExercisesToWorkout();
    setModal(false);
    router.push("/two");
  };

  const renderExerciseCard = ({ item }) => (
    <Card
      alignItems="center"
      margin={"$2.5"}
      bg={"$blue5"}
      onPress={() => deleteExercise(item)}
    >
      <Text margin={"$2.5"}>{item.name}</Text>
    </Card>
  );

  return (
    <>
      <FlatList
        data={exercisesRealm}
        renderItem={renderExerciseCard}
        keyExtractor={(item) => item._id}
      />
      <Button onPress={handleSave}>Save Workout</Button>
    </>
  );
};

export default SelectedExercises;
