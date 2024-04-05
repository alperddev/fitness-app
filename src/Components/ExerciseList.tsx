import React from "react";
import { Card, Text } from "tamagui";
import useStore from "./Store";
import { FlashList } from "@shopify/flash-list";
import { Data } from "../Components/Data";
import { YStack, XStack } from "tamagui";

export default function ExerciseList() {
  const ExerciseList = ({ item }) => {
    const addExercise = useStore((state) => state.addExercise);
    const handleItemPress = () => {
      addExercise(item);
    };

    return (
      <Card
        key={item.id + item.counter}
        borderRadius={10}
        onPress={handleItemPress}
        alignItems="center"
        margin={"$2.5"}
      >
        <Text margin={"$2.5"}>{item.name}</Text>
      </Card>
    );
  };
  return (
    <FlashList
      data={Data}
      renderItem={({ item }) => <ExerciseList item={item} />}
      estimatedItemSize={50}
      keyExtractor={(item) => item.id}
    />
  );
}
