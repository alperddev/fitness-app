import React, { useState } from "react";
import { Button, Card, Text, YStack } from "tamagui";
import { Data } from "../providers/Data";
import useStore from "../providers/Store";
import { FlatList } from "react-native";

export default function ExerciseList() {
  const { addExercise, selectedExercises, removeExercise } = useStore();
  const handlePress = (item) => {
    if (selectedExercises.includes(item)) {
      removeExercise(item);
    } else {
      addExercise(item);
    }
  };

  const ExerciseListCard = ({ item }) => {
    return (
      <Card
        pressStyle={{ bg: "$green10", scale: 0.99, animation: "lazy" }}
        bg={selectedExercises.includes(item) ? "$green9" : "$backgroundHover"}
        onPress={() => {
          handlePress(item);
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
    <YStack>
      <FlatList
        data={Data}
        renderItem={({ item }) => <ExerciseListCard item={item} />}
        keyExtractor={(item) => item.id}
      />{" "}
    </YStack>
  );
}
