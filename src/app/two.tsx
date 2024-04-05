import React, { useState, useEffect } from "react";
import useStore, { db } from "@/src/Components/Store";
import { Button, YStack, Text } from "tamagui";
import { FlashList } from "@shopify/flash-list";

const ExercisesScreen = () => {
  const clearDatabase = useStore((state) => state.clearDatabase);
  const [exercises, setExercises] = useState([]);
  const fetchExercises = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM exercises;",
        [],
        (_, { rows: { _array } }) => {
          setExercises(_array);
        }
      );
    });
  };

  useEffect(() => {
    fetchExercises();
  }, []);
  const handleClear = () => {
    clearDatabase();
    setExercises([]);
  };

  return (
    <YStack bg={"$background"} flex={1}>
      <FlashList
        estimatedItemSize={10}
        data={exercises}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <YStack>
            <Text>{item.name}</Text>
          </YStack>
        )}
      />
      <Button onPress={handleClear}>delete</Button>
    </YStack>
  );
};

export default ExercisesScreen;
