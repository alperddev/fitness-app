import React from "react";
import useStore from "./Store";
import { Button, Card, Text, YStack } from "tamagui";
import { router } from "expo-router";
import { FlashList } from "@shopify/flash-list";

const SelectedExercises = () => {
  const selectedExercises = useStore((state) => state.selectedExercises);
  const removeExercise = useStore((state) => state.removeExercise);
  const saveExercises = useStore((state) => state.saveExercises);
  const setModal = useStore((state) => state.setModal);
  const clearAllExercises = useStore((state) => state.clearAllExercises);
  const cardComponent = ({ item }) => (
    <Card
      alignItems="center"
      margin={"$2.5"}
      bg={"$purple6Light"}
      onPress={() => handleItemPress(item)}
    >
      <Text margin={"$2.5"}>{item.name}</Text>
    </Card>
  );

  const handleItemPress = (item) => {
    removeExercise(item);
  };
  const handleSave = () => {
    saveExercises();
    setModal(false);
    router.push("/two");
    clearAllExercises();
  };
  return (
    <>
      <FlashList
        data={selectedExercises}
        keyExtractor={(item) => item.id + item.counter}
        renderItem={cardComponent}
        estimatedItemSize={10}
      />
      <Button onPress={handleSave}>save</Button>
    </>
  );
};

export default SelectedExercises;
