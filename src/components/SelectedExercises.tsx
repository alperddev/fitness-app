import React from "react";
import { Card, Text } from "tamagui";

import { FlatList } from "react-native";
import useStore from "../providers/Store";

export default function selectedExercises() {
  const { selectedExercises, removeExercise } = useStore();

  const SelectedExerciseListCard = ({ item }) => {
    return (
      <Card
        onPress={() => {
          removeExercise(item);
        }}
        key={item.id}
        borderRadius={10}
        alignItems="center"
        margin={"$2.5"}
      >
        <Text margin={"$2.5"}>{item.name}</Text>
      </Card>
    );
  };

  return (
    <FlatList
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <SelectedExerciseListCard item={item} />}
      data={selectedExercises}
    />
  );
}
