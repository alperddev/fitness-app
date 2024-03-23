import React from "react";
import { FlatList } from "react-native";
import useStore from "./Store";
import { Button, Card, Text, YStack } from "tamagui";
import { router } from "expo-router";

const SelectedExercises = () => {
  const selectedExercises = useStore((state) => state.selectedExercises);
  const removeExercise = useStore((state) => state.removeExercise);
  const saveExercises = useStore((state) => state.saveExercises);

  const cardComponent = ({ item }) => (
    <Card bg={"$blue5Dark"} onPress={() => handleItemPress(item)}>
      <Text>{item.name}</Text>
    </Card>
  );

  const handleItemPress = (item) => {
    removeExercise(item);
  };
  const handleSave = () => {
    saveExercises();
    router.navigate("SelectionStack/two");
  };
  return (
    <YStack>
      <FlatList
        data={selectedExercises}
        keyExtractor={(item) => item.id + item.counter}
        renderItem={cardComponent}
      />
      <Button onPress={handleSave}>save</Button>
    </YStack>
  );
};

export default SelectedExercises;
