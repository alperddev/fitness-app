import React from "react";
import { Button, Card, Text } from "tamagui";
import { FlashList } from "@shopify/flash-list";
import { Data } from "../providers/Data";
import { useRealm } from "@realm/react";
import { Exercise, Workout } from "../models/Exercise";

export default function ExerciseList() {
  const realm = useRealm();

  const handleItemPress = (item) => {
    saveExercises(item);
  };

  function saveExercises(item) {
    try {
      realm.write(() => {
        realm.create(Exercise, {
          name: item.name,
        });
      });
    } catch (error) {
      console.error("Error in saveExercises:", error);
    }
  }

  const ExerciseListCard = ({ item }) => {
    return (
      <Card
        key={item.id}
        borderRadius={10}
        onPress={() => handleItemPress(item)}
        alignItems="center"
        margin={"$2.5"}
      >
        <Text margin={"$2.5"}>{item.name}</Text>
      </Card>
    );
  };

  return (
    <>
      <FlashList
        data={Data}
        renderItem={({ item }) => <ExerciseListCard item={item} />}
        estimatedItemSize={50}
        keyExtractor={(item) => item.id}
      />
    </>
  );
}
